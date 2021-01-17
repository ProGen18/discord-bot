const Discord = require("discord.js");

module.exports.run = (client, message, args) => { 

  message.delete();
  if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Vous n'avez pas la permission de supprimer des messages !");
  if (!args[0]) return message.channel.send(`Vous deviez spécifier un nombre de messages a supprimer`);

  if (isNaN(args[0])) return message.channel.send(`Veuillez specifier un nombre`);

  if (args[0] > 100 || args[0] == 0) return message.channel.send("Vous devez préciser un chiffre entre 0 et 100")

  if (!args[0]) return message.channel.send("Tu ne m'as pas dit combien de message je devais supprimer ")
  message.channel.messages.fetch({ limit: args[0] }).then((msgs) => {
    message.channel.bulkDelete(msgs)
    message.channel.send(`Je t'ai supprimer ${msgs.size} messages !`);
    message.delete()
    
  })
}

module.exports.help = {
  name: "clean",
  description: "<a:cleanner:773802545038622741> Commandes pour effacer entre 1 et 100 messages",
  aliases: ["clear"]
}