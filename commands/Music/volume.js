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
    if (!serverQueue)return message.lineReply(client.emotes.no + "There is no song being played.");

    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Numbers only!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError(`Volume Level Must Be Within- 0-150`).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`Volume Level: **${args[0]/1}/100**`)
    .setAuthor("Server Volume", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
    .setColor("#1e00ff")
    return message.lineReply(xd)

}
exports.help = {
	name: "volume",
	usage: "=volume [Percent]",
	example: '=volume 77',
	desc: 'Set The Volume Level of Music.'
};
exports.conf = {
	aliases: ['vol'],
	cooldown: 2
};