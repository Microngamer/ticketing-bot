# 🎫 Ticketing Bot
An easy to use ticket style Discord bot written in JavaScript using the Discord.js library.
Fully customisable, easy to navigate and fully dynamic.

# 🛠 Setup
Run `npm install` to install all of the dependencies for the bot to function properly.
Navigate to `.env` and insert your bot token, your guild ID and your bot prefix.

After that, you can edit some of the files to insert your own text, or, if you're really crafty, you can edit some of the code to make the bot suit your needs, however, I would only recommend doing this if you have experience in DJS, otherwise you might end up breaking the bot.

# 🖐 Permissions
The bot should hopefully catch and return all errors it may come across, including permission errors, however, it will need most of the base messaging permissions.
I would recommend giving the bot the *Administrator* permission, however, if you don't want to do that, give it these permissions:
* *Manage Messages*
* *Send Messages*
* *Read Messages*
* *Manage Channels*
* *Embed Links*
* *Attach Files*
* *Use External Emojis*
* *Use Application Commands* - This is a vital one, if you don't enable this, the bot cannot function.

It's more faff if you enable all of these seperately, so I'd just suggest giving the bot *Administrator* permissions.

# 🤖 Start-up
Once you've installed all of the dependencies and edited `.env`, you can start the bot.
You can run either `npm start`, `node .` or `node src/bot/index.js` to get the bot up and running.

If the terminal returns any errors, please see below.

# 📋 Bot Features
* Transcripts - The bot will give you an option to save a transcript upon closing a ticket, which will return all the chat logs.
* Blacklist system - You can add a user to the server blacklist to prevent them from opening tickets! This all works from a database.
* Database - While not the most advanced database out there, **quick.db** is one of my favourite npm packages, and is something I use in almost all my projects. This is used for transcripts and blacklist management.
* Other fun commands - The bot is packed with other fun commands along the way!

# ❗ Start-up Errors:
```sh
Error: Cannot find module ...
```
If you get this error, that means you are missing a dependency. Try running `npm install` in the terminal if you haven't already done so.

```sh
Error [TOKEN_INVALID]: An invalid token was provided.
```
That means the bot token you provided is invalid. Try checking what you've inserted in your `.env` file.

```sh
Error [DISALLOWED_INTENTS]: Privileged intent provided is not enabled or whitelisted.
```
If you get this error, you must enable the "Presence Intent" and "Server Members Intent" on your application page. Navigate to **bot**, scroll down and enable them.

# 👥 Credits + Licensing
This bot was written by **_UnknownShadow#7462**.
You don't have to give me credit, but you can at least leave a **link** to [this repository](https://github.com/unknownshadow-s/ticketing-bot) in your application's **About Me** page.

Do **not** re-upload this code without my permission.

# Copyright © _UnknownShadow#7462 - All rights reserved.
