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
                let data = await getUser(args.join("%20"));
                if (!data.Id) return mesg.edit("User Not Found...");
                id = data.Id;
                user = data.Username;
                let embed = new Discord.MessageEmbed()
                    .setColor("#0d00ff")
                    .setAuthor(
                        user,
                        thumbSmallByID + id
                    )
                    .setThumbnail(
                        bigThumbByUser + args.join("%20")
                    )
                    .addField("ID", id, true);
                req(
                    "https://users.roblox.com/v1/users/" + id, {
                        headers: {
                            cookie: cookie,
                        },
                    },
                    (e, r, b) => {
                        data = JSON.parse(b);
                        let desc = data.description;
                        let dn = data.displayName;
                        let created = data.created.split("T")[0].split("-");
                        let time = data.created.split("T")[1].split(".")[0];

                        created = `${created[2]} ${created[1]} ${created[0]}`;
                        if (desc) embed.setDescription(desc);
                        embed
                            .addField("Display Name", dn, true)
                            .addField("Created at", created + " | " + time, true);
                        req.get("https://users.roblox.com/v1/users/" + id + "/status",
                            (e, r, b) => {
                                data = JSON.parse(b);
                                if (data.status) embed.addField("Status", data.status);
                                mesg.edit("", embed);
                            }
                        );
                    }
                )
 }}

	exports.help = {
  name: "profile",
  usage: "profile",
  example: '!profile',
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