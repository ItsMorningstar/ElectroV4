const Discord = require("discord.js")
exports.run = async (message, args, client) => {

const embed = new Discord.MessageEmbed()
.setColor("#1100ff")

let afk = new db.table("AFKs"),
  authorStatus = await afk.fetch(message.author.id);

let reason = args.join(" ") || "Away"  
    if (!authorStatus) {
      embed.setDescription(`${message.author}` + " is now AFK. \n \n `Reason:` " + reason);
      afk.set(message.author.id, reason);
    } else {
      embed.setDescription('Welcome back!\nYou are no longer AFK')
      afk.delete(message.author.id);
    }
    message.channel.send(embed)
}

exports.help = {
  name: "afk",
  usage: "afk [reason]",
  example: '!afk eating',
};
exports.conf = {
  aliases: ["away"],
	cooldown: 3
};