const Discord = require("discord.js")
exports.run = async (message, args, client) => {

if(!client.devs.includes(message.author.id)) return message.react('<a:Denied:838494379966201946>')
  if (!args[0]) return message.channel.send("You fat, idot gib me something to spam omg")
if(client.spams.get(message.channel.id)) return message.channel.send("stop curent spem first ok")
client.spams.set(message.channel.id, setInterval(() => {
message.channel.send(args.join(" "))
},2000))

}
exports.help = {
  name: "spam",
	desc: 'Dev only.',
};
exports.conf = {
};