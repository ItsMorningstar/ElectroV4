const Discord = require("discord.js")
exports.run = async(message, args, client) => {

if(!client.devs.includes(message.author.id)) return message.react('<a:Denied:838494379966201946>')

    const embed = new Discord.MessageEmbed()
      .setAuthor('Shutdown ?', message.author.displayAvatarURL())
			.setDescription('👋🏻')
      .setColor('#1900ff')
      const msg = await message.channel.send(embed);
      
      await msg.react("✅");
      await msg.react("❌");
      setTimeout(() => {
    msg.reactions.removeAll()}, 5000)
      const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
      collector.on("collect", async(reaction) => {

      if(reaction._emoji.name === "❌"){
      return message.react(client.emotes.ok)

      }
      if(reaction._emoji.name === "✅"){
      message.react('👋🏻').then(() => {
        process.exit(1);
        })
      }
      });

    }
exports.help = {
  name: "shutdown",
	desc: 'Dev only.',
};
exports.conf = {
  aliases: ["shut"],
};