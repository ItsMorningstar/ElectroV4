const Discord = require('discord.js')
module.exports = async (client, message) => {
const db = client.db

if(message.author.id == client.user.id) return

const snipes = await db.get(`snipes_${message.channel.id}`) || [];
await snipes.unshift({
  content:message.content,
  author:message.author,
  image: message.attachments.first() ? message.attachments.first().proxyURL : null, 
  timestamp: message.createdTimestamp
});
await db.set(`snipes_${message.channel.id}`, snipes.slice(0 , 14)); 
const deleteLogsChannel = client.channels.cache.get(await db.get(`${message.guild.id}.messageLogs`))
    if (deleteLogsChannel) {

        try {
	  const snipesL = new Discord.Collection()
    snipesL.set(message.channel.id, message)
    const DeletedLog = new Discord.MessageEmbed()
		.setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}** \n ${message.content}`)
		.setThumbnail(message.attachments.first() ? message.attachments.first().proxyURL : null)
		.setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`)
		.setTimestamp()
    .setColor('#ff0000')

    deleteLogsChannel.send(DeletedLog)
       
			  } catch (e) {
					return;
            console.log(e.string)
        }
    }
}