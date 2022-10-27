const Discord = require("discord.js")
const axios = require('axios')
exports.run = async (message, args, client) => {

    let question = args[0]

    if (!question) {
      message.lineReplyNoMention("um.. What's The Question ?")
    }

    else {

      let responses = ["As I see it, yes.", "I'll give it a think", "I'll be asking my gf 😉", "According To Experts, Its yes.", "Don’t count on it.", "It is certain.", "Hmm, Likely...", "Most likely.", "No ig.", "why should i tell...😳", "um, ¯\\_(ツ)_/¯", "yes, you are right.", "am Lazy To Think .-.", "Who knows 😳", "Very doubtful.", "Without a doubt.", "Yes it is.", "I'll ask my wife. "]

      let response = Math.floor(Math.random() * responses.length)

      message.lineReply(responses[response])

    }
}
 exports.help = {
  name: "8ball",
  usage: '=8ball [quetion]', 
  example: '=8ball why am i ?',
};
exports.conf = {
	cooldown: 3
};
