const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
exports.run = async (message, args, client) => {

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return message.lineReply(`${error}`);
      }	    
      let xd = new MessageEmbed()
      .setColor("#0d00ff")
      .setTitle("⏸ Music Paused !")
			.setDescription('`=resume` To Resume again!')
      return message.channel.send(xd);
    }
    return message.lineReply("There is no song being played.")

}
exports.help = {
	name: "pause",
	usage: "=pause",
	example: '=pause',
};
exports.conf = {
	cooldown: 2
};