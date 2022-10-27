const Discord = require("discord.js")
exports.run = (message, args, client) => {
	
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(noPermsEmbed);

  message.channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: false });

    let embed = new Discord.MessageEmbed()
      .setAuthor("Alright", client.user.displayAvatarURL())
      .setDescription(`${client.emotes.ok}` + `${message.author} Channel Is Hidden For @everyone...`)
            .setColor("#1100ff")
      message.channel.send(embed)
}
    exports.help = {
  name: "privatechannel",
}
exports.conf = {
		  aliases: ["private", 'unpublic'],
			cooldown: 3
}