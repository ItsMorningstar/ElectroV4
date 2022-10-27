const Discord = require("discord.js")
exports.run = async (message, args, client) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
    { return message.channel.send(noPermsEmbed) }
    let tag = args[0]
    if(!tag) return message.channel.send(
        new Discord.MessageEmbed()
            .setTitle('Error')
            .setDescription('Please provide a tag for me to delete!')
    )
    if(await db.get(`tag_${message.guild.id}_${tag}`) === null) return message.channel.send(
        new Discord.MessageEmbed()
            .setTitle('Error')
            .setDescription('No such tag exists!')
    )
    await db.delete(`tag_${message.guild.id}_${tag}`)
    await message.channel.send(
        new Discord.MessageEmbed()
            .setTitle('Success!')
            .setColor("GREEN")
            .setDescription('I have deleted the tag ' + tag)
    )
}

exports.help = {
  name: "deletetag",
  usage: "delete [name]",
  example: 'deletetag youtube',
};
exports.conf = {
  aliases: ["tagdelete"],
  cooldown: 3
};