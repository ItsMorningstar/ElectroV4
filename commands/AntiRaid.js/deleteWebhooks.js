const Discord = require("discord.js")
exports.run = async (message, args, client) => {

  if (!message.member.hasPermission("MANAGE_WEBHOOKS"))
    return message.channel.send(noPermsEmbed);
    const embed = new Discord.MessageEmbed()
    .setAuthor('Are You Sure ?', message.author.displayAvatarURL())
    .setDescription('This will delete all the webhooks ever made in this server.')
    .setFooter('This is recommended at the times of a webhook raid.')
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
        .setDescription(client.emotes.ok + ' No Changes have been made to the server webhooks.')
        .setColor('#002fff')
         message.channel.send(embed);

    }
    if(reaction._emoji.name === "✅"){
    message.react('✅').then(() => {

    const whitelisted = [""]; // ID's of webhook not to delete;
    message.guild.fetchWebhooks().then(hook => hook.filter(h => !whitelisted.includes(h.id)).forEach(h => h.delete()))
let embed = new Discord.MessageEmbed()
.setTitle('Alright')
.setDescription(client.emotes.ok + ' Successfully, Removed All The Webhooks from the server.')
.setColor('#002fff')
  message.channel.send(embed);

})
}
});

}
exports.help = {
  name: "deletewebhooks",
  usage: "deletewebs",
  example: "deletewebs",
  desc: 'Deletes all webhooks from the server.'
};
exports.conf = {
    aliases: ['deletewebs', 'deletewebhook', 'removewebs', 'removewebhooks'],
	cooldown: 3
};
