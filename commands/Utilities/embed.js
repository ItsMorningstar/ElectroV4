const Discord = require("discord.js")
const cooldown = new Set();
exports.run = async (message,args,client)=>{


            try {
            const filter = msg => msg.author.id == message.author.id;
            const options = {
                max: 1
            };
            const embed = new Discord.MessageEmbed();
            const main = await message.channel.send("Reply `no` To Leave Field Empty or `cancel` To Stop Command.");
    
            const question = await message.channel.send("`Title ?`");
            let title = await message.channel.awaitMessages(filter, options);
            title.first().delete()
            if (title.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
            if (title.first().content !== 'no' && title.first().content !== 'cancel') embed.setTitle(title.first().content);

            await question.edit("`Description ?`");
            let Description = await message.channel.awaitMessages(filter, options);
            Description.first().delete()
            if (Description.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
            if (Description.first().content !== 'skip' && Description.first().content !== 'cancel') embed.setDescription(Description.first().content);
    
            await question.edit("`Footer Text ?`");
            let Footer = await message.channel.awaitMessages(filter, options);
            Footer.first().delete()
            if (Footer.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled. ')
            if (Footer.first().content !== 'no' && Footer.first().content !== 'cancel') embed.setFooter(Footer.first().content); 
    
           await question.edit("`Embed Color ? (Hex Color Code)` https://cutt.ly/CbJsmea");
            let Color = await message.channel.awaitMessages(filter, options);
            Color.first().delete()
            if (Color.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
            if (Color.first().content !== 'no' && Color.first().content !== 'cancel') embed.setColor(Color.first().content.toUpperCase())
            else embed.setColor("#0303ff")
            question.delete()
            main.delete()
						message.delete()
            message.channel.send(embed)
						
        } catch (error) {
  let err = clean(error);
  embed.addField("Error", "```js\n" + err + "```").setColor(`#1500ff`);

  message.channel.send(embed);
}

}

exports.help = {
  name: "embed",
  usage: "embed",
  example: '!embed',
};
exports.conf = {
	cooldown: 3
};
