const Discord = require("discord.js")
exports.run = async (message, args, client) => {


        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send("**`You need to be in my voice channel.`**");

        await voiceChannel.leave();
        await message.react('👋🏻')

}
exports.help = {
	name: "disconnect",
	usage: "=disconnect",
	example: '=disconnect',
};
exports.conf = {
	aliases: ['die', 'dc', 'leave'],
	cooldown: 2
};