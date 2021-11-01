const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const db = require('quick.db')
const moment = require('moment')

module.exports = {
    name: 'help',
    description: "Help command",
    category: "Utilities",

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async run (client, message, args) {
        const addCmd = client.commands.get(`add`)
        const blacklistCmd = client.commands.get(`blacklist`)
        const removeCmd = client.commands.get(`remove`)
        const whitelistCmd = client.commands.get(`whitelist`)
        const guildinfoCmd = client.commands.get(`guildinfo`)
        const helpCmd = client.commands.get(`help`)
        const pingCmd = client.commands.get(`ping`)
        const testCmd = client.commands.get(`test`)

        message.channel.send({content: `> 🗒 Help Command: \n \n**Tickets:** \n\`${addCmd.name}\` - ${addCmd.description} \n\`${blacklistCmd.name}\` - ${blacklistCmd.description} \n\`${removeCmd.name}\` - ${removeCmd.description} \n\`${whitelistCmd.name}\` - ${whitelistCmd.description} \n \n**Utilities** \n\`${guildinfoCmd.name}\` - ${guildinfoCmd.description} \n\`${helpCmd.name}\` - ${helpCmd.description} \n\`${pingCmd.name}\` - ${pingCmd.description} \n\`${testCmd.name}\` - ${testCmd.description}`})

    }
}
