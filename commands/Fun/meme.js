const Discord = require("discord.js")
const fetch = require("node-fetch")
exports.run = async (message, args, client) => {
	
    let data = await fetch(`http://meme-api.herokuapp.com/gimme/memes`).then(res => res.json())
    const embed = new Discord.MessageEmbed()
    embed.setTitle(data.title)
    embed.setURL(data.postLink)
    embed.setColor("#1500ff")
    embed.setFooter(data.ups + " Upvotes")
    embed.setTimestamp()
    embed.setImage(data.url)

    message.channel.send(embed)
}
 exports.help = {
  name: "meme",
  usage: '=meme', 
  example: '=meme',
};
exports.conf = {
	cooldown: 2
};
