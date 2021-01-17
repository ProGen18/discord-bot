const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
let dispatcher = connection.play(ytdl(args[1], {quality: "hightestaudio" }));
    if(message.member.voice.channel){
        message.member.voice.channel.join().then(connection => {
            
            if(!args[1]){
                message.reply("Veillez mettre un lien valide.")
                //connection.disconnect();
            }
            else {               
                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    message.member.voice.connection.disconnect()
                })}
                dispatcher.on("error", err => {
                    console.log("erreur de dispatcher : " + err);
                });
            }).catch(err => {
                message.reply("erreur lors de la connection : " + err);
            });


    }

}
module.exports.help = {
    name: "play",
    description: "[EN COURS DE DEV] Vous permet d'écouter de la musique",
    aliases: ["p"]
  }