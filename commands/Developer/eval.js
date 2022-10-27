const Discord = require("discord.js")
exports.run = (message, args, client) => {


if(!client.devs.includes(message.author.id)) return;

	const embed = new Discord.MessageEmbed().addField(
  "Input",
  "```js\n" + args.join(" ") + "```"
);

try {
  const code = args.join(" ");
  if (!code)
    return message.channel.send({
      embed: {
        title: "What To Evaluate ?",
        color: "#1900ff",
      },
    });
  let evaled = eval(code);

  if (typeof evaled !== "string")
    evaled = require("util").inspect(evaled, { depth: 0 });

  let output = clean(evaled);
  embed.addField("Result", "```js\n" + output + "```").setColor(`#4efc03`);

  message.channel.send(embed);
} catch (error) {
  let err = clean(error);
  embed.addField("Error", "```js\n" + err + "```").setColor(`#ff0019`);

  message.channel.send(embed);
}
function clean(string) {
  if (typeof text === "string") {
    return string
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return string;
  }}}
exports.help = {
  name: "eval",
};
exports.conf = {
	aliases: ['ev', 'evaluate'],
};
