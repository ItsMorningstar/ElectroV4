const Discord = require("discord.js")
exports.run = async (message, args, client) => {

if(!client.devs.includes(message.author.id)) return message.react('<a:Denied:838494379966201946>')

            let i0 = 0;
            let i1 = 10;
            let page = 1;

            let description =
                `Total Servers - ${client.guilds.cache.size}\n\n` +
                client.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(r => r)
                    .map((r, i) => `**${i + 1}.** **${r.name}** \n **Members:** ${r.memberCount} \n**ID:** ${r.id} \n`)
                    .slice(0, 10)
                    .join("\n");

            let embed = new Discord.MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setColor("#1900ff")
                .setTitle(`Page - ${page}/${Math.ceil(client.guilds.cache.size / 7)}`)
                .setDescription(description);

            let msg = await message.channel.send(embed);

            await msg.react("⬅");
            await msg.react("➡");
            await msg.react("❌");

            let collector = msg.createReactionCollector(
                (reaction, user) => user.id === message.author.id
            );

            collector.on("collect", async (reaction, user) => {
                if (reaction._emoji.name === "⬅") {
                    // Updates variables
                    i0 = i0 - 10;
                    i1 = i1 - 10;
                    page = page - 1;

                    // if there is no guild to display, delete the message
                    if (i0 + 1 < 0) {
                        console.log(i0)
                        return msg.delete();
                    }
                    if (!i0 || !i1) {
                        return msg.delete();
                    }

                    description =
                        `Total Servers - ${client.guilds.cache.size}\n\n` +
                        client.guilds.cache
                            .sort((a, b) => b.memberCount - a.memberCount)
                            .map(r => r)
                   .map((r, i) => `**${i + 1}.** **${r.name}** \n **Members:** ${r.memberCount} \n**ID:** ${r.id} \n`)
                            .slice(i0, i1)
                            .join("\n");

                    // Update the embed with new informations
                    embed
                        .setTitle(
                            `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
                        )
                        .setDescription(description);

                    // Edit the message
                    msg.edit(embed);
                }

                if (reaction._emoji.name === "➡") {
                    // Updates variables
                    i0 = i0 + 10;
                    i1 = i1 + 10;
                    page = page + 1;

                    // if there is no guild to display, delete the message
                    if (i1 > client.guilds.cache.size + 10) {
                        return msg.delete();
                    }
                    if (!i0 || !i1) {
                        return msg.delete();
                    }

                    description =
                        `Total Servers - ${client.guilds.cache.size}\n\n` +
                        client.guilds.cache
                            .sort((a, b) => b.memberCount - a.memberCount)
                            .map(r => r)
                   .map((r, i) => `**${i + 1}.** **${r.name}** \n **Members:** ${r.memberCount} \n**ID:** ${r.id} \n`)
                            .slice(i0, i1)
                            .join("\n");

                    // Update the embed with new informations
                    embed
                        .setTitle(
                            `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
                        )
                        .setDescription(description);

                    // Edit the message
                    msg.edit(embed);
                }

                if (reaction._emoji.name === "❌") {
                    return msg.delete();
                }

                // Remove the reaction when the user react to the message
                await reaction.users.remove(message.author.id);
            });
  } 
exports.help = {
  name: "servers",
	desc: 'Developers only.',
};
exports.conf = {
	aliases: ['serverlist', 'serverslist'],
};
