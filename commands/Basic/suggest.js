const Discord = require("discord.js")
exports.run = (message, args, client) => {

  if (!args[0]) {
	message.channel.send('`Please mention your Suggestion as well...`')
	}
  if (args[0]) {
const channel = client.channels.cache.get('852873145123864576')
    let embed = new Discord.MessageEmbed()
      .setAuthor(`Suggestion by ${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
      .setDescription(args.join(" "))
      .setFooter(`From: ${message.guild.name} (${message.guild.id})`)
    .setColor('#1900ff')
    channel.send(embed)
.then(msg => { msg.react('<:ThumbsUp:862756534445539408>'); msg.react('<:ThumbsDown:862756494553251842>') }) 
		message.lineReply('Suggestion Successfully Posted In Support Server !')
  }}
exports.help = {
	name: 'suggest',
	usage: "suggest [suggestion]",
  example: 'suggest [Invie Tracking.]',
	desc: "Suggest new features, you would like to have in the bot.",
};
exports.conf = {
	cooldown: 5
}
