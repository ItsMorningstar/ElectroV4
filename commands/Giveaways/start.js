const Discord = require("discord.js")
const ms = require('ms')
exports.run = async (message, args, client) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways") && !message.member.roles.cache.some((r) => r.name === "〘 Giveaways Host 〙") ){
        return message.lineReply(client.emotes.no + '`Permissions Required-` Manage Messages OR Role named "Giveaways"');
    }
    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first() || message.channel
    // If no channel is mentionned

    // Giveaway duration
    let giveawayDuration = args[0];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.lineReplyNoMention('**`=gstart [duration] [winners] [prize]`**');
    }

    // Number of winners
    let giveawayNumberWinners = args[1];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.lineReplyNoMention('**`=gstart [duration] [winners] [prize]`**');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(2).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.lineReplyNoMention('**`=gstart [duration] [winners] [prize]`**');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: `<a:PandaGifts:838614544820469770> ` + giveawayPrize + ` <a:PandaGifts:838614544820469770>` ,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: message.author,
        winners: "winner(s)",

        // Messages
        messages: {
            giveaway: client.emotes.party + client.emotes.party + " **Giveaway** " + client.emotes.party + client.emotes.party,
            giveawayEnded: " **Giveaway Ended** ",
            timeRemaining: "Time Remaining: **{duration}**!",
            inviteToParticipate: `React with ${client.emotes.party} to participate!`,
            winMessage: client.emotes.party + " Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Ends at",
            noWinner: "Giveaway Cancelled, No Valid Entries.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    await message.delete()

}
 exports.help = {
  name: "gstart",
  usage: 'gstart [duration] [winners] [prize]', 
  example: 'gstart 1h 1 Nitro Classic',
	desc: 'Start a New Giveaway!',
};
exports.conf = {
	cooldown: 2
};

