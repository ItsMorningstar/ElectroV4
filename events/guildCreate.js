const Discord = require("discord.js")
module.exports = (client, guild)=>{

	let embed = new Discord.MessageEmbed()
      .setAuthor('Added', guild.iconURL())
      .setDescription(`**Server:** ${guild.name}  [${guild.id}] \n Count: ${guild.memberCount}\n **Owner:** ${guild.owner} [${guild.owner.id}] `)
      .setColor('#1900ff')
client.channels.cache.get('857290675192070205').send(embed)
}