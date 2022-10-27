const Discord = require('discord.js')
module.exports = async (client, oldMessage, newMessage) => {
	const db = client.db
if (newMessage.author.bot) return;
	  const editLogsChannel = client.channels.cache.get(await db.fetch(`${oldMessage.guild.id}.messageLogs`))
    if (editLogsChannel) {
        try {
    if(!editLogsChannel) return;
    const EditedLog = new Discord.MessageEmbed()
		.setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
		.setDescription(`**Edited By ${oldMessage.author} In ${oldMessage.channel}**`)
    .addField('Old Message', oldMessage.content || "empty") 
    .addField('New Message', newMessage.content || "empty")
	  .setThumbnail(oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null)
		.setFooter(`Author: ${oldMessage.author.id} | Message ID: ${oldMessage.id}`)
		.setTimestamp()
		.setColor('#1100ff')
		           await editLogsChannel.send(EditedLog)
					  } catch (e) {
					return;
            console.log(e.string)
        }
    }
}