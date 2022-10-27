const Discord = require("discord.js")
exports.run = async (message, args, client) => {

    const msg = message.lineReply;
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
    { return message.channel.send(noPermsEmbed) }
    let command = args[0]
    let reply = args.slice(1).join(" ")

if (!command) return message.lineReply("`What Should The Tag / Command's Name ?`")
if (!reply) return message.lineReply('What Should this tag respond on usage ?')
if (message.mentions.everyone) return message.lineReply("No Sorry, You can't create a tag that would be mentioning anyone")
    if(await db.get(`tag_${message.guild.id}_${command}`) !== null) return message.channel.send({
        embed: {
            title: 'Error',
            description: 'This tag already exists',
        }
    })

    await db.set(`tag_${message.guild.id}_${command}`, reply)
    await message.channel.send({
        embed: {
            title: 'Success!',
            color: 'GREEN',
            description: `I have added the tag \`${command}\` with a reply of \`${reply}\``
        }
    })

}
exports.help = {
  name: "addtag",
  usage: "addtag [name] [response]",
  example: 'addtag youtube https://www.youtube.com/channel/UCbjHxmSMKEo7ML8fGaSKKwA',
};
exports.conf = {
  aliases: ["tagadd", 'newtag', 'atag'],
	cooldown: 3
};