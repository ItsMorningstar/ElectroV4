const Discord = require("discord.js")
exports.run = async (message, args, client) => {

  if (!message.member.hasPermission("MANAGE_GUILD"))
{ return message.channel.send(noPermsEmbed) }


  let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor('#1900ff')
    .setFooter(`You need to unlock each channel after locking whole server.`)
    .setTitle(`Lockdown Server ?`)
    .setDescription('✅ Are u sure u wanna lockdown all channels ? \n ❌ No Lockdown...');

  const msg = await message.lineReply(embed);

  await msg.react("✅");
  await msg.react("❌");
  setTimeout(() => {
    msg.reactions.removeAll()
  }, 7000)
  const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
  collector.on('collect', async (reaction) => {

    if (reaction._emoji.name === "❌") {
      return message.channel.send("`Nuke Fell Somewhere else, no casualties here !`" + `${client.emotes.party}`)

    }
    if (reaction._emoji.name === "✅") {

let embed = new Discord.MessageEmbed()
      .setAuthor('Alright', client.user.displayAvatarURL())
      .setDescription(`${client.emotes.ok}` + 'The Server is locked down for @everyone By ' + message.author)
      .setColor("#1100ff")
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(client.emotes.no + `Nope, No Perms for you.`)
      await message.channel.send(embed);
			
			  message.guild.channels.cache.forEach(channel => {
        channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false }).catch(err => {
  message.lineReply(client.emotes.ok + "`I Don't have perms to do that...`")
})
      })
	}})
  }

	exports.help = {
  name: "lockdown",
  usage: "lockdown",
  example: '!lockdown',
};
exports.conf = {
	  aliases:["serverlock"],
		cooldown: 5
};
