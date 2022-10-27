const Discord = require("discord.js")
exports.run = async (message, args, client) => {

  if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.channel.send(noPermsEmbed);
    const embed = new Discord.MessageEmbed()
    .setAuthor('Are You Sure ?', message.author.displayAvatarURL())
    .setDescription('This will private all channels of this server for @everyone role only.')
    .setColor('#1900ff')
    const msg = await message.channel.send(embed);
    
    await msg.react("✅");
    await msg.react("❌");
    setTimeout(() => {
  msg.reactions.removeAll()}, 5000)
    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
    collector.on("collect", async(reaction) => {

    if(reaction._emoji.name === "❌"){
        let embed = new Discord.MessageEmbed()
        .setTitle('Alright')
        .setDescription(client.emotes.ok + ' No Changes have been made to any of the channels.')
        .setColor('#002fff')
         message.channel.send(embed);

    }
    if(reaction._emoji.name === "✅"){
    message.react('✅').then(() => {


    message.guild.channels.cache.forEach((c) => c.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: false })) 

    let embed = new Discord.MessageEmbed()
.setTitle('Alright')
.setDescription(client.emotes.ok + ' Successfully, Privated All The Channels Of Server for @everyone')
.setFooter('Use =publicall to make all channels visible to @everyone')
.setColor('#002fff')
  message.channel.send(embed);

})
}
});

}
exports.help = {
  name: "privateall",
  usage: "privateall",
  example: "privateall",
};
exports.conf = {
    aliases: ['privatechannels', 'privateserver'],
	cooldown: 3
};
