const Discord = require("discord.js")
exports.run = async (message, args, client) => {

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(NoPermsEmbed);
    const role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first();
    if (!role) return message.channel.send(`${client.emotes.no}` + '`Mention a role, its name or ID...`')
    if (role.hasPermission('MANAGE_GUILD', 'MANAGE_WEBHOOKS', 'KICK_MEMBERS', 'BAN_MEMBERS' ,'MANAGE_MESSAGES')) return message.lineReply(client.emotes.no + 'This Role Has Mod Permissions, It Cant Be Set as a Muted Role.')
    
    const roleDB = await db.get(`MutedRole_${message.guild.id}`);
    if (roleDB) await db.delete(`MutedRole_${message.guild.id}`)
    await db.set(`MutedRole_${message.guild.id}`, role.id);
    message.channel.send({
    embed: {
      title: "Alright",
      color: "#1100ff",
      description: `${role} is now the Muted Role.`,
    },
    })

}
exports.help = {
  name: "setmuterole",
  usage: "setmuterole @[Role]",
  example: 'setmuterole @Muted',
	desc: "Configure The Muted Role For Server.",
};
exports.conf = {
    aliases: ['setmutedrole', 'setmute', 'muteroleset'],
    cooldown: 5
};
