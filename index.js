const Discord = require('discord.js');
const botconfig = require('./botconfig.json');
const color = require('./color.json');

const bot = new Discord.Client({ disableEveryone: true })

bot.on('ready', () => {
    console.log(`${bot.user.tag} Is now online!`)
    bot.user.setActivity("Black & Whith", {
        type: "WATCHING"
    })
})

/*const nick = [
    "𝘽𝙡𝙖𝙘𝙠",
    "𝙒𝙝𝙞𝙩𝙚",
    "𝘽𝙡𝙖𝙘𝙠 ༊ 𝙒𝙝𝙞𝙩𝙚",
]
setInterval(() => {
    let newNick = nick[0];
    nick.push(newNick);
    nick.splice(0, 1);

    bot.guilds.cache.find(guild => guild.id == '813843786450206741').user.setNickname(newNick);
}, 3000);*/

bot.on("message", async message => {
    if (message.author.bot || message.channel.type == "dm") {
        return;
    }


    let prefix = botconfig.prefix;
    let messageArry = message.content.split(" ")
    let cmd = messageArry[0];

    if (cmd == `${prefix}ping`) {
        let testEmbed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
            .setDescription("Pong!")

        message.channel.send(testEmbed);
    }
    if (cmd == `${prefix}avatar`) {
        let mentioned = message.mentions.members.first() || message.member; //If within the command there is a mentioned one we will use its avatar || otherwise we use the avatar of the author of the command
        let embed = new Discord.MessageEmbed()
        embed.setColor(color.red) //You can change this parameter
        embed.setTitle(`Avatar of **` + `${mentioned.user.username}` + "**")
        embed.setImage(mentioned.user.displayAvatarURL({ size: 1024, dynamic: true }))
        embed.setFooter("requested by: " + message.member.displayName, message.author.displayAvatarURL());
        return message.channel.send(embed);
    }
    if (cmd == `${prefix}avatarserver`) {
        let serembed = new Discord.MessageEmbed()
        serembed.setColor(color.red)
        serembed.setTitle(`Avatar server of **` + `${message.guild.name}` + "**")
        serembed.setImage(message.guild.iconURL({ size: 1024, dynamic: true }))
        serembed.setFooter("requested by: " + message.member.displayName, message.author.displayAvatarURL());
        return message.channel.send(serembed)
    }
    /*if (cmd == `${prefix}music`) {
        let musicembed = new Discord.MessageEmbed()

        .setColor(color.red)
            .setTitle("MusicVO is ready!")
            .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR18NPhBB8ZtAMdGMXjJlLaTZ49ARwcNhykug&usqp=CAU", size = 1024, dynamic = true)
            .setFooter("prefix for this server is" + prefix);
        message.channel.send(musicembed)
    }*/
    /*if (cmd == `${prefix}music2`) {
        let musicembed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setTitle("MusicVO is ready!")
            .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlDP1r16HPNUQqTosrij4NaC_a_gxZSEawBRseJQRloA6YhK0tkM01gjBu1fcDzUFjtKM&usqp=CAU", size = 1024, dynamic = true)
            .setFooter("prefix for this server is" + prefix);
        message.channel.send(musicembed)
    }*/
    if (cmd == `${prefix}join`) {
        if (message.member.voice.channel) {
            let connection = await message.member.voice.channel.join()
            let embedj = new Discord.MessageEmbed()
            embedj.setColor(color.blue)
            embedj.setTitle("bot join")
            message.channel.send(embedj);
        } else if (!Permissions.has('CONNECT')) {
            let embedj2 = new Discord.MessageEmbed()
            embedj2.setColor(color.red)
            embedj2.setTitle("not permissions for connect bot")
            message.channel.send(embedj2);
        } else if (!message.member.voice.channel) {
            let embedj3 = new Discord.MessageEmbed()
            embedj3.setColor(color.red)
            embedj3.setTitle("cannot bot connect to voice becuse you not connect voice")
            message.channel.send(embedj3);
        }
    }
    if (cmd == `${prefix}dc`) {
        if (message.member.voice.channel.join()) {
            if (message.member.voice.channel) {
                let connection = await message.member.voice.channel.leave()
                let embeddc = new Discord.MessageEmbed()
                embeddc.setColor(color.blue)
                embeddc.setTitle("bot disconnect")
                message.channel.send(embeddc);
            } else if (!message.member.voice.channel) {
                let embeddc2 = new Discord.MessageEmbed()
                embeddc2.setColor(color.red)
                embeddc2.setTitle("you cannot diconnect bot becuse not bot connet voice")
                message.channel.send(embeddc2);
            }
        } else if (message.member.voice.channel.leave()) {
            let mesembed = new Discord.MessageEmbed()
            mesembed.setColor(color.red)
            mesembed.setTitle("you not connect voice")
            message.channel.send(mesembed);
        }
    }
    /*if (cmd == `${prefix}nick`) {
        message.channel.send("Fuck!")
    }
    if (cmd == `${prefix}prefix`) {
        let embeddc = new Discord.MessageEmbed()
        embeddc.setColor(color.red)
        embeddc.setTitle(`${prefix} set shod`)
        message.channel.send(embeddc);
    }*/
    if (cmd == `${prefix}del`) {
        let num = message.content.replace(`${cmd}`, ``)
        message.channel.send("delet 10 messag... after 5 seconds", delete({ timeout: 5000 }))
        message.delete({ timeout: 5000 }, messageArry[num])
            .then(cmd => message.channel.send(`deleted messag from ${cmd.author.username} after 5 seconds`), delete({ timeout: 5000 }))
            .catch(console.error);
    }
    if (cmd == `${prefix}ban`) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("you not permissions ban member")
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .ban("Optional reason that will display in the audit logs")
                    .then(() => {
                        message.reply(`Successfully banned ${user.tag}`, delete({ timeout: 5000 }));
                    })
                    .catch((err) => {
                        message.reply("I was unable to ban the member");
                        console.error(err);
                    });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to ban");
        }
    }
})

bot.login(botconfig.token);