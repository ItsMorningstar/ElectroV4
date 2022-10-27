const Discord = require("discord.js")
exports.run = (message, args, client) => {

    let embed = new Discord.MessageEmbed()
      .setAuthor("Support Server", client.user.displayAvatarURL())
      .setDescription(`[Join Support Server](${client.server})`)
    .setColor('#1900ff')
    message.channel.send(embed);
  }

exports.help = {
	name: 'support',
	usage: "support",
  example: 'support',
	desc: "Bot's Support Server",
};
exports.conf = {
	cooldown: 2
}