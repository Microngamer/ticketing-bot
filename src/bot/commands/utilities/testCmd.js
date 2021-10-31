const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'test',
    description: "Test command",
    category: "Utilities",

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async run (client, message, args) {
        message.channel.send({content: `> ✅ | Success!`})
    }
}