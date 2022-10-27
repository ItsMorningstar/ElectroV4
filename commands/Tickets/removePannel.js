const Discord = require("discord.js")
exports.run = async (message, args, client) => {

    let ticketData = await db.get(`Tickets_${message.guild.id}`)
    if (!message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(noPermsEmbed);
    }
    
    await db.delete(`PanelMessage_${message.guild.id}`)
    await db.delete(`Panel_${message.guild.id}`)
    await db.delete(`PannelRole_${message.guild.id}`)
await message.lineReply(`Successfully, Deleted the Ticket System Cache for this Server!`);
}

exports.help = {
  name: "removepanel",
  usage: "removepanel",
	desc: 'Deletes all tickets cache for a server.',
  example: 'removepanel',
};
exports.conf = {
    aliases: ['panelremove', 'deletepanel', 'clearpanel', 'panelclear'],
	cooldown: 3
}
