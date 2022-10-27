const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
exports.run = async (message, args, client) => {

   const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.lineReply("There is no queue.").catch(console.error);
    if (!args.length) return message.lineReply(`${client.config.prefix}\`remove [song no.]]\``);
    if (isNaN(args[0])) return message.lineReply(`Usage: ${client.config.prefix}\`remove [song no.]\``);
    if (queue.songs.length == 1) return message.lineReply("There is no queue.").catch(console.error);
    if (args[0] > queue.songs.length)
      return message.lineReply(`There are only ${queue.songs.length} songs in the queue.`).catch(console.error);
try{
    const song = queue.songs.splice(args[0] - 1, 1); 
    message.lineReply(`**Removed:** \`${song[0].title}\` from the queue.`).catch(console.error);
                   message.react(client.emotes.ok)
} catch (error) {
        return message.lineReply(`Unexpected error: ${error}`);
      }

}
exports.help = {
	name: "remove",
	usage: "=remove [song no.]",
};
exports.conf = {
	cooldown: 2
};