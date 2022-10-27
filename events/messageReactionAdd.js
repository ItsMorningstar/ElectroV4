const Discord = require('discord.js')
module.exports = async (client, reaction, user) => { 
const db = client.db

    let message = reaction.message;
    // Tickets Pannel
    const PanelMessage = await db.get(`PanelMessage_${message.guild.id}`)
    const Panel = await db.get(`Panel_${message.guild.id}`)
    const PanelRole = await db.get(`PannelRole_${message.guild.id}`)
    if(reaction.message.id == PanelMessage  && reaction.emoji.id == '867112054578085898') {
    reaction.users.remove(user).then(
        reaction.message.guild.channels.create(`ticket-${user.username}`, {
        permissionOverwrites: [
            { // For User Who Created Channel Using Reaction
                id: user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            },
            { // For EveryOne In Server
                id: reaction.message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            },
            { // For Mod, Admin etc... // Add As Many As You Like
                id: PanelRole,
                allow: ['SEND_MESSAGES','VIEW_CHANNEL','MANAGE_MESSAGES'] //Add As Many As You Like
            },
        ],
        type : 'text' // type:text For Text Channel and parent:810399250336186398 For In Which Category You Want the Ticket Channel To Be Created
    }).then(async channel => {
        channel.send(`|| <@${user.id}> ||`, new Discord.MessageEmbed()
        .setColor('#000dff')
        .setAuthor('New Ticket By ' + user.tag, user.displayAvatarURL({dynamic: true}))
        .setDescription(`Yo There, ${user} \nPlease wait patiently till a staff member responds to your ticket.`)
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        )
    })
    )}
}