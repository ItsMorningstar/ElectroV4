const Discord = require("discord.js")
exports.run = async (message, args, client) => {

if(!client.devs.includes(message.author.id)) return message.react('<a:Denied:838494379966201946>')
    const user = message.mentions.users.first()
    if(!user) return message.channel.send("Please mentions a user to blacklist")
    const Blacklisted = db.fetch(`blacklistedUsers_${user.id}`)
    if(Blacklisted == true) return message.channel.send("**`Already`**")
    message.lineReply(client.emotes.ok + ` **Blacklisted...**`)
    await db.set(`blacklistedUsers_${user.id}`, true)
		let embed = new Discord.MessageEmbed() 
		.setTitle(`Blacklisted`)
		.setDescription(`You were blacklisted from the bot by the owner for violating our terms. \n [Appeal Here](${supportserver})\n**Reason:** ${args.join(' ')}`)
		.setTimestamp()
		await user.send(embed)
}
	 	exports.help = {
  name: "blacklist",
	desc: 'Dev only. || Blacklists a User From Electro',
	usage: 'blacklist',
	example: 'blacklist ',
};
exports.conf = {
	  aliases: ["block"],

};
