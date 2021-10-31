const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const db = require('quick.db')
const moment = require('moment')

module.exports = {
    name: 'guildinfo',
    description: "Returns information about the guild.",
    category: "Utilities",

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async run (client, message, args) {
        const guild = client.guilds.cache.get(process.env.GUILD_ID)

        const infoEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, size: 4096}))
        .setTitle(`${guild.name} - Information`)
        .addField(`General Info:`, 
                `Owner: ${(await guild.fetchOwner()).user.tag} (${guild.ownerId.toString()})
                Created: ${moment(guild.createdAt).locale('en-gb').calendar()}
                Total Members: ${guild.memberCount}`,
        )
        .addField(`Other Info:`, 
                `Boosts: ${guild.premiumSubscriptionCount}
                Accomplished Level: ${guild.premiumTier}`
        )
        .setColor(message.member.roles.highest.color)
        .setTimestamp()
        .setThumbnail(guild.iconURL({dynamic: true, size: 4096}))

    message.channel.send({embeds: [infoEmbed]})
    }
}