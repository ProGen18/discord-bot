require('dotenv').config();
const Discord = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const { Collection } = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")
const usersMap = new Map();
const LIMIT = 7;
const TIME = 20000;
const DIFF = 4000;
const search = require('youtube-search');
const opts = {
    maxResults: 25,
    key: config.YOUTUBE_API,
    type: 'video'
};
///////////////////////////////////////////////// 

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.cooldowns = new Discord.Collection()

/////////////////////////////////////////////////  

client.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur le serveur ! '+ member.displayName)  
  }).catch(console.error)
})

client.once('ready', () => {
  console.log('Tout est pret !');
  client.user.setActivity("[p!help] Codé par ProGen", { type: "LISTENING" })
});

const loadCommands = (dir = "./commands/") => {
  fs.readdirSync(dir).forEach(dirs => {
    const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"))
    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`)
      client.commands.set(getFileName.help.name, getFileName)
      getFileName.help.aliases.forEach(alias => {
        client.aliases.set(alias, getFileName.help.name)
      })
      console.log(chalk.yellow(`>> Commande chargée : ${getFileName.help.name}`)) 
      console.log(chalk.red(`-------------------------------------------------`))
    }
  })
}

loadCommands()

client.on("message", message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const prefix = config.prefix;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(config.prefix.length).split(/ +/);
  let cmd = args.shift()
  let commands
  if (client.commands.has(cmd)) {

    commands = client.commands.get(cmd)

  } else if (client.commands.has(client.aliases.get(cmd))) {

    commands = client.commands.get(client.aliases.get(cmd))

  } else {
    return
  }
  if (client.cooldowns.has(`${message.author.id}_${cmd}_${message.guild.id}`)) {
    let cooldown = client.cooldowns.get(`${message.author.id}_${cmd}_${message.guild.id}`)
    if (cooldown > Date.now()) {
      return message.channel.send(`Vous devez attendre ${Math.floor((cooldown - Date.now()) / 1000)} secondes avant de réutiliser la commande **${cmd}**`)
    } else {
      client.cooldowns.delete(`${message.author.id}_${cmd}_${message.guild.id}`)
    }
  } else {
    client.cooldowns.set(`${message.author.id}_${cmd}_${message.guild.id}`,`${Date.now() + Number(`${commands.help.cooldown ? commands.help.cooldown : 1 * 3}`)}`)
  }

  commands.run(client, message, args)

})

///////////////////////////////////////////////// 



client.on('message', message => {
  if(message.author.bot) return;
  if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    console.log(difference);
    if(difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared timeout');
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from RESET.');
      }, TIME);
      usersMap.set(message.author.id, userData);
    }
    else {
      ++msgCount;
      if(parseInt(msgCount) === LIMIT) {
        const role = message.guild.roles.cache.get('787356580274372628'); 
        message.member.roles.add(role);
        message.channel.send("tu viens d'etre mute.");
        setTimeout(() => {
          message.member.roles.remove(role);
          message.channel.send('Tu viens de retrouver la voix');
        }, TIME);
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  }
  else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log('Removed from map.');
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
});

//////////////////////////////////////////////////



client.login(process.env.TOKEN)