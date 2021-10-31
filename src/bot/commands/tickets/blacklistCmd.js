const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'blacklist',
    description: "Restricts a user from opening tickets.",
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

        if (user.id === message.author.id) return message.channel.send({content: `> 👥 You don't want to blacklist yourself!!`})
        if (user.id === message.guild.ownerId) return message.channel.send({content: `> 👥 You don't want to blacklist the server owner!!`})

        const reason = args.slice(1).join(" ") || 'No reason provided.'

        const blacklist = await db.fetch(`blacklist.${user.id}`)
        if (blacklist === true) return message.channel.send({content: `> 👥 This user is already blacklisted.`})

        db.set(`blacklist.${user.id}`, true)
        user.send({content: `> 🛠 You have been blacklisted from creating tickets for ${reason}`}).catch((e) => null)

        message.channel.send({content: `> ✅ Successfully blacklisted ${user.user.tag}`})

    }
}