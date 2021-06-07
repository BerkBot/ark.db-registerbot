const Discord = require("discord.js");
const ayar = require('../ayarlar.json');
const db = global.db;

exports.run = async (client , message, args) => {
    let embed = new Discord.MessageEmbed().setFooter(`LosKros ❤️ ark.db`, client.user.avatarURL()).setColor("BLACK").setTimestamp()
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

    let yetkilirol = ayar.yetkilirol;
    
    if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.get(yetkilirol)) return message.react(":x:")
   if (!member) return message.channel.send(embed.setDescription(`Toplam Teyit Sayısına Bakmak İstediğiniz Kullanıcıyı \`!teyit <@LOSKROS/ID>\` Şeklinde Belirtiniz.`)).then(e => (e.delete({ timeout: 10000 })));

    let erkek = await db.fetch(`Erkek_${message.guild.id}.${member.id}`)
    let kız = await db.fetch(`Kız_${message.guild.id}.${member.id}`)
    let toplam = await db.fetch(`ToplamKayit_${message.guild.id}.${member.id}`)
    if (!erkek) erkek = "0"
    if (!kız) kız = "0"
    if (!toplam) toplam = "0"

    message.channel.send(embed.setDescription(`${member} Adlı Kullanıcının Toplam **${toplam}** Kaydı Bulunmaktadır. (**\`${erkek}\` Erkek, \`${kız}\` Kız**)`)).then(e => (e.delete({ timeout: 10000 })));
}

exports.conf = {
    aliases: ["kayıt", "teyit", "bilgi"]
};

exports.help = {
    name: "teyit"
};