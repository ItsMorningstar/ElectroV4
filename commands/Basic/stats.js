const Discord = require("discord.js")
exports.run = (message, args, client) => {

message.channel.send(`Pinging...<a:LoadingPing:838494546576932865>`)
.then(async (msg) => {
msg.delete()
let embed = new Discord.MessageEmbed()
.setAuthor("Status", 'https://imgur.com/MKgJfNL.gif')
.addFields(
{ name: 'Availablity', value: `

<:ServerPopulation:838494628969054249> **Servers Count-** 
${client.guilds.cache.size} Servers
<:Member:838494587398914108> **Users Count-**
${client.users.cache.size} Users`
, inline: true },

{ name: 'Ping...', value: `

<a:LoadingPing:838494546576932865> **API Latency**-
${Math.round(client.ws.ping)} ms
<a:LoadingPing:838494546576932865> **Bot Latency**-
${msg.createdTimestamp - message.createdTimestamp} ms
`, inline: true },

{name: 'Creator', value:
("\n[Yoo_ItsMaster](https://discord.com/users/778886089992699904) | [Pitzel](https://discord.com/users/571014376597749783)")},

)

.setThumbnail('https://i.pinimg.com/originals/b3/70/5c/b3705cc2edf8f527789e6e2be29f6267.gif')
.setTimestamp()
.setColor('#1900ff')
 message.channel.send(embed);
})
}

	exports.help = {
  name: "stats",
  usage: "stats",
  example: 'stats',
	desc: "Bot's Status",
};
exports.conf = {
  aliases: ['ping', 'bi', 'botinfo', 'status'],
	cooldown: 3
};
