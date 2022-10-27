const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
exports.run = async (message, args, client) => {
    let channel = message.member.voice.channel
    if (!channel)return message.lineReply("Join a voice channel to play music.");
		
	const permissions = channel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT")) return message.lineReply("I Don't have permision to connect to that voice channel.");
	if (!permissions.has("SPEAK")) return message.lineReply("I Can't speak in that voice channel.");
  message.react(client.emotes.load)
	var searchString = args.join(" ");
	if (!searchString) return message.lineReply("`What you wanna listen ?`");
	const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
	var serverQueue = message.client.queue.get(message.guild.id);

	let songInfo = null;
	let song = null;
	if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
		try {
			songInfo = await ytdl.getInfo(url)
			if (!songInfo) return message.lineReply("Couldn't find any song on YouTube with that name.");
			song = {
				id: songInfo.videoDetails.videoId,
				title: songInfo.videoDetails.title,
				url: songInfo.videoDetails.video_url,
				img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
				duration: songInfo.videoDetails.lengthSeconds,
				ago: songInfo.videoDetails.publishDate,
				views: String(songInfo.videoDetails.viewCount).padStart(10, ' '),
				req: message.author

			};

		} catch (error) {
			console.error(error);
			return message.lineReply(error.message).catch(console.error);
		}
	} else {
		try {
			var searched = await yts.search(searchString);
			if (searched.videos.length === 0) return message.lineReply("I was unable to find that song on YouTube.")

			songInfo = searched.videos[0]
			song = {
				id: songInfo.videoId,
				title: Util.escapeMarkdown(songInfo.title),
				views: String(songInfo.views).padStart(10, ' '),
				url: songInfo.url,
				ago: songInfo.ago,
				duration: songInfo.duration.toString(),
				img: songInfo.image,
				req: message.author
			};
		} catch (error) {
			console.error(error);
			return message.lineReply(error.message).catch(console.error);
		}
	}
    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("Song Queued!", "https://imgur.com/E7Feyrp.gif.gif")
      .setThumbnail(song.img)
      .setColor("#0d00ff")
			.addFields(
{ name: 'Queue', value: `
${song.req} \n**Playing Next** ${song.title} 
`, inline: true})
      .setTimestamp()
      .setFooter(`Views:${song.views}`)
      return message.channel.send(thing);
    }

	const queueConstruct = {
		textChannel: message.channel,
		voiceChannel: channel,
		connection: null,
		songs: [],
		volume: 80,
		playing: true,
		loop: false
	};
	message.client.queue.set(message.guild.id, queueConstruct);
	queueConstruct.songs.push(song);

	const play = async (song) => {
		const queue = message.client.queue.get(message.guild.id);
		let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
		if (!afk[message.guild.id]) afk[message.guild.id] = {
			afk: false,
		};
		var online = afk[message.guild.id]
		if (!song) {
			if (!online.afk) {
				message.lineReply('`I Left the voice channel as the queue already ended.`')
				message.guild.me.voice.channel.leave();
				message.client.queue.delete(message.guild.id);
			}
			return message.client.queue.delete(message.guild.id);
		}
		let stream = null;
		if (song.url.includes("youtube.com")) {

			stream = await ytdl(song.url);
			stream.on('error', function(er) {
				if (er) {
					if (queue) {
						queue.songs.shift();
						play(queue.songs[0]);
						return message.lineReply(`${er}`)
					}
				}
			});
		}
		queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

		const dispatcher = queue.connection
			.play(ytdl(song.url, { quality: 'highestaudio', highWaterMark: 1 << 25, type: "opus" }))
			.on("finish", () => {
				const shiffed = queue.songs.shift();
				if (queue.loop === true) {
					queue.songs.push(shiffed);
				};
				play(queue.songs[0])
			})

		dispatcher.setVolumeLogarithmic(queue.volume / 100);
		let thing = new MessageEmbed()
			.setAuthor("Started Playing Music!", "https://imgur.com/E7Feyrp.gif.gif")
			.setThumbnail(song.img)
			.setColor("#0000ff")
			.addFields(
      { name: 'Music', value: `
			${song.req} \n**Playing:** ${song.title} 
			`, inline: true})

			.setTimestamp()
			.setFooter(`Views:${song.views}`)
		queue.textChannel.send(thing);
	};

	try {
		const connection = await channel.join();
		queueConstruct.connection = connection;
		play(queueConstruct.songs[0]);
	} catch (error) {
		message.client.queue.delete(message.guild.id);
		await channel.leave();
		return message.lineReply((`I was unable to join that voice channel: ${error}`, message.channel))
	}

}
exports.help = {
	name: "play",
	usage: "=play [song name]",
	example: '=play Crab rave',
};
exports.conf = {
	aliases: ['p'],
	cooldown: 2
};