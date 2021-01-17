const Discord = require("discord.js");


module.exports.run = (client, message, args) => { 
if(message.author.bot) return;
  console.log(message.mentions);
    console.log(args);
    if(args.length > 2) {
      message.channel.send(`Incorrect Usage: !stats | !stats <user_id> | !stats @mention`);
    } else if(args.length === 2) {
      const member = message.mentions.members.size === 1 ? 
        message.mentions.members.first() :
        message.guild.members.cache.get(args[1]);
      if(member) {
        let embed = new Discord.MessageEmbed()
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
          .setThumbnail(member.user.displayAvatarURL())
          .addField('Created On', member.user.createdAt.toLocaleString(), true)
          .addField('Joined On', member.joinedAt, true)
          .addField('Kickable', member.kickable, false)
          .addField('Voice Channel', member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'None')
          .addField('Presence', member.presence.status)
          .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`);
        message.channel.send(embed);
      } else {
        message.channel.send(`I couldn't find that member with ID ${args[1]}`);
      }
      
    } else {
      const { guild } = message;
      let embed = new Discord.MessageEmbed()
        .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
        .setThumbnail(guild.iconURL())
        .addField('Créer le', guild.createdAt.toLocaleString(), true)
        .addField('Proprietaire', guild.owner.user.tag)
        .addField('Membre totals', guild.memberCount, true)
        .addField('Total des vrais membres', guild.members.cache.filter(member => !member.user.bot).size, true)
        .addField('Total des bots', guild.members.cache.filter(member => member.user.bot).size, true)
        .addField('Total salons', guild.channels.cache.size, true)
        .addField('Total salons textuels', guild.channels.cache.filter(ch => ch.type === 'text').size, true)
        .addField('Total salons vocaux', guild.channels.cache.filter(ch => ch.type === 'voice').size, true)
        .setColor('ff0000')
        .setDescription(`${guild.roles.cache.map(role => role.toString()).join(' ')}`);
      message.channel.send(embed);
    }
} 

module.exports.help = {

    name: "stats",
    aliases: [""],
    description: "stats" 
    }