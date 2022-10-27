const Discord = require("discord.js");
exports.run = async (message, args, client) => {

let	pastemessage = args.join(' ')
const PasteClient = require('pastebin-api').default
const paste = new PasteClient('Bw3IkpGweseNtvGtt93E-bUAQEnbCins')

const url = await paste.createPaste({
  code: pastemessage,
  expireDate: "N",
  format: "javascript",
  name: `${message.author.username} paste`,
  publicity: 0,
});
message.channel.send('Alright There you go => ' + url)

} 
 exports.help = {
  name: "bin",
  usage: "bin [text/code]", 
	desc: 'PasteBin any code / text you want to share',
  example: '=bin https://roblox.com/games/Jailbreak',
};
exports.conf = {
	aliases: ['pastebin'], 
	cooldown: 1
};
