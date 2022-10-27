const Discord = require("discord.js")
const ms = require('ms')
exports.run = async (message, args, client) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.lineReply(client.emotes.no + ' `Permissions Required-` Manage Messages OR Role named "Giveaways"');
    }
		    if(!args[0]){
        return replyno('Provide a valid message ID!');
    }
		    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === message.guild.id);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Unable to find giveaway with that ID.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(async () => {
        // Success message
        await message.react(client.emotes.ok)
    })
    .catch((e) => {
            message.lineReplyNoMention('That giveaway is not ended yet. use `=gend`');
    });
}
 exports.help = {
  name: "greroll",
  usage: 'greroll [message ID]', 
  example: 'greroll 842110336529072149',
	desc: 'Reroll a givaway.',
};
exports.conf = {
	aliases: ['reroll'],
	cooldown: 1
};

