const { red } = require("chalk");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
        let msgmentions = message.mentions.users.first();
        if(!msgmentions){
        let userauthor = new Discord.MessageEmbed()
        .setColor("ff0000")
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
        .setTitle("Voici votre photo de profil")
        .setImage(message.author.avatarURL({dynamic: true, size: 2048}))
        message.channel.send(userauthor)
        } else {
        let usermentions = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(msgmentions.tag, msgmentions.avatarURL({dynamic : true}))
        .setTitle("Voici la photo de profil de " + msgmentions.username)
        .setImage(msgmentions.avatarURL({dynamic: true, size: 2048}))
        message.channel.send(usermentions)
        }
};

module.exports.help = {
    name: "avatar",
    description: "🖼️ Commandes pour voir la photo de profil de quelqu'un",
    aliases: ["pp"]
}
