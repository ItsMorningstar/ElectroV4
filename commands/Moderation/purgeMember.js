const Discord = require("discord.js")
exports.run = async(message, args, client) => {

let member = message.mentions.members.first()
let amount = args[1]
const msgg = message.channel
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
    { return message.channel.send(noPermsEmbed) }
        if (!message.guild.members.cache
            .get(client.user.id)
            .hasPermission("MANAGE_MESSAGES")) {
          return message.lineReply(`${client.emotes.no}` + "`I Don't have permissions to execute the task.`")};

if(!member) return message.lineReply(`${client.emotes.no}` + "`Please Mentioned The User to Purge Messaegs Of.`")
if(!amount) return message.lineReply(`${client.emotes.no}` + "`How Many Messages To Purge ?`")
if(isNaN(amount)) return message.lineReply("Why the hell are you even using command if u have to purge nothing kid")
if(amount > 99) return message.lineReply("100 Messages is the limit of purge.")
let AllMessages = await message.channel.messages.fetch()
let FilteredMessages = await AllMessages.filter(x => x.author.id === member.id)
let deletedMessages = 0
FilteredMessages.forEach(msgg => {
    if(deletedMessages >= amount) return
    msgg.delete()
    deletedMessages++
})
}
exports.help = {
    name: "purgemember",
    usage: "purgemember",
    example: 'purgemember',
  };
  exports.conf = {
    aliases:["purgemem", 'prunemember', 'purgem', 'prunem'],
      cooldown: 2
  };