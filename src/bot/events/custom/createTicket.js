const client = require('../../index')
const db = require('quick.db');
const { MessageEmbed, MessageActionRow, MessageButton, DiscordAPIError } = require('discord.js');
const moment = require('moment');
require('dotenv').config()
const ms = require('ms')

client.on("messageCreate", async (message) => {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)
    if (message.author.bot) return;
    if (message.channel.type === 'DM') return;

    if (message.mentions.has(client.user.id, {ignoreEveryone: true, ignoreRoles: true})) {

        const blacklist = await db.fetch(`blacklist.${message.author.id}`)
        if (blacklist === true) return message.author.send({content: `> 🖐 Sorry, but you are currently blacklisted.`}).catch((e) => null)
    
    const msg = await message.author.send({content: `> 🎫 Please provide your reasoning for the ticket request here.`}).catch((e) => null)
    if (!msg) return message.channel.send({content: `> ❌ Your DMs are closed.`})

    let msgFilter = (m) => !m.author.bot;
    let DMChannelCollector = message.author.dmChannel.createMessageCollector(msgFilter);

    DMChannelCollector.on('collect', async m => {
        if (m.author.bot) return;
        if (!m.content) return message.author.send({content: `> 🖐 You must provide a reason!`})

        msg.edit({content: `> 👥 You answered: \`${m.content}\``})
        DMChannelCollector.stop()

        const ticketChannel = await guild.channels.create(`${message.author.id}-ticket`, { 
            type: "GUILD_TEXT",
            topic: `Support ticket created by user ${message.author.tag} \n**DO NOT RENAME THIS CHANNEL**`, 
            parent: process.env.TICKET_CATEGORY,
        })
        
        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, size: 4096}))
        .setTitle(`New Ticket`)
        .setDescription(`${message.author.toString()} was created **${moment(message.author.createdAt).locale(`en-gb`).calendar()} (${moment(message.author.createdAt).fromNow()}.**) \nReason for ticket:\`\`\`${m.content}\`\`\``)
        .setColor(message.member.roles.highest.color)
        .addField(
            `To reply:`,
            `Simply send your message in this channel!`,
            true
        )
        .addField(
            `To avoid sending a reply:`,
            `Start your message with the bot's prefix \`(${process.env.BOT_PREFIX})\`.`,
            true
        )
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL({dynamic: true, size: 4096}))

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle(`SECONDARY`)
            .setEmoji(`🎫`)
            .setCustomId(`Close_Button`)
            .setLabel(`Close Ticket`),
        )

        const startMsg = await ticketChannel.send({content: `> 🔔 **Attention!**`, embeds: [embed], components: [row]})
        startMsg.pin()

        const toSend = new MessageEmbed()
        .setTitle(`Ticket Created`)
        .setDescription(`Support will be with you shortly.`)
        .setColor(`AQUA`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL({dynamic: true, size: 4096}))
        
        message.author.send({embeds: [toSend]})

        const filter = (i) => !i.user.bot
        const ButtonCollector = ticketChannel.createMessageComponentCollector({ filter });

        ButtonCollector.on(`collect`, async i => {
            if (i.customId === 'Close_Button') {
                startMsg.delete()
                i.deferUpdate()
    
                const toSend = new MessageEmbed()
               .setTitle(`Ticket Closed`)
               .setDescription(`Your ticket has been closed by ${i.user.toString()}. Thanks for getting in touch.`)
               .setColor(`RED`)
               .setTimestamp()
               .setFooter(guild.name, guild.iconURL({dynamic: true, size: 4096}))
            
                message.author.send({embeds: [toSend]})
    
                ticketChannel.permissionOverwrites.create(guild.roles.everyone, ({SEND_MESSAGES: false, VIEW_CHANNEL: false}))
                
               await ticketChannel.setName(`${message.author.id}-closed`)
                const confEmbed = new MessageEmbed()
                .setTitle(`Closed Ticket`)
                .setDescription(`What would you like to do now?`)
                .setColor(`RED`)
                .setTimestamp()
                .setFooter(guild.name, guild.iconURL({dynamic: true, size: 4096}))
    
                const row3 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setStyle(`SECONDARY`)
                    .setLabel(`Save Transcript`)
                    .setCustomId(`Transcript_Button`)
                    .setEmoji(`🗒`),
    
                    new MessageButton()
                    .setEmoji(`🎫`)
                    .setStyle(`SECONDARY`)
                    .setLabel(`Delete Channel`)
                    .setCustomId(`Delete_Button`),
                )
                const yes = await ticketChannel.send({embeds: [confEmbed], components: [row3]})
    
                const filter = (i) => !i.user.bot
                const buttonCollector2 = ticketChannel.createMessageComponentCollector({filter})
    
                buttonCollector2.on(`collect`, async i => {
                    if (i.customId === 'Transcript_Button') {
                        i.deferUpdate()
    
                        const transcript = await db.fetch(`transcript.${ticketChannel.id}`)
                        const logs = transcript.join(`\n◽ `)

                        i.user.send({content: `> 🎫 **Ticket Transcript:** (ID: ${message.author.id}) \n◽ ${logs}`})

                        message.channel.send({content: `> 🎫 I have sent the transcript to your Direct Messages!`, ephemeral: true})
                    } else if (i.customId === `Delete_Button`) {
                        i.deferUpdate()
                        yes.delete()

                        db.delete(`transcript.${ticketChannel.id}`)

                        ticketChannel.send({content: `> ⏰ **Channel will be deleted in 3 seconds.**`})
                        setTimeout(async function () {
                            ticketChannel.delete()
                        }, ms('3s'));
                    }
                })
            }

        })

    })
}
    
})