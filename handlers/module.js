const Discord = require("discord.js"),
  fs = require("fs"),
  path = require("path");
module.exports = (client) => {
  fs.readdir(path.join(__dirname, "../commands"), (err, categories) => {
    if (err) console.log(err);

    categories.forEach((category) => {
      let moduleConf = require(`../commands/${category}/module.json`);
      moduleConf.path = `./commands/${category}`;
      moduleConf.cmds = [];
      if (!moduleConf) return;
      client.helps.set(category, moduleConf);

      fs.readdir(
        path.join(__dirname, `../commands/${category}`),
        (err, files) => {
          if (err) console.log(err)
          files.forEach((file) => {
            if (!file.endsWith(".js")) return;
            let prop = require(`../commands/${category}/${file}`);
            client.commands.set(prop.help.name, prop);

            if (prop.conf.aliases) {
              prop.conf.aliases.forEach((alias) => {
                client.aliases.set(alias, prop.help.name);
              });
            }

            client.helps.get(category).cmds.push(prop.help.name);
          });
        }
      );
    });
  });
};
