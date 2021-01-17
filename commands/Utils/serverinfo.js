const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setTitle("Information sur le serveur")
          .setAuthor(message.author.tag)
          .setDescription(`Information sur : ${message.guild}`)
          .addField("Roles" ,
           message.guild.roles.cache.size, true
          )
          .addField(
            "<a:couronne:780707209247981608> Propriétaire",
            `Le propriétaire de ce serveur est : ${message.guild.owner}`, false
          )
          .addField(
            "<a:aaaa:790258456774705152> Quantité d'émoji personnalisé",
            `Ce serveur contient : ${message.guild.emojis.cache.size} emojis`
          )
          .addField(
            "<a:aa:790257231945007114> Quantité de rôles",
            `Ce serveur contient : ${message.guild.roles.cache.size} rôles`
          )
          .addField(
            "<a:earth:773862092473106432> Localisation",
            `Ce serveur se situe en : ${message.guild.region}`
          )
          .addField("<:iconmember:774253614683258920> Nombre de membres", 
          `Total : ${message.guild.members.cache.size} \n Humains : ${message.guild.members.cache.filter(member => !member.user.bot).size} \n Bots : ${message.guild.members.cache.filter(member => member.user.bot).size}`, false
          )
          .addField(
            "Date de création",
            `La date de création de ce serveur est : ${message.guild.createdAt.toLocaleString()}`
          )
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
          .setTimestamp();
      
          return message.channel.send(embed)

};

module.exports.help = {
    name: "serverinfo",
    aliases: ["si"],
    description: "<:iconguild:774253562993442836> Donne les informations sur le serveur"
}