require("dotenv").config()
const Discord = require("discord.js");
const inlinereply = require('discord-reply');
const client = new Discord.Client({disableMentions: "everyone"})

const { Database } = require('quickmongo')
client.db = new Database("mongodb+srv://Master:IBsrkmeWdcL8EeG8@electro.x5tok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
db = client.db
client.invite = 'https://discord.com/api/oauth2/authorize?client_id=869987491892064306&permissions=8&scope=bot';
client.server = 'https://discord.gg/4WSQjn2PBc';
client.helps = new Discord.Collection();
client.snipes = null;
client.spams = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = require("./config.json");
client.queue = new Map();
const { GiveawaysManager } = require('discord-giveaways');
// if(!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    // This function is called when the manager needs to get all giveaways which are stored in the database.
    async getAllGiveaways() {
        // Get all giveaways from the database
        return await db.get('giveaways');
    }

    // This function is called when a giveaway needs to be saved in the database.
    async saveGiveaway(messageID, giveawayData) {
        // Add the new giveaway to the database
        await db.push('giveaways', giveawayData);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be edited in the database.
    async editGiveaway(messageID, giveawayData) {
        // Get all giveaways from the database
        const giveaways = await db.get('giveaways');
        // Remove the unedited giveaway from the array
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        // Push the edited giveaway into the array
        newGiveawaysArray.push(giveawayData);
        // Save the updated array
        await db.set('giveaways', newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

    async deleteGiveaway(messageID) {
        // Get all giveaways from the database
        const giveaways = await db.get('giveaways');
        // Remove the giveaway from the array
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        // Save the updated array
        await db.set('giveaways', newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

    generateMainEmbed(giveaway, lastChanceEnabled) {
        const embed = new Discord.MessageEmbed();
        embed
            .setTitle(giveaway.prize)
            .setColor(lastChanceEnabled ? giveaway.lastChance.embedColor : giveaway.embedColor)
            .setFooter(`${giveaway.winnerCount} ${giveaway.messages.winners} • ${giveaway.messages.embedFooter}`)
            .setDescription(
                (lastChanceEnabled ? giveaway.lastChance.content + '\n\n' : '') +
                giveaway.messages.inviteToParticipate +
                    '\n' +
                    giveaway.remainingTimeText +
                    '\n' +
                    (giveaway.hostedBy ? giveaway.messages.hostedBy.replace('{user}', giveaway.hostedBy) : '')
            )
            .setTimestamp(new Date(giveaway.endAt).toISOString());
        return embed;
    }
		    generateEndEmbed(giveaway, winners) {
        let formattedWinners = winners.map((w) => `<@${w.id}>`).join(', ');

        const descriptionString = (formattedWinners) => {
            const winnersString =
                giveaway.messages.winners.substr(0, 1).toUpperCase() +
                giveaway.messages.winners.substr(1, giveaway.messages.winners.length) +
                ': ' +
                formattedWinners;

            return (
                winnersString +
                '\n' +
                (giveaway.hostedBy ? giveaway.messages.hostedBy.replace('{user}', giveaway.hostedBy) : '')
            );
        };

        for (
            let i = 1;
            descriptionString(formattedWinners).length > 2048 ||
            giveaway.prize.length + giveaway.messages.endedAt.length + descriptionString(formattedWinners).length > 6000;
            i++
        ) formattedWinners = formattedWinners.substr(0, formattedWinners.lastIndexOf(', <@')) + `, ${i} more`;

        const embed = new Discord.MessageEmbed();
        embed
            .setTitle(giveaway.prize)
            .setColor(giveaway.embedColorEnd)
            .setFooter(giveaway.messages.endedAt)
            .setDescription(descriptionString(formattedWinners))
            .setTimestamp(new Date(giveaway.endAt).toISOString());
        return embed;
    }
    generateNoValidParticipantsEndEmbed(giveaway) {
        const embed = new Discord.MessageEmbed();
        embed
            .setTitle(giveaway.prize)
            .setColor(giveaway.embedColorEnd)
            .setFooter(giveaway.messages.endedAt)
            .setDescription(
                giveaway.messages.noWinner +
                    '\n' +
                    (giveaway.hostedBy ? giveaway.messages.hostedBy.replace('{user}', giveaway.hostedBy) : '')
            )
            .setTimestamp(new Date(giveaway.endAt).toISOString());
        return embed;
    }
}
		// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    storage: false,
    updateCountdownEvery: 14000,
    hasGuildMembersIntent: true,
    default: {
        botsCanWin: false,
        embedColor: '#0400ff',
        embedColorEnd: '#ff0000',
        reaction: '838494792374943755',
    }}, false);
client.giveawaysManager = manager;
db.on('ready', async () => {
    if (!Array.isArray(await db.get('giveaways'))) await db.set('giveaways', []);
    // Start the manager only after the DB got checked to prevent an error
    client.giveawaysManager._init();
});

["module","event"].forEach(handler=>{ 
  require(`./handlers/${handler}.js`)(client)
})
const activities = [
            `Roblox`,
            `Amazon Prime Video`,
	    `Music`,
	    `Raiding Mr.Beast`,
            `With Flamingo`,
            `With Pewdiepie`,
            `[ https://dsc.gg/electro+ ]`,
        ];
        let i = 0




client.on("ready",async () => {
		client.user.setStatus('dnd')
		client.user.setActivity(`Under Devlopment`, { type: 'PLAYING'})
	})
	
client.login('ODY5OTg3NDkxODkyMDY0MzA2.YQGM_Q.2-D52Z5w7m2OdtulVURWS58AGTA');
