const Discord = require("discord.js")
exports.run = async (message, args, client) => {

const ms = require("ms");
const humanize = require("humanize-duration");

  if (!message.member.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR"))
{ return message.channel.send(noPermsEmbed) }
     let channel = message.mentions.channels.first()
      ? message.mentions.channels.first()
      : message.channel;
    let time = message.mentions.channels.first() ? args[1] : args[0];
    if (time === "reset" || time === "off") {
      if (channel.rateLimitPerUser < 1)
        return message.channel.send(
          "Mentioned Channel Doesn't Have Any Slowmode"
        );
      await channel.setRateLimitPerUser(0);
      return message.channel.send(`<#${channel.id}> Slowmode Removed !`);
    }
    if (!time) return message.channel.send("`Insert Valid Time... [s,m,h]`");

    let toMS = ms(time);
    let result = Math.floor(toMS / 1000);
    if (!result) return message.channel.send("Insert Valid Time...");
    if (result > 21600) return message.channel.send("6 Hours Is Max...");
    else if (result < 1) return message.channel.send("Minimum Limit Is 1s");
    channel.setRateLimitPerUser(result);
    return message.channel.send(`${client.emotes.ok}` + `<#${channel.id}> Active With Slowmode Of **${humanize(toMS)}**.`
    );
}

	exports.help = {
  name: "slowmode",
  usage: "slowmode",
  example: '!slowmode',
};
exports.conf = {
  aliases:["slow"],
	cooldown: 3
};