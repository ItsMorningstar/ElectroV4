const req = require("request");
const Discord = require("discord.js");
const crypto = require("crypto-js");
require("dotenv").config();

const thumbSmallByUser = "http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="
const thumbSmallByID = "https://www.roblox.com/bust-thumbnail/image?width=50&height=50&format=png&userid="
const bigThumbByUser = "http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="

let encryptedCookie = process.env.yum;
let secret = process.env.secret;
let s = true
if (!encryptedCookie) err("Environment variable (.env) 'yum' is not defined.");
if (!secret) err("Environment variable (.env) 'secret' is not defined.");

function err(e){
  console.log(e)
  s = false
  if (!s) return;
}

let cookie = crypto.AES.decrypt(encryptedCookie, secret).toString(crypto.enc.Utf8)

let config = {
    prefix: "",
    payoutAccess: ['778886089992699904', '571014376597749783'],
    groupID: "7253251"
}
exports.setConfig = (conf = {}) => {
    config = conf
		cooldown: 3
}
exports.start = (bot) => {
    bot.on("message", async (message, client) => {
  let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    if(prefixes == null) {
        prefix = "="
    } else {
        prefix = prefixes;
    }
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
        let args = message.content.slice(prefix.length).trim().split(/ +/);
        let cmd = args.shift();
        let user = args[0];

        switch (cmd) {
            case 'pay':
            case 'payout': {
                if (!config.payoutAccess.includes(message.author.id))
                    return message.channel.send("`No.`");
                if (!user) return message.channel.send("`Roblox Username ?`");

                bobux = args[1];
                if (!bobux || !parseInt(bobux))
                    return message.channel.send("`Amount ?`");

                if (bobux > 100)
                    return message.channel.send("`100 Is Max Amount You Can Pay.`");
                if (bobux > 50) {
                    let m = await message.channel.send("`You Sure ?`");
                    await m.react("✅");
                    m.react("❎");
                    m.awaitReactions(
                            (reaction, user) =>
                            user.id == message.author.id &&
                            (reaction.emoji.name == "✅" || reaction.emoji.name == "❎"), {
                                max: 1,
                                time: 10000
                            }
                        )
                        .then((collected) => {
                            if (collected.first().emoji.name == "✅") {
                                pay();
                            } else if (collected.first().emoji.name == "❎")
                                message.channel.send("`Payment cancelled.`");
                        })
                        .catch((E) => {
                            message.reply(`Payment cancelled (${message.id})`);
                        });
                } else {
                    pay();
                }
                async function pay() {
                    const data = await getUser(user)
                    if (!data.Id) return message.channel.send("`User Not Found...`");
                    const id = data.Id;
                    user = data.Username;
                    const mesg = await message.channel.send({
                        embed: {
                            title: "Sending payment",
                            color: "#ebb734",
                            author: {
                                icon_url: thumbSmallByUser + user
                            },
                            fields: [
                                {
                                    name: "Sending to",
                                    value: `\`${user}\``
                                },
                                {
                                    name: "Amount",
                                    value: bobux
                                },
                            ],
                        },
                    });
                    req.post(
                        "https://auth.roblox.com/v2/logout", {
                            headers: {
                                cookie: cookie,
                            },
                        },
                        (e, r, b) => {
                            let token = r.headers["x-csrf-token"];
                            payout(id, token, bobux);
                        }
                    );

                    function payout(id, csrf, amount) {
                        req({
                                method: "POST",
                                url: "https://groups.roblox.com/v1/groups/" + config.groupID + "/payouts",
                                body: JSON.stringify({
                                    PayoutType: "FixedAmount",
                                    Recipients: [{
                                        recipientId: id,
                                        recipientType: "User",
                                        amount: amount
                                    }, ],
                                }),
                                headers: {
                                    cookie: cookie,
                                    "Content-Type": "application/json;charset=UTF-8",
                                    "X-CSRF-TOKEN": csrf,
                                },
                            },
                            (e, r, b) => {
                                if (e) console.log(e);
                                let response = JSON.parse(b);
                                let error, errmsg;
                                if (response.errors) {
                                    let message = response.errors[0].message;
                                    switch (message) {
                                        case "Token Validation Failed":
                                            error = "TOKEN_VALIDATION_FAILED";
                                            errmsg = "This is an authorization error. This should be fixed soon."
                                            break;
                                        case "Authorization has been denied for this request.":
                                            error = "NOT_AUTHORIZED";
                                            errmsg = "Authorization has been denied for this request."
                                            break;
                                        case "Payout is restricted.":
                                            error = "PENDING_VERIFICATION";
                                            errmsg = "This User Needs To Complete The 2 Weeks Membership in order to be paid..."
                                            break;
                                        case "The recipients are invalid.":
                                            error = "INVALID_USER"
                                            errmsg = "This user has not joined the group (" + config.groupID + ")"
                                            break;
                                        default:
                                            error = "UNKNOWN_ERROR";
                                            errmsg = "Sorry, an unknown error occured while sending the payment.";
                                            console.log(message);
                                    }
                                    return mesg.edit({
                                        embed: {
                                            title: "An error occured",
                                            thumbnail: {
                                                url: thumbSmallByID + id,
                                            },
                                            color: "RED",
                                            description: `Could not send payment to \`${user}\``,
                                            fields: [{
                                                name: "Error Code",
                                                value: error
                                            }, {
                                                name: "Error Message",
                                                value: errmsg
                                            }],
                                        },
                                    });
                                }
                                if (Object.entries(response).length === 0)
                                    mesg.edit({
                                        embed: {
                                            thumbnail: {
                                                url: thumbSmallByID + id,
                                            },
                                            title: "Success",
                                            color: "GREEN",
                                            description: `Sent ${amount} bobux to \`${user}\``,
                                        },
                                    });
                            }
                        );
                    }
                }
                break;
            }
            case "stock": {
                const mesg = await message.channel.send(
                    "Getting group stocks <a:LoadingRoblox:838494425286049862>"
                );
                let {
                    robux
                } = await getFunds();
                mesg.edit("Remaining Group Funds: " + `\`${robux}\``);
                break;
            }
        }

        function getUser(user) {
            return new Promise((resolve) => {
                req.get(
                    "https://api.roblox.com/users/get-by-username?username=" + user,
                    (e, r, b) => {
                        if (e) console.log(e);
                        resolve(JSON.parse(b))
                    })
            })
        }

        function getFunds() {
            return new Promise((resolve) => {
                req.get(
                    "https://economy.roblox.com/v1/groups/ " + config.groupID + "/currency", {
                        headers: {
                            cookie: cookie,
                        },
                    },
                    (e, r, b) => {
                        resolve(JSON.parse(b));
                    })
            })
        }
    });
}
