const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
exports.run = async (message, args, client) => {

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.lineReply("There is no song being played.");
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Now Playing", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
      .setThumbnail(song.img)
      .setColor("#0008ff")
			.addFields(
      { name: 'Music', value: `
			${song.req} \n**Playing:** ${song.title} 
			`, inline: true})
			.setTimestamp()
      .setFooter(`Views: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)

}
exports.help = {
	name: "nowplaying",
	usage: "=np",
	example: '=np',
};
exports.conf = {
	aliases: ['np'],
	cooldown: 2
};