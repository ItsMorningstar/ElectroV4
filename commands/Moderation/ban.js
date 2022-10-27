const Discord = require("discord.js")
exports.run = (message, args, client) => {

  if (message.member.hasPermission("BAN_MEMBERS")
  ) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.channel.send(client.emotes.no + " **User Not Found**");
		if (member == '778886089992699904') return message.lineReply('Shut up')
    if (member.id == message.author.id) return message.lineReply('Imagine Banning yourself...')
		
		let reasons = args[1]

    if (!reasons) return message.lineReply("**`Please Provide a Reason As Well.`**")
    let userId = args[0]

    if (
      member.hasPermission("ADMINISTRATOR") || member.hasPermission("MANAGE_GUILD") || member.hasPermission("MANAGE_MESSAGES") || member.hasPermission("KICK_MEMBERS") || member.hasPermission("BAN_MEMBERS") ) {
      return message.channel.send(`${client.emotes.no}` + " **`The User is a Server Admin / Moderator, So can't do that`**"
		)}
    else {
      member
        .ban({ reason: `${message.author.username}: ${args.slice(1).join(" ")}` })
        .then((member) => {
          let embed = new Discord.MessageEmbed()
            .setAuthor(`Alright`, client.user.displayAvatarURL())
            .setDescription(`${client.emotes.ok}` + ` Success, Banned ${member} \n **Reason:** ${args.slice(1).join(" ")}`)
            .setImage("https://media1.tenor.com/images/a252b64244796945dce8880d1164f05e/tenor.gif")
            .setColor("#1100ff")
          message.lineReplyNoMention(embed);
          member.send({
            embed: {
              title: 'You Were Banned !',
              color: "#1100ff",
              description: `**Server:** ${message.guild.name} \n **Reason**: ${args.slice(1).join(" ")}`
            }
          })
          member.send('<a:GunBanned1:838483990402564116><a:GunBanned2:838483922626019338><a:GunBanned3:838483622804586506> ')
        })
    }
  } else {
    message.channel.send(noPermsEmbed)
  }
}

exports.help = {
  name: "ban",
  usage: "ban",
  example: '!ban',
};
exports.conf = {
  cooldown: 3
};