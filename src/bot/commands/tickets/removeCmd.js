const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'remove',
    description: "Removes a user to the ticket channel.",
    category: "Tickets",

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async run (client, message, args) {
        if (!message.channel.name.endsWith('-ticket')) return;
        if (!args[0]) return message.channel.send({content: `> 👥 Please provide the ID of a user to add.`})

        const user = await message.guild.members.fetch(args[0]).catch((e) => null)
        if (!user) message.channel.send({content: `> 👥 This user doesn't exist.`})

        message.channel.permissionOverwrites.create(user, { VIEW_CHANNEL: false, SEND_MESSAGES: false })
        message.channel.permissionOverwrites.delete(user)
        message.channel.send({content: `> ✅ Removed ${user.user.tag} from the ticket.`})
    }
}