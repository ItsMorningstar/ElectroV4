const Discord = require("discord.js")
exports.run = async (message, args, client) => {

  if (
    !message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(noPermsEmbed);
  const embed = new Discord.MessageEmbed()    
	.setColor("#1100ff");
  let channel = message.guild.channels.cache.get(args[0]) || message.channel;
  if (args[0] == "reset") {
    embed.setDescription(client.emotes.ok + " `Resetted Message Logs Channel.`");
    db.delete(`${message.guild.id}.messageLogs`, channel.id);
  } else {
    embed.setDescription(`${client.emotes.ok}` + ` Success, ${channel} is set as Message Logs Channel...`);
    db.set(`${message.guild.id}.messageLogs`, channel.id);
  }

  message.channel.send(embed);
}
exports.help = {
  name: "setlogs",
  usage: "=setlogs",
  example: "=setlogs",
};
exports.conf = {
	aliases: ['setlogchannel', 'setlog', 'setmessagelog', 'setaudit', 'setmessagelogS'],
	cooldown: 3
};
