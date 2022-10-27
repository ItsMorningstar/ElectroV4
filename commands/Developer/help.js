const Discord = require("discord.js")
exports.run = async (message, args, client) => {
  let prefix;
  let prefixes = await db.fetch(`prefix_${message.guild.id}`);
  if(prefixes == null) {
      prefix = "="
  } else {
      prefix = prefixes;
  }
if (!args[0]){
   let embed = new Discord.MessageEmbed()
    .setColor('#1900ff')
    .setTitle('Electro Commands')
    .setThumbnail('https://imgur.com/nEFVkbt.gif')
    .setFooter(prefix + 'help [command] to view more info for a specific command.')
		.setDescription(`<a:YeaOk:838615725127893013> [Invite Me](${client.invite}) • [Support Server](${client.server}) • [Website](https://electro.pages.dev)`)
    .addFields(
      { name: '<:Settings:855032115656392724> Configuration', 
      value: `\`${prefix}setprefix\` • \`${prefix}toggle\` • \`${prefix}setwelcome\``, inline: true },

      { name: '🚫 Anti-Raid', 
      value: `\`${prefix}lockdown \` • \`${prefix}deletewebhooks\` • \`${prefix}privateallchannels\` • \`${prefix}unprivateall\` `, inline: false },

      { name: '<:Electro:872561330454949968>  About', 
      value: `\`${prefix}invite\` • \`${prefix}stats\` • \`${prefix}support\` • \`${prefix}vote\` • \`${prefix}suggest\` • \`${prefix}website\``, inline: false },

      { name: '<a:Moderation:838615588963221558> Moderation', 
      value: `\`${prefix}mute\` • \`${prefix}kick\` • \`${prefix}ban\`  • \`${prefix}unban\` • \`${prefix}lockchannel\` • \`${prefix}unlock\` • \`${prefix}lockdown\` • \`${prefix}slowmode\`  • \`${prefix}privatechannel\`  • \`${prefix}unprivatechannel\` • \`${prefix}purge\` • \`${prefix}messagelogs\``, inline: false },
      
      { name: '<a:LoadingRoblox:838494425286049862> Roblox', 
      value: `\`${prefix}profile\` • \`${prefix}friends\` • \`${prefix}limiteds\``, inline: true },

//      { name: '🎸 Music', 
//     value: `\`${prefix}play\` • \`${prefix}skip\` • \`${prefix}stop\`  • \`${prefix}nowplaying\` • \`${prefix}pause\` • \`${prefix}resume\` • \`${prefix}queue\`  • \`${prefix}remove\` • \`${prefix}lyrics\` • \`${prefix}volume\` •  \`${prefix}loop\` • \`${prefix}disconnect\``, inline: false },     
      { name: '<a:HenryTheStickman:845366206051254342> Fun', 
      value: `\`${prefix}chatbot\` • \`${prefix}meme\` • \`${prefix}joke\` • \`${prefix}8ball\``, inline: false },
      
      { name: '<a:Party:838483298161393684> Giveaways', 
      value: `\`${prefix}gstart\` • \`${prefix}greroll\` • \`${prefix}gend\``, inline: false },

      { name: '🏷️ Tags', 
      value: `\`${prefix}tag\` • \`${prefix}addtag\` • \`${prefix}deletetag\`  • \`${prefix}taglist\``, inline: false },
      
      { name: '<a:Utility:838494877875961937> Utilities', 
      value: `\`${prefix}snipe\` • \`${prefix}membercount\` • \`${prefix}nuke\` • \`${prefix}embed\` • \`${prefix}reactionrole\` • \`${prefix}avatar\` • \`${prefix}pastebin\`  • \`${prefix}afk\` • \`${prefix}serverinfo\`  • \`${prefix}roleinfo\` • \`${prefix}whois\`  • \`${prefix}shortlink\` • \`${prefix}serverstats\` • \`${prefix}translate\`• \`${prefix}weather\``, inline: false },
      

  )
		message.channel.send(embed);
}
		if (args[0]) {
    let commandToGet = args[0].toLowerCase();
    let command =
      client.commands.get(commandToGet) ||
      client.commands.get(client.aliases.get(commandToGet));
			let name = command.help.name || "Error..";
      let desc =  command.help.desc || "No Description.";
      let cooldown = '`' + command.conf.cooldown + 's' + '`';
      let example = '`' + prefix + command.help.example + '`' || 'No Examples.';
      let usage = '`' + prefix + command.help.usage + '`' || "___";
      let usageVars = {
        mention: "<username | mention | ID>",
      };
      for (let [variable, val] of Object.entries(usageVars)) {
        usage = usage.replace(`{${variable}}`, val);
      }
  if (!args[0]) {
    let modules = client.helps.array();

    if (!client.config.developers.includes(message.author.id))
      modules = client.helps.array().filter((a) => !a.hide);
    const embed = new Discord.MessageEmbed()
      .setColor('#0a0eff')
			5
      .setAuthor(client.user.username, client.user.displayAvatarURL());

    for (let module of modules) {
      embed.addField(
        module.name,
        module.cmds.map((x) => `\`${x}\``).join(" , ")
      );
    }
    return message.channel.send(embed);
  } else {

      embed = new Discord.MessageEmbed()
        .setColor(`#1414ff`)
        .setTitle(`Command: ${name} `)
				.setDescription(`${desc} \n \n **Cooldown:** ${cooldown} \n **Usage:** ${usage} \n **Example:** ${example}`)
    message.channel.send(embed);
  }
  //Functions
  function firstUpper(text) {
    let processed = text[0].toUpperCase() + text.slice(1);
    return processed;
	}
		}
}
exports.help = {
  name: "help",
  usage: "help",
  example: 'help',
};
exports.conf = {
aliases: ["sendhelp"],
cooldown: 3
};
