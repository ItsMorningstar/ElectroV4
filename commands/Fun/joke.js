const Discord = require("discord.js")
const axios = require('axios')
exports.run = async (message, args, client) => {

 axios.get('https://official-joke-api.appspot.com/random_joke')
.then(res => {

   const joke = res.data.setup;

   const answer = res.data.punchline;

  message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`${joke}\n\n||${answer}||`)
                    .setColor('RANDOM')
                )
            })
}
 exports.help = {
  name: "joke",
  usage: '=joke', 
  example: '=joke',
};
exports.conf = {
	cooldown: 3
};
