const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const db = require('quick.db')
const moment = require('moment')

module.exports = {
    name: 'ping',
    description: "Fetches the client latency",
    category: "Utilities",

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async run (client, message, args) {
        const msg = await message.channel.send({content: `> 🏓 Pinging..`})
        msg.edit({content: `> 🏓 Pong! Latency: **${client.ws.ping}ms**`})
    }
}