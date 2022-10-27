const Discord = require("discord.js")
exports.run = async (message, args, client) => {

  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(noPermsEmbed);
  const embed = new Discord.MessageEmbed()    
	.setColor("#1100ff");
  let channel = message.guild.channels.cache.get(args[0]) || message.channel;
  if (args[0] == "reset") {
    embed.setDescription(`Removed AI Chat for this server.`);
    await db.delete(`AIchat_${message.guild.id}`)
  } else {
    embed.setDescription(`${client.emotes.ok}` + ` Success, ${channel} is now a AI Chat Channel...`);
    await db.set(`AIchat_${message.guild.id}`, channel.id);
  }

  message.channel.send(embed);
}
exports.help = {
  name: "chat",
  usage: "!chat [channel ID]",
  example: "!chat 338390978261942283",
};
exports.conf = {
	cooldown: 3
};
