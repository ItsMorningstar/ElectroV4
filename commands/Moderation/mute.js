const Discord = require("discord.js")
exports.run = async (message, args, client) => {
  if (!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_GUILD", "MANAGE_MESSAGES")) return message.lineReply(noPermsEmbed)
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.channel.send(client.emotes.no + " **User Not Found**");
		if (member == '778886089992699904') return message.lineReply('Shut up')
    if (member.id == message.author.id) return message.lineReply('Imagine Muting yourself...')

		let reasons = args[1]

    if (!reasons) return message.lineReply("**`Please Provide a Reason As Well.`**")

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.lineReply(client.emotes.no + " You Can't Mute Someone on Same / Higher Role.")

const MutedRole = await db.get(`MutedRole_${message.guild.id}`)
     message.guild.member.roles.cache.add(MutedRole)
        .then((mem) => {
          let embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.ok + ` Alright`)
            .setDescription(` ${mem} is Muted. \n **Reason:** ${args.slice(1).join(" ")}`)
            .setColor("#1100ff")
          message.channel.send(embed);
          member.send({
            embed: {
              title: 'You Were Muted.',
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

exports.help = {
  name: "mute",
  usage: "mute [Member] [Reason]",
  example: 'mute @Pitzel Spamming',
  desc: "Mute those irritating kids who violate rules."
}
exports.conf = {
  cooldown: 3
};