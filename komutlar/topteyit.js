const dc = require('discord.js')
const ayar = require('../ayarlar.json')
const db = global.db;

exports.run = async (client, message, member) => {
  
   let yetkilirol = ayar.yetkilirol; 
  
if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.get(yetkilirol)) return message.channel.send(":x:")

  let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`ToplamKayit_${message.guild.id}.${uye.id}.toplam`);
let yazı = "LosKros Ark.db Kayıt Listesi"
  
let top = message.guild.members.cache.filter(uye => db.get(`ToplamKayit_${message.guild.id}.${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`ToplamKayit_${message.guild.id}.${uye2.id}`))-Number(db.get(`ToplamKayit_${message.guild.id}.${uye1.id}`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`ToplamKayit_${message.guild.id}.${uye.id}`) +"\` Kayıta Sahip.").join('\n');
message.channel.send(new dc.MessageEmbed().setAuthor(yazı, message.guild.iconURL({dynamic: true})).setTimestamp().setColor("BLACK").setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top));
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["topteyit", "top", "teyit", "top-teyit"],
    permLevel: 0
};

exports.help = {
    name: "topteyit"
}