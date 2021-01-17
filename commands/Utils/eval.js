const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const ids = ["660642627536027668", "502159636175257600"]
    if(!ids.includes(message.author.id)) return message.channel.send("<:non:772782369190051861> Cette commmande est reservée aux administrateurs du bot !");
    const content = args.join(" ")
    if(!content) return message.reply("ecrit un truc mdrr")
    try {
        const result = new Promise(async (resolve) => resolve(await eval(content)))
        return result.then(async (output) => {
            if (typeof output !== "string") {
                output = require("util").inspect(output, { depth: 0 })
            }
            if (output.includes(client.token)) {
                output = output.replace(client.token, "T0K3N")
            }
            message.channel.send(output, {
                code: "js"
            })
        })
    } catch  (err) {
        err = err.toString();
        if (err.includes(client.token)) {
            err = err.replace(client.token, "T0K3N");
        }
        message.channel.send(err, {
            code: "js"
        });
    }

};

module.exports.help = {
    name: "eval",
    aliases: ["ev"],
    description: "<:staff:771056401228628019> [ADMIN] Sert à executer un code dans le terminal"
}