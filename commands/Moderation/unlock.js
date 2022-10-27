const Discord = require("discord.js")
exports.run = (message, args, client) => {

  if (!message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR"))
{ return message.channel.send(noPermsEmbed) }


      message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });

    let embed = new Discord.MessageEmbed()
      .setAuthor("Alright", client.user.displayAvatarURL())
      .setDescription(`${client.emotes.ok}` + "Unlocked This Channel...")
      .setColor("#1100ff")
      message.channel.send(embed)
}

    exports.help = {
  name: "unlock",
  usage: "unlock",
  example: '!unlock',
}
exports.conf = {
		  aliases:["unlockchannel"],
			cooldown: 1
}
