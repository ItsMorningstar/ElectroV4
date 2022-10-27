const Discord = require("discord.js")
exports.run = async (message, args, client) => {

if(!client.devs.includes(message.author.id)) return message.react('<a:Denied:838494379966201946>')
if(!client.spams.get(message.channel.id)) return message.channel.send("start spem first bro")
clearInterval(client.spams.get(message.channel.id))
client.spams.delete(message.channel.id)
message.channel.send("ok bro i stopped spam for u")  // DO I LOOK ### ? :FlushedPineapple: ok this is ok
}
exports.help = {
  name: "stopspam",
	desc: 'Dev only.',
};
exports.conf = {};
