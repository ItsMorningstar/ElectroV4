const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
exports.run = async (message, args, client) => {

    let channel = message.member.voice.channel
    if (!channel)return message.lineReply("Join a voice channel to play music.");
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return message.lineReply(client.emotes.no + "There is no song being played to be skipped.");
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Music Resumed")
      .setColor("#1c03fc")
      .setTitle("Music has been Resumed!")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }
       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return message.lineReply(`${error}`);
      }
    message.react(client.emotes.ok)

		}
exports.help = {
	name: "skip",
	usage: "=skip",
	example: '=skip',
};
exports.conf = {
	cooldown: 2
};