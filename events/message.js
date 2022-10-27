const Discord = require("discord.js");
module.exports = async (client, message) => {
const db = client.db
const discord = Discord
const snipes = new Discord.Collection()
const cooldown = new Map();
  if (message.author.bot) return; //No bots
  if (!message.guild) return // No DMs
  let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    if(prefixes == null) {
        prefix = `=`
    } else {
        prefix = prefixes;
    }
 if (
    message.content == `<@${client.user.id}>` ||
    message.content == `<@!${client.user.id}>`
  )
    return message.channel.send({
      embed: {
        title: "Yo",
        color: "#1100ff",
        description: `My Prefix Here Is \`${prefix}\``,
      },
    }).catch(e => {})
 
	  // Cooldown & Toggle
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandFile =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      if(commandFile && await db.get(`disabled_${commandFile.help.name}_${message.guild.id}`)) return message.lineReply({embed: {
          title: "Nope",
          color: "#1100ff",
          description: client.emotes.no + " This Command is Disabled in This Server.",
        }});
        if (commandFile && await db.fetch(`blacklistedUsers_${message.author.id}`) == true) return await message.react('✖️')
    if (!commandFile || !message.content.startsWith(prefix)) {
      return require("../modules/ai")(client, message)
   
    }
  
      if (commandFile.conf.cooldown) {
        if (cooldown.get(message.author.id)) {
          return message.lineReply(`\`Little Too Quick There, Cooldown.\``).then(um => um.delete({ timeout: 5000 }))
    } else  
        cooldown.set(message.author.id, true);
        setTimeout(() => {
          cooldown.delete(message.author.id)
        },commandFile.conf.cooldown * 1000);
          }
  
		// Command Logs
    commandFile.run(message, args, client, prefix);
    client.channels.cache.get('877623270185254932').send({
      embed: {
        title: commandFile.help.name,
        color: "#1100ff",
        description:`**Runner:** ` +  `\`${message.author.username}(${message.author.id})\`` + `\n **Server:** ` + `\`${message.guild} (${message.guild.id})\``
				}
			})


// Blacklisted Users
	  if (commandFile && await db.fetch(`blacklistedUsers_${message.author.id}`) == true) return await message.react('✖️')

 }
