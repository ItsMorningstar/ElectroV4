const Discord = require("discord.js")
exports.run = async (message, args, client) => {

if (!args[0]) return message.lineReply("Tag Not Found.")
const command = args[0];
    const response = await db.get(`tag_${message.guild.id}_${command}`)
    if(await db.get(`tag_${message.guild.id}_${command}`) === null) return message.channel.send(
        new Discord.MessageEmbed()
            .setTitle('um')
            .setDescription(client.emotes.no + 'Tag Not Found.')
    )
    message.channel.send(response)

}
exports.help = {
  name: "tag",
  usage: "tag [tag name]",
  example: 'addtag youtube',
};
exports.conf = {
	cooldown: 2
};