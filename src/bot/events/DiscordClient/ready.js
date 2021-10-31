const client = require('../../index')

client.on('ready', async () => {
    client.user.setActivity(`with your tickets!`, { type: "PLAYING"})
    console.log(`Bot logged in as ${client.user.tag} (${client.user.id})`)
})