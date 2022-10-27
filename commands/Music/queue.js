const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
exports.run = async (message, args, client) => {

  const permissions = message.channel.permissionsFor(message.client.user);
    if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))
      return message.lineReply("I Don't have neccessary permissions..");

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.lineReply("There is no song being played.")

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);

    const queueEmbed = await message.channel.send(
      `**\`${currentPage + 1}\`**/**${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("🛑");
      await queueEmbed.react("➡️");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["⬅️", "🛑", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    })

}
exports.help = {
	name: "queue",
	usage: "=queue",
	example: '=queue',
};
exports.conf = {
	aliases: ['q'],
	cooldown: 2
}

function generateQueueEmbed(message, queue) {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current.map((track) => `**\`${++j}\`** | [\`${track.title}\`](${track.url})`).join("\n");
  
    const serverQueue = message.client.queue.get(message.guild.id);
    const embed = new MessageEmbed()
     .setAuthor("Songs Queue", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
    .setThumbnail(message.guild.iconURL())
    .setColor("#0008ff")
    .setDescription(`${info}`)
    .addField("Now Playing", `[${queue[0].title}](${queue[0].url}) \n in ${serverQueue.voiceChannel}`, true)
    .setFooter("Volume - " + serverQueue.volume + '%')

    embeds.push(embed);
  }

  return embeds;
 
};