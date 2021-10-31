const { glob } = require('glob') 
const { promisify } = require('util'); 

const globPromise = promisify(glob);

module.exports = async (client) => {
    const commandfiles = await globPromise(`${process.cwd()}/src/bot/commands/**/*.js`);
    commandfiles.map((value) => {
        const file = require(value);
        const split = value.split('/');
        const dir = split[split.length - 2];

        if (file.name) {
            const props = { dir, ...file }
            client.commands.set(file.name, props)
        }
    })
    const eventfiles = await globPromise(`${process.cwd()}/src/bot/events/**/*.js`);
    eventfiles.map((value) => require(value));
}