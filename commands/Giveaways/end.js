const Discord = require("discord.js")
const ms = require('ms')
exports.run = async (message, args, client) => {
	
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.lineReply(client.emotes.no + '`Permissions Required-` Manage Messages OR Role named "Giveaways"');
    }
    if(!args[0]){
        return message.lineReplyNoMention('Provide a valid message ID!');
    }
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === message.guild.id);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Unable to find a giveaway for '+ "`" + args.join(' ') + "`" );
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send("Picking The Winner... <a:LoadingRoblox:838484311006511166>");
    })
    .catch((e) => {
        message.lineReply(`Giveaway with message ID \`${giveaway.messageID}\` is already ended.`)});

}
 exports.help = {
  name: "gend",
  usage: 'gend [message ID]', 
  example: 'gend 842110336529072149',
	desc: 'End a ongoing giveaway.',
};
exports.conf = {
	cooldown: 1
};

