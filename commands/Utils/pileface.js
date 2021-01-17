const Discord = require("discord.js");

    module.exports.run = (client, message, args) => {
  
        const replies = ["pile", "face"];
        const response = Math.floor(Math.random() * replies.length);
  
        if (args[0]&& args[0].toLowerCase() == "pile") {
        if (args[0]&& args[0].toLowerCase() != replies[response]) message.channel.send(`${message.author.username} t'as lancé une pièce et, \n ||t'as perdu, la pièce est tombée sur ${replies[response]}! <:sad:773518353108041758>||`);
         else if (args[0]&& args[0].toLowerCase() == replies[response]) message.channel.send(`${message.author.username} t'as lancé une pièce et, ||\n t'as gagné, la pièce est tombée sur ${replies[response]}! <a:giveaways:773926352590995457> ||`);}
  
        else if (args[0]&& args[0].toLowerCase() == "face") {
        if (args[0]&& args[0].toLowerCase() != replies[response]) message.channel.send(`${message.author.username} t'as lancé une pièce et, \n ||t'as perdu, la pièce est tombée sur ${replies[response]}! <:sad:773518353108041758>||`);
        else if (args[0]&& args[0].toLowerCase() == replies[response]) message.channel.send(`${message.author.username} t'as lancé une pièce et, ||\n t'as gagné, la pièce est tombée sur ${replies[response]}! <a:giveaways:773926352590995457> ||`);}
  
        else {
        message.channel.send("Dites pile ou face...")
        }
    };

module.exports.help = {
    name: "pileface",
    aliases: ["pf"],
    description: "<a:cup:773862600647770112> Pile ou face un petit jeu sympathique !"
    }