const Discord = require("discord.js")
exports.run = (message, args, client) => {

  if (!message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) return message.channel.send(noPermsEmbed);
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true });

    let embed = new Discord.MessageEmbed()
      .setAuthor("Alright", client.user.displayAvatarURL())
      .setDescription(`${client.emotes.ok}` + `${message.author} Channel is now visible to @everyone`)
      .setColor("#1100ff")
      message.channel.send(embed)
}
    exports.help = {
  name: "publicchannel",
}
exports.conf = {
		  aliases:["public", 'unprivate'],
			cooldown: 3
}