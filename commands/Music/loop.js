const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
const lyricsFinder = require("lyrics-finder");
exports.run = async (message, args, client) => {

    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "#0008ff",
                    description: `🔁 Loop is **\`${serverQueue.loop === true ? "enabled" : "disabled"}\`** for the queue.`
                }
            });
        };
    return message.lineReply("There is nothing being played.");

  }
exports.help = {
	name: "loop",
	usage: "=loop",
	example: '=loop',
};
exports.conf = {
	cooldown: 2
};