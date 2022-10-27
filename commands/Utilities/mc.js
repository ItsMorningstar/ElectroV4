const Discord = require("discord.js")
exports.run = (message, args, client) => {
  let embed = new Discord.MessageEmbed()
    .setAuthor("Members", message.guild.iconURL())
    .setDescription(`**${message.guild.memberCount}**`)
    .setColor("#1100ff")
  message.channel.send(embed);
}
exports.help = {
  name: "membercount",
  usage: "membercount",
  example: '!membercount',
};
exports.conf = {
  aliases: ["mc"],
  cooldown: 2
};
