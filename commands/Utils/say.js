const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let reas = args.slice(0).join(" ")
    if(!reas) return message.reply("Veillez entrer un message !")
    
    let embed = new Discord.MessageEmbed()
    .setDescription(reas) 
    .setColor("#ff0000")
    message.channel.send(embed)

};

module.exports.help = {
    name: "say",
    aliases: [],
    description: "<:icontextchannel:774254975239847968> Te permet de faire dire au bot un petit message !"
}