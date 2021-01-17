const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
      
    let embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle("<a:loadingDiscord:788352702987501609> **Informations sur les commandes :**")
    .setFooter("ProGen | Développé par 𝑷𝒓𝒐𝒈𝒆𝒏 #4444")
    client.commands.forEach(cmd => embed.addField(`${cmd.help.name} :`, cmd.help.description))
    embed.addField("**Serveur important** :", "https://discord.gg/yRAQAc4Ra8")  
     
    return message.channel.send(embed);
      
};  
      
module.exports.help = {
name: "help",
aliases: [],
description: "<:news:773917647342927872> Affiche les commandes du bot"
}