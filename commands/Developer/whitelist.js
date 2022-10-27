const Discord = require("discord.js")
exports.run = async (message, args, client) => {

if(!client.devs.includes(message.author.id)) return message.react('<a:Denied:838494379966201946>')
    const user = message.mentions.users.first()
    if(!user) return message.channel.send("**`Who ?`**")
    const Blacklisted = db.fetch(`blacklistedUsers_${user.id}`)
    if(Blacklisted == false) return message.channel.send("**`Was Never Blacklisted Either...`**")
    
    db.set(`blacklistedUsers_${user.id}`, false)
    message.lineReply(client.emotes.ok + ` **Whitelisted...**`)
	 let embed = new Discord.MessageEmbed()
		.setTitle(`Whitelisted`)
		.setDescription(`You were whitelisted from the bot by developer but if you continue to violate the terms, it will be a permanent blacklist.\n**Reason:** ${args.join(' ')} `)
		.setTimestamp()
		user.send(embed)
}
	 	exports.help = {
  name: "whitelist",
	desc: 'Dev only.',
};
exports.conf = {
	  aliases: ["unblock"],
};
