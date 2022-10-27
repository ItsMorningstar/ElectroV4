const Discord = require("discord.js")
exports.run = (message, args, client) => {
const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!mention) {
    const avatarAuthor = new Discord.MessageEmbed()
    .setColor("#1100ff")
      .setAuthor(message.author.username)
      .setImage(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 256 }));
    message.channel.send(avatarAuthor);
  } else {

    const avatarMention = new Discord.MessageEmbed()
      .setColor("#1500ff")
      .setAuthor(mention.user.username)
      .setImage(mention.user.displayAvatarURL({ format: "png", dynamic: true, size: 256 }));
    message.channel.send(avatarMention);
  }
}

exports.help = {
  name: "avatar",
  usage: "avatar",
  example: '!avatar',
};
exports.conf = {
  aliases: ["av"],
	cooldown: 3
};
