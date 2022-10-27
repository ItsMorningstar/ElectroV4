const Discord = require("discord.js")
const req = require("request");
const crypto = require("crypto-js");
require("dotenv").config();
const thumbSmallByUser = "http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="
const thumbSmallByID = "https://www.roblox.com/bust-thumbnail/image?width=50&height=50&format=png&userid="
const bigThumbByUser = "http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="
exports.run = async (message, args, client) => {

let encryptedCookie = process.env.yum;
let secret = process.env.secret;
let s = true
if (!encryptedCookie) err("'yum' in roblox module not defined...");
if (!secret) err("'secret' in roblox module not defined...");
function err(e){
  console.log(e.string)
  s = false
}
if(!s) return
let cookie = crypto.AES.decrypt(encryptedCookie, secret).toString(crypto.enc.Utf8)
let cmd = args.shift();
let user = args[0];

exports.run = async (message, args, client) => {

              let user = args.join(" ");
               if (!user) return message.channel.send("**`Roblox Username..?`**");
                const mesg = await message.channel.send(
                    `Getting info about \`${user}\` <a:LoadingRoblox:838494425286049862>`
                );
                let data = await getUser(user);
                if (!data.Id) return mesg.edit("User not found");
                id = data.Id;
                user = data.Username;
                req.get(
                    "https://www.roblox.com/users/profile/robloxcollections-json?userId=" +
                    id,
                    (e, r, b) => {
                        let collected = [];
                        let collections = JSON.parse(b).CollectionsItems;
                        if (!collections[0])
                            return mesg.edit("User doesn't have a collection...");
                        collections.forEach((collection) => {
                            if (collection.AssetRestrictionIcon && collection.AssetRestrictionIcon.CssTag)
                                collected.push(collection);
                        });
                        if (!collected.length)
                            return mesg.edit(
                                "The user owns || 0 || limiteds or their inventory is  || Hidden || ..."
                            );
                        let name = [];
                        collected.forEach((c) => {
                            name.push(c.Name);
                        });
                        let em = new Discord.MessageEmbed()
                            .setAuthor(
                                user,
                                thumbSmallByUser + user
                            )
                            .addField("Count", collected.length, true)
                            .addField("Limiteds", name)
                            .setFooter(
                                "Some Limiteds May Not Appear due to the user's privacy settings"
                            )
                            .setColor("#0000ff");
                        mesg.edit("", em);
                    })
            }
        }

exports.help = {
  name: "limiteds",
  usage: "=limiteds [roblox username]",
  example: '=limiteds Yoo_ItsMaster',
};
exports.conf = {
    cooldown: 3
};

        function getUser(user) {
            return new Promise((resolve) => {
                req.get(
                    "https://api.roblox.com/users/get-by-username?username=" + user,
                    (e, r, b) => {
                        if (e) console.log(e.string);
                        resolve(JSON.parse(b))
                    })
            })
        }
