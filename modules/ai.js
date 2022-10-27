const escap = require("js-string-escape")
const fetch = require('node-fetch')
const Discord = require("discord.js")
module.exports = async (client, message) => {
  const db = client.db
  if (message.author.bot) return
  if (await db.get(`AIchat_${message.guild.id}`) != message.channel.id) return;
  let timeout = await db.get(`${message.guild.id}.AItimeout`)
  setTimeout(async() => {
    await db.set(`${message.guild.id}.AItimeout`, false)
  }, 500)
  if (timeout) return;
  await db.set(`${message.guild.id}.AItimeout`, true)
        fetch.default(`https://api.affiliateplus.xyz/api/chatbot?message=${message}&botname=Electro&ownername=Yoo_ItsMaster&age=2&gender=male&location=India&president=Ram Nath Kovind Ji&religion=Hindu/Sanathan&favoriteactor=Sushant Sing Rajput&favoriteactress=Kriti Sanon&favoritemovie=Chichhore&favoritesong=Ik Vaari Aa&physicallocation=India&version=v4.0.0`)
        .then(res => res.json())
        .then(data => message.lineReply(data.message))
}
