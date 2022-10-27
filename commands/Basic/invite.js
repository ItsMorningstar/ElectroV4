const Discord = require("discord.js")
exports.run = (message, args, client) => {

    let embed = new Discord.MessageEmbed()
      .setAuthor("Invite", client.user.displayAvatarURL())
      .setDescription(`[Invite Electro](${client.invite})`)
    .setColor('#1900ff')
    message.channel.send(embed);
  }

exports.help = {
  name: "invite",
  usage: "invite",
	example: 'invite',
	desc: 'Invite electro to your server 😉',
};
exports.conf = {
	aliases: [],
	cooldown: 2
};


