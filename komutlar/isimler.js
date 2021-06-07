const Discord = require("discord.js");
const client = new Discord.Client();
const ayar = require("../ayarlar.json");
const database = global.db;

exports.run = (client, message, args) => {
    let embed = new Discord.MessageEmbed().setFooter(`LosKros ❤️ ark.db`, client.user.avatarURL()).setColor("BLACK").setTimestamp()
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    let yetkilirol = ayar.yetkilirol;
    
    if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.get(yetkilirol)) return message.react(":x:")
    if(!member) return message.channel.send(embed.setDescription(`Lütfen Geçmiş Kullanıcı Adlarını Görmek İstediğin Kullanıcıyı Etiketle.`)).then (e => (e.delete({ timeout: 6000 })));

    let isimgecmisi = database.get(`isimler_${member.id}`)
    let liste=""
    if (isimgecmisi) {
        var sayı = 0
        sayı = isimgecmisi.lenght
        for(let i = 0;i<isimgecmisi.length;i++){
            liste+=`\n\`${i+1}.\` ${isimgecmisi[i]}`
        }
    } else {
        message.channel.send(embed.setDescription(`${member} Adlı Kullanıcının Geçmiş Kullanıcı Adları \n\nBu Kullanıcının Geçmiş Adı Bulunmuyor.`)).then(e => (e.delete({ timeout: 10000 })))
        return
    }

    message.channel.send(embed.setDescription(`${member} Adlı Kullanıcının Geçmiş Kullanıcı Adları **[${isimgecmisi.length}]** \n${liste}`)).then(e => (e.delete({ timeout: 10000 })))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["isimler"],
  permLevel: 0
};

exports.help = {
  name: "isimler"
};