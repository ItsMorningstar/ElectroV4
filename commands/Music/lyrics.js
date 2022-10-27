const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
const lyricsFinder = require("lyrics-finder");
exports.run = async (message, args, client) => {

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("**`There is no song being played..`**").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `**No lyrics found** for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `**No lyrics** found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`Lyrics  — ${queue.songs[0].title}`, "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
      .setThumbnail(queue.songs[0].img)
      .setColor("#0307fc")
      .setDescription(lyrics)
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);

}
exports.help = {
	name: "lyrics",
	usage: "=lyrics",
	example: '=lyrics',
};
exports.conf = {
	cooldown: 2
};