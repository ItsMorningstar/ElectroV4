const Discord = require("discord.js")
exports.run = async (message, args, client) => {

   if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {
        title: "Nope",
        color: "#1100ff",
        description: client.emotes.no + "Required Permission - `MANAGE_SERVER`",
      }});
			if (!args[0]) {
				let embed = new Discord.MessageEmbed()
				.setTitle('Enable / Disable Commands')
				.setDescription('=toggle [command] [on/off]')
				.setColor('#1c03ff')
				
			}
    function cmdName(x) {
        return client.commands.find(e => e.help.name == x) || null
        }
        const command = args[0];
			 
    const mode = args[1]
    if(!command) return message.channel.send("`Which Command To Toggle ?`")
    if(command === 'toggle') return message.lineReplyNoMention("Imagine disabling this...")

    if(mode == 'on') {
        if(!cmdName(command)) return message.lineReplyNoMention("**`Is that even a command OMG`**")
        let commandFetch = db.get(`disabled_${command}_${message.guild.id}`);
        if(commandFetch == null) return message.lineReplyNoMention('`Thats Already ON.`')
        await db.delete(`disabled_${command}_${message.guild.id}`)        
        return message.lineReply(`Alright, Enabled ${command}.`)
    } 
    if(mode == 'off') {
        if(!cmdName(command)) return message.lineReplyNoMention("`Is that even a command OMG`")
        let commandFetch = await db.get(`disabled_${command}_${message.guild.id}`);
        if(commandFetch) return message.lineReply('This command is already off bro')
        await db.set(`disabled_${command}_${message.guild.id}`, true)
        return message.lineReply(`Alright, Disabled **${command}**.`)
    } 
    else return message.lineReplyNoMention('`=toggle [command] on/off`')

}
exports.help = {
  name: "toggle",
  usage: "=toggle [cmd name]",
  example: '=toggle snipe',
	desc: "Enable / Disable commands for the server.",
};
exports.conf = {
    cooldown: 3
};
 