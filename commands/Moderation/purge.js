const Discord = require("discord.js")
exports.run = async(message, args, client) => {
    const msg = message.channel;
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
{ return message.channel.send(noPermsEmbed) }
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .hasPermission("MANAGE_MESSAGES")
    ) {
      return msg.send(`${client.emotes.no}` + "`Give Me Permission To Do That ;-;`"
      );
    }
    if (!args[0])
      return msg.send(`${client.emotes.no}` + "`How Many Messages To Purge Mention That As Well` "
      );
    const purgeNo = args[0];
    let isValid = /^\d+$/.test(purgeNo);
    if (isValid) {
      let number = parseInt(purgeNo, 10);
      if (number > 0 && number < 101) {
        await message.delete().catch((e) => { });
        await message.channel.bulkDelete((await message.channel.messages.fetch({ limit: number }))
          .filter(m => !m.pinned)).catch((err) => { });
        await message.channel
          .send(`${client.emotes.ok}` + ` **Purged ${number} Messages...**`)
          .then((msg) => {
            msg.delete({ timeout: 1300 }).catch((e) => { });
          });
      } else {
        msg
          .send(`${client.emotes.no}` + "**`Can purge only 100 messages at a time...`**"
          )
          .catch((e) => { });
      }
    } else {
      msg
        .send(`${client.emotes.no}` + "`Enter A Positive Number...` ")
        .catch((e) => { });
    }
}

	 exports.help = {
  name: "purge",
  usage: "purge",
  example: '!purge',
};
exports.conf = {
		cooldown: 2
};