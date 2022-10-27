const Discord = require("discord.js")
exports.run = async (message, args, client) => {

if(!client.devs.includes(message.author.id)) return message.react('<a:Denied:838494379966201946>')
message.delete()
await message.channel.send(args.join(" "))
}
exports.help = {
  name: "say",
	desc: 'Dev only.',
};
exports.conf = {
};
