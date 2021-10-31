const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'whitelist',
    description: "Unrestricts a user from opening tickets.",
    category: "Tickets",

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async run (client, message, args) {
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: `> 🛠 You need the "Manage Guild" permission to run this command.`})
        if (!args[0]) return message.channel.send({content: `> 👥 Please provide the ID of a user to add.`})

        const user = await message.guild.members.fetch(args[0]).catch((e) => null)
        if (!user) message.channel.send({content: `> 👥 This user doesn't exist.`})

        const blacklist = await db.fetch(`blacklist.${user.id}`)
        if (!blacklist) return message.channel.send({content: `> 👥 This user isn't blacklisted.`})

        db.delete(`blacklist.${user.id}`)
        user.send({content: `> 🛠 You have been whitelisted from creating tickets.`}).catch((e) => null)

        message.channel.send({content: `> ✅ Successfully whitelisted ${user.user.tag}`})

    }
}