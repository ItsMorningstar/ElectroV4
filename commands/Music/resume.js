const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
exports.run = async (message, args, client) => {

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setColor("#0004ed")
      .setAuthor("▶ Music Resumed !", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
      return message.channel.send(xd);
    }
    return message.lineReply("There is nothing playing in this server.")

}
exports.help = {
	name: "resume",
	usage: "=resume",
};
exports.conf = {
	cooldown: 2
};