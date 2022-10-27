const Discord = require('discord.js')
module.exports = async (client) => {
const roblox = require('../modules/roblox'); roblox.start(client); await console.log('Roblox Module ✔️')
const db = client.db

  client.devs = ["778886089992699904", '571014376597749783']
  client.emotes = {
    ok: '<a:Correct:838494876278063115>',
    no: '<a:Denied:838494379966201946>',
    load: '<a:Loading:842803639860330498>',
    ping: '<a:LoadingPing:838494546576932865>',
    loadroblox: '<a:LoadingRoblox:838494425286049862>',
    party: '<a:Giveaway:838494792374943755>',
    check: '<a:Check:845365795462578186> ',
    henry: '<a:HenryTheStickman:845366206051254342> ',
		gift: '<a:PandaGifts:838614544820469770>',
  }
  
  cooldown = new Set();
  await console.log("Alrighty ✔️")

  noPermsEmbed = new Discord.MessageEmbed()
  .setTitle(client.emotes.no + ' Nope')
  .setDescription("You Don't Have Permissions To Execute This Command Kid.")
  .setColor('#2b00ff')
}
