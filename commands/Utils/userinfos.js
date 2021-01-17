const Discord = require("discord.js");
const moment = require("moment")
module.exports.run = async (client, message, args) => {
    let member = message.mentions.members.first() || message.member
    let user = member.user;
    let p = message.author.presence.status
    let embed = new Discord.MessageEmbed()
        .setTitle("Information sur un utilisateur")
        .setColor('#ff0000')
        .setThumbnail(user.avatarURL)
        .setTitle(`<:iconmember:774253614683258920> Information sur ${member.user.tag} :`)
        .addField('ID du compte:', `${user.id}`, false)
        .addField('Pseudo sur le serveur :', `${member.nickname ? member.nickname : 'Aucun'}`, false)
        .addField('A crée son compte le :', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, false)
        .addField('A rejoint le serveur le :', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, false)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .addField('<a:allstatus:785161998442561536> Status:', `${p == "dnd" ? "<:dnd:773896409249611797> Cette personne ne veut pas être déranger" : p == "online" ? "<:online:773896341297823744> Cette personne est en ligne" : p == "idle" ? "<:idle:773896375074422804> Cette personne ne fait rien" :"<:offline:775392353623474196> Cette personne est hors ligne"}`, false)
        .addField('<:icongame:775743833140494367> Joue a :', `${user.presence.game ? user.presence.game.name : 'Ne fait rien apparament <:kappa:773860452480188457>'}`, false)
        .addField('<:news:773917647342927872> Roles :', member.roles.cache.map(roles => `${roles.name}`).join(', '), false)
        .addField(`En réponse a :`, `${message.author.username}#${message.author.discriminator}`)
    return message.channel.send(embed)
}

module.exports.help = {
    name: "userinfo",
    aliases: ["ui"],
    description: "<:iconmember:774253614683258920> Donne les informations sur un utilisateur"
}