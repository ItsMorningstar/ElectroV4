const Discord = require("discord.js")
exports.run = async (message, args, client) => {

    let data = []

    await db.all().filter(x => x.ID.startsWith(`tag_${message.guild.id}`)).forEach(async m => {
        let a = m.ID.split("_")
        data.push(`\`${a[2]}\``)
    })
    message.channel.send({
        embed: {
            title: `Tags Available in ${message.guild.id}`,
            description: data.join(', ')
        }
    })
    }
exports.help = {
  name: "tagslist",
  usage: "tagslist [tag name]",
  example: 'tagslist youtube',
};
exports.conf = {
    aliases: ['taglist', 'tags', 'listtags'],
	cooldown: 2
};