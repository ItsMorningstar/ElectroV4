const Discord = require("discord.js")
exports.run = async (message, args, client) => {

    let ticketData = await db.get(`Tickets_${message.guild.id}`)
    if (!message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(noPermsEmbed);
    }
    
    if (!ticketData) {
        let msgs = await message.channel.send(new Discord.MessageEmbed()
            .setTitle('Ticket System Setup')
            .setDescription("What do you want the pannel's description to be?")
            .setColor('#0400ff'))
        const firstFilter = m => m.author.id === message.author.id;
        const firstCollector = new Discord.MessageCollector(message.channel, firstFilter, { max: 2 });
        let embedDescription;
        firstCollector.on('collect', async msg => {
            embedDescription = msg.content;
await msgs.edit(
            new Discord.MessageEmbed()
                .setTitle('Ticket System Setup')
                .setDescription('In Which Channel To Set The Ticket Panel.')
            .setColor('#0400ff')); msg.delete()
            firstCollector.stop();
            const secondFilter = m => m.author.id === message.author.id;
            const secondCollector = new Discord.MessageCollector(message.channel, secondFilter, { max: 2 });

            secondCollector.on('collect', async msg => {
		
                let embedChannel = msg.mentions.channels.first();
                if (!embedChannel) {
await msgs.edit(
            new Discord.MessageEmbed()
                .setTitle('Ticket System Setup Cancelled')
                .setDescription("That's not a valid channel.")
            .setColor('#0400ff'))
                    secondCollector.stop();
                    return;
                }
await msgs.edit(
            new Discord.MessageEmbed()
                .setTitle('Ticket System Setup')
                .setDescription('Which roles do you want to have access to see tickets? Please provide a role name, mention, or ID.')
                .setColor('#0400ff')); msg.delete()
                secondCollector.stop();

                const thirdFilter = m => m.author.id === message.author.id;
                const thirdCollector = new Discord.MessageCollector(message.channel, thirdFilter, { max: 2 });
                const savedRole = message.mentions.roles.first() || message.guild.roles.cache.get(message.content) || message.guild.roles.cache.find(role => role.name.toLowerCase() === message.content.toLowerCase());

                thirdCollector.on('collect', async message => {
									
                    const savedRole = message.mentions.roles.first() || message.guild.roles.cache.get(message.content) || message.guild.roles.cache.find(role => role.name.toLowerCase() === message.content.toLowerCase());

                    if (!savedRole) {
await msgs.edit(
            new Discord.MessageEmbed()
                .setTitle('Ticket System Setup Cancelled')
                .setDescription("That's not a valid role.")
            .setColor('#0400ff')) 
                        thirdCollector.stop();
                        return;
                    }
										message.delete()
await msgs.edit(
            new Discord.MessageEmbed()
                .setTitle(client.emotes.ok + 'Ticket System Setup Complete')
                .setColor('#0400ff')); 
                    thirdCollector.stop();

                    await createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole)
                });
            });
        });
    } else {
await db.delete(`Pannel_${message.guild.id}`)
await db.delete(`Role_${message.guild.id}`)
await db.delete(`PannelMessage_${message.guild.id}`)
await message.lineReply(`**Successfully Reset the Ticket System on your Server!**`);
    }
}
exports.help = {
  name: "setuppanel",
  usage: "setuppanel",
	desc: 'Set The Tickets Panel in The Server.',
  example: 'setuppanel',
};
exports.conf = {
    aliases: ['panelsetup', 'addpanel', 'newpanel'],
	cooldown: 3
}
async function createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole) {
	const Discord = require('discord.js')
    const pannel = new Discord.MessageEmbed()
        .setTitle('__Tickets Pannel__')
        .setDescription(embedDescription)
        .setThumbnail(message.guild.iconURL())
        .setColor('#2600ff')

    let msg = await embedChannel.send(pannel);
    await msg.react('867112054578085898');

await db.set(`PanelMessage_${message.guild.id}`, msg.id)
await db.set(`Panel_${message.guild.id}`, embedChannel.id)
await db.set(`PannelRole_${message.guild.id}`, savedRole.id)
}