const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
exports.run = async (message, args, client) => {

    const channel = message.member.voice.channel
    if (!channel)return message.lineReply("Join a voice channel to play music.");
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return message.lineReply(client.emotes.no + "There is no song being played to be stopped.");
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return message.lineReply(`${error}`);
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react(client.emotes.ok)
}
exports.help = {
	name: "stop",
	usage: "=stop",
	example: '=stop',
};
exports.conf = {
	aliases: ['clear'],
	cooldown: 2
};