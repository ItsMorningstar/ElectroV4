const Discord = require("discord.js")
exports.run = (message, args, client) => {
let prefix;
   if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(noPermsEmbed);

    const newprefix = args[0]
    if(!newprefix) return message.reply('`Set To What ?`')
    if(newprefix.length > 5) return message.channel.send("`Too Long.`")
    db.set(`prefix_${message.guild.id}`, newprefix);
message.channel.send({
      embed: {
        title: "Alright",
        color: "#1100ff",
        description: `Prefix Set To \`${newprefix}\``,
      },
    });
}
exports.help = {
  name: "setprefix",
  usage: "setprefix [new prefix]",
  example: '=setprefix +',
	desc: "Change Bot's Prefix if needed.",
};
exports.conf = {
    aliases: ['setprefix', 'prefixset'],
    cooldown: 5
};
