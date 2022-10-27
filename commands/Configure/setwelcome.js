const Discord = require("discord.js")
const discord = Discord
exports.run = async (message, args, client) => {

  if (
    !message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(noPermsEmbed);
  const embed = new Discord.MessageEmbed()    
	.setColor("#1100ff");
  let channel = message.guild.channels.cache.get(args[0]) || message.channel;
  if (args[0] == "reset") {
    embed.setDescription(client.emotes.ok + ` Success, Removed The Channel as Welcome Channel.`);
    await db.delete(`welcomeChannel_${message.guild.id}`, channel.id);
  } else {
    embed.setDescription(client.emotes.ok + ` Success, ${channel} is now a Welcome Channel...`);
    await db.set(`welcomeChannel_${message.guild.id}`, channel.id)
  }
}

exports.help = {
  name: "setwelcome",
  usage: "=setwelcome",
};
exports.conf = {
aliases: ['setWelcome', 'greet'],
cooldown: 3
}
