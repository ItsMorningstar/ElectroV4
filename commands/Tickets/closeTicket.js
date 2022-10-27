const Discord = require("discord.js")
exports.run = async (message, args, client) => {

    let ticketData = await db.get(`Tickets_${message.guild.id}`)
    if (!message.member.hasPermission('MANAGE_GUILD')) {
      return message.channel.send(noPermsEmbed);
    }
    if(!message.channel.name.includes('ticket-')) return message.reply(client.emotes.no + ' This Command Cannot Be Used To Delete a Non-Ticket Channel.') // If Non Ticket Channel Is Tried To Delete
    message.channel.send('Ticket Being Deleted... ' + client.emotes.load)
    await message.channel.delete()

}
exports.help = {
  name: "close",
  usage: "close",
	desc: 'Close a ticket / delete a ticket channel.',
  example: 'close Paid 100k Bobux',
};
exports.conf = {
    aliases: ['closeticket', 'ticketclose'],
	cooldown: 3
}
