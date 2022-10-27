const Discord = require("discord.js")
exports.run = (message, args, client) => {
  if (message.member.hasPermission("KICK_MEMBERS")
  ) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.channel.send(client.emotes.no + " **`User Not Found`**");
		if (member == '778886089992699904') return message.lineReply('Shut up')
    if (member.id == message.author.id) return message.lineReply('Imagine Banning yourself...')

		let reasons = args[1]

    if (!reasons) return message.lineReply("**`Please Provide a Reason As Well.`**")
    let userId = args[0]

    if (
      member.hasPermission("ADMINISTRATOR") || member.hasPermission("MANAGE_GUILD") || member.hasPermission("MANAGE_MESSAGES") || member.hasPermission("KICK_MEMBERS") || member.hasPermission("BAN_MEMBERS") ) {
      return message.channel.send(`${client.emotes.no}` + " **`The User is a Server Admin / Moderator, So can't do that`**"
      )
    }
    else {
      member
        .kick(`${message.author.username}: ${args.slice(1).join(" ")}`)
        .then((mem) => {
          let embed = new Discord.MessageEmbed()
            .setAuthor(`Alright`, client.user.displayAvatarURL())
            .setDescription(`${client.emotes.ok}` + ` Success, Kicked ${mem} \n **Reason:** ${args.slice(1).join(" ")}`)
            .setThumbnail("https://media1.tenor.com/images/9f8bb51d0290543e2e2c5938b21309bf/tenor.gif")
            .setColor("#1100ff")
          message.channel.send(embed);
          member.send({
            embed: {
              title: 'You Were Kicked !',
              color: "#1100ff",
              description: `**Server:** ${message.guild.name} \n **Reason**: ${args.slice(1).join(" ")}`
            }
          }).catch((e) => {
          message.channel.send(`Couldn't DM The User.`);
        });
        })
        .catch((error) => {
          let embed = new Discord.MessageEmbed()
            .setAuthor("Error...", message.guild.iconURL())
            .setDescription(error.toString())
            .setColor("#1100ff")
          message.channel.send(embed);
        })
    }
  } else {
    message.channel.send(noPermsEmbed)
  }
}

exports.help = {
  name: "kick",
  usage: "kick",
  example: '!kick',
}
exports.conf = {
  cooldown: 3
};