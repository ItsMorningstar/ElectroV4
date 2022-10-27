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
                let numberOfFriends = args[1] || 10;
                if (!parseInt(numberOfFriends))
                    return message.channel.send("`Enter a valid number for number of friends`");
                if (numberOfFriends > 25)
                    return message.channel.send("Maximum number of friends shown is 25");
                const mesg = await message.channel.send(
                    `Getting info about \`${user}\` <a:LoadingRoblox:838494425286049862>`
                );
                let data = await getUser(user);
                if (!data.Id) return mesg.edit("`User Not Found...`");
                id = data.Id;
                user = data.Username;
                req.get(
                    "https://friends.roblox.com/v1/users/" + id + "/friends",
                    async (e, r, b) => {
                        if (e) console.log(e);
                        let data = JSON.parse(b).data;
                        if (!data[0])
                            return mesg.edit("Couldn't Get The User's Friends List, Maybe He Never Had One...");
                        let fCount = data.length;
                        let flist = [];

                        data.splice(0, numberOfFriends).forEach((e) => {
                            flist.push(e.name);
                        });
                        if (fCount > numberOfFriends) flist.push(`+ ${fCount - numberOfFriends} more...`);
                        mesg.edit("", {
                            embed: {
                                color: "#0328fc",
                                author: {
                                    name: user,
                                    icon_url: thumbSmallByID + id,
                                },
                                description: flist.join("\n"),
                                fields: [{
                                    name: "Total",
                                    value: fCount,
                                    inline: true
                                }],
                            },
                        });
                    }
                )
}}
exports.help = {
  name: "friends",
  usage: "friends",
  example: '=friends',
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