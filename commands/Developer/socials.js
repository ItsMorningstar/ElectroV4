const Discord = require("discord.js")
exports.run = async(message, args, client) => {

   await message.channel.send({
      embed: {
        title: "Master's Social Profile",
        color: "#1100ff",
        description: `
▬▬▬▬▬▬▬▬●❖●▬▬▬▬▬▬▬▬
<:YouTube:839448448461701140> [YouTube](https://www.youtube.com/channel/UCbjHxmSMKEo7ML8fGaSKKwA)
▬▬▬▬▬▬▬▬●❖●▬▬▬▬▬▬▬▬
<:Twitter:861266727257112607> [Twitter](https://twitter.com/Yoo_ItsMaster)
▬▬▬▬▬▬▬▬●❖●▬▬▬▬▬▬▬▬
<:Discord:838483124173668403> [Discord](https://dsc.gg/mastersquad)
▬▬▬▬▬▬▬▬●❖●▬▬▬▬▬▬▬▬
<:Master:861267520535134228> [Roblox](https://www.roblox.com/users/994527037/profile)
▬▬▬▬▬▬▬▬●❖●▬▬▬▬▬▬▬▬
▬▬▬▬▬▬▬▬●❖●▬▬▬▬▬▬▬▬
<:Roblox:838615476988674068> [Roblox Group](https://www.roblox.com/groups/8350520/Masters-Diamond-Squad#/)
▬▬▬▬▬▬▬▬●❖●▬▬▬▬▬▬▬▬
`}
    })
 }
exports.help = {
  name: "socials",
};
exports.conf = {
};
