const client = require('../../index')
const db = require('quick.db');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require('moment');
const { channels } = require('../../index');
require('dotenv').config()

client.on("messageCreate", async (message) => {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)

    if (message.author.bot) return;
    if (message.channel.type === 'DM') {
        if (message.content.startsWith(process.env.BOT_PREFIX)) return;

        const channel = await guild.channels.cache.find(ch => ch.name.startsWith(message.author.id))
        if (!channel) return;

        if (channel.name.endsWith('-closed')) return;

        const channelEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, size: 4096}))
        .setDescription(`${message.content}`)
        .setColor(`AQUA`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL({dynamic: true, size: 4096}))

        const toSend = new MessageEmbed()
        .setTitle(`Reply Sent`)
        .setDescription(`You will receive an answer shortly.`)
        .setColor(`AQUA`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL({dynamic: true, size: 4096}))

        db.push(`transcript.${channel.id}`, [`**${moment(Date.now()).calendar()}** - Ticket opener (${message.author.tag}) sent reply: ${message.content}`])

        channel.send({embeds: [channelEmbed]})
        message.author.send({embeds: [toSend]})

    } else if (message.channel.type === 'GUILD_TEXT') {
        if (!message.channel.name.endsWith(`-ticket`)) return;
        if (message.content.startsWith(process.env.BOT_PREFIX)) return;

        const channelEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, size: 4096}))
        .setDescription(`${message.content}`)
        .setColor(`AQUA`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL({dynamic: true, size: 4096}))

        const channelSlice = await message.channel.name.slice(0, message.channel.name.length - 7)

        const user = await guild.members.fetch(channelSlice).catch((e) => null)

        if (!user) return message.channel.send({content: `> ❌ A user couldn't be identified.`})
        const test = await user.send({embeds: [channelEmbed]}).catch((e) => null)

        if (!test) return message.react('❌') && message.channel.send({content: `> ❌ Message couldn't be delivered.`})

        db.push(`transcript.${message.channel.id}`, [`**${moment(Date.now()).calendar()}** - ${message.author.tag} sent reply: ${message.content}`])

        message.react('✅')

    }
})