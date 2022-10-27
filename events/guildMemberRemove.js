const Discord = require("discord.js")
module.exports = async (client, member) => {
    const db = client.db

// Server Stats 
let serverStats = await db.get(`serverStats_${member.guild.id}`);
 if (!serverStats) return;
 serverStats = JSON.parse(serverStats)

 if (serverStats.total) {
 const channel = client.channels.cache.get(serverStats.total);
 if (channel) channel.setName(`Users: ${member.guild.memberCount}`).catch(e => {});
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