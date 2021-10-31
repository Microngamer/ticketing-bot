const client = require('../../index')
const db = require('quick.db')

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'DM') return;

    const prefix = process.env.BOT_PREFIX
    
    if (!message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(" ");

    let command = client.commands.get(cmd)

    if (!command) return;
    if (command) {
        await command.run(client, message, args) 
    } 
})