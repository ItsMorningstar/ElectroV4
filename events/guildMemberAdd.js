const Discord = require("discord.js")
module.exports = async (client, member) => {
    const db = client.db

	// Welcome Card

    const Canvas = require("discord-canvas")
    const image = await new Canvas.Welcome()
        .setUsername(`${member.user.username}`)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(`${member.user.displayAvatarURL({ format: "png" })}`)
        .setColor("title", '#ffe100')
        .setColor("username-box", '#ff0000')
        .setColor("discriminator-box", '#ff0000')
        .setColor("message-box", '#ff0000')
        .setColor("border", '#ff0000')
        .setColor("avatar", '#ff0000')
        .setBackground('https://i.pinimg.com/736x/3f/6f/33/3f6f330518f36fda0c9960eb8a9e3a94.jpg')
        .toAttachment()

    const welcomechannel = client.channels.cache.get(await db.fetch(`welcomeChannel_${member.guild.id}`))
    if (welcomechannel) {
        try {
            const attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
            await welcomechannel.send(attachment)
        } catch (err) {
            console.log(err)
            await welcomechannel.send('Rate Limited, It can be a backend error...')
        }
    }

//   Server Stats 

    let serverStats = await db.get(`serverStats_${member.guild.id}`);
    if (!serverStats) return;
    serverStats = JSON.parse(serverStats)

    if (serverStats.total) {
        const channel = client.channels.cache.get(serverStats.total);
        if (channel) channel.setName(`Total: ${member.guild.memberCount}`).catch(e => {});
        else await db.set(`serverStats_${member.guild.id}`, JSON.stringify(remove(serverStats, "total")))
    }
    if (serverStats.users) {
        const channel = client.channels.cache.get(serverStats.users);
        if (channel) channel.setName(`Users: ${member.guild.members.cache.filter(member => !member.user.bot).size}`).catch(e => {});
        else await db.set(`serverStats_${member.guild.id}`, JSON.stringify(remove(serverStats, "users")))
    }
    if (serverStats.bots) {
        const channel = client.channels.cache.get(serverStats.bots);
        if (channel) channel.setName(`Bots: ${member.guild.members.cache.filter(x => x.user.bot).size}`).catch(e => {});
        else await db.set(`serverStats_${member.guild.id}`, JSON.stringify(remove(serverStats, "bots")))
    }

    if (!Object.keys(serverStats).length) await db.delete(`serverStats_${member.guild.id}`)
}

function remove(obj, value) {
    delete obj[value];
    return obj;

}