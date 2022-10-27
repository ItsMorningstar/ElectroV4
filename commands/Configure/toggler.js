const Discord = require("discord.js")
exports.run = (message, args, client) => {

   if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {
        title: "Nope",
        color: "#1100ff",
        description: client.emotes.no + "Required Permission - `MANAGE_SERVER`",
      }});

message.channel.send({
      embed: {
        title: "Enable / Disable Commands",
        color: "#1100ff",
        description: '`=toggle [command] on/off`',
      },
    });
}
exports.help = {
  name: "toggler",
  usage: "=toggler",
  example: '=toggler',
	desc: 'i wonder how u managed to see this',
};
exports.conf = {
    aliases: ['enable', 'disable'],
    cooldown: 5
};
