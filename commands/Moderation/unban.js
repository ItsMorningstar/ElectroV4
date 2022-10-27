const Discord = require("discord.js")
exports.run = async (message, args, client) => {

			 let member = message.mentions.members.first();
   if (message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")
  )  {
    let reason = args.slice(1).join(" ")
    let userId = args[0]

    if(!reason) reason = `By ${message.author.username}`;
    if(!userId) return message.channel.send('**`Please provide a ID to unban`**')
    if(isNaN(userId)) return message.channel.send(client.emotes.no + '`Invalid User ID`')

    message.guild.fetchBans().then(async bans => {
        if(bans.size === 0) return message.channel.send("No one is banned in this server...")
        let BannedUser = bans.find(ban => ban.user.id == userId)
        if(!BannedUser) return message.channel.send('Not banned either...')
        await message.guild.members.unban(BannedUser.user, `${message.author.username}: ${reason}`)        

      })
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Alright`, client.user.displayAvatarURL())
        .setDescription(`${client.emotes.ok}` + `Successfully Unbanned- <@${userId}>`)
       .setColor("#1100ff")
        message.lineReplyNoMention(embed);
      } else {
        message.channel.send(noPermsEmbed);
      } 

}

exports.help = {
  name: "unban",
};
exports.conf = {
	cooldown: 3
};
