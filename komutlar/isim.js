const Discord = require("discord.js");
const database = global.db;
const ayar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let isim = args[1];
    let yas = parseInt(args[2]);
    let tamisim = ayar.tag + isim + ayar.tırnak + yas
    let embed = new Discord.MessageEmbed().setFooter(`LosKros ❤️ ark.db`, client.user.avatarURL()).setColor("BLACK").setTimestamp()
    
      let yetkilirol = ayar.yetkilirol;
    
    if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.get(yetkilirol)) return message.channel.send(":x:");
    if (!member) return message.reply("Kullanıcı Adını Değiştirmek İstediğin Kullanıcıyı Etiketlemelisin.").then(e => e.delete({ timeout: 6000 }));
    if (!isim) return message.reply("Kullanıcı Adını Değiştirmem İçin Bir İsim Yazmalısın").then(e => e.delete({ timeout: 6000 }));
    if (!yas) return message.reply("Kullanıcının Adını Değiştirmem İçin Yaşını Belirtmelisin.").then(e => e.delete({ timeout: 6000 }));

    await member.setNickname(tamisim)
    database.push(`isimler_${member.id}`, `${tamisim} [**İsim Değiştirme**]`)
    
    let isimgecmisi = database.get(`isimler_${member.id}`)
    let liste = ""
    var sayı = 0
    if(isimgecmisi){
        sayı = isimgecmisi.lenght
        for(let i = 0;i<isimgecmisi.length;i++){
            liste+=`\n\`${i+1}.\` ${isimgecmisi[i]}`
        }
    } else {
        liste=`\nBu Kullanıcının Geçmiş Adı Bulunmuyor.`
    }

    message.channel.send(embed.setDescription(`${member.user} Adlı Kullanıcının Adını **${tamisim}** Olarak Değiştirdim. \nBu Kullanıcı Daha Önceden **${isimgecmisi.length}** Farklı İsim Kullanmış. \n${liste}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))).then(e => e.delete({ timeout: 15000 }))
};

exports.conf = {
    aliases: ["isim", "nick"]
};

exports.help = {
    name: "isim"
};