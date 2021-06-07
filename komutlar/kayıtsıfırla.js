const Discord = require("discord.js");
const client = new Discord.Client();
const database = global.db;

exports.run = (client, message, args) => {
    let embed = new Discord.MessageEmbed().setFooter(`LosKros ❤️ ark.db`, client.user.avatarURL()).setColor("BLACK").setTimestamp()
    
    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    database.delete(`Kız_${message.guild.id}`)
    database.delete(`Erkek_${message.guild.id}`)
    database.delete(`ToplamKayit_${message.guild.id}`)
    message.channel.send(embed.setDescription(`${message.guild.name} Adlı Sunucun Kayıt İstatistikleri Başarıyla Temizlendi.`)).then(e => (e.delete({ timeout: 6000 })));
};

exports.conf = {
    aliases: ["kayıtreset"]
};

exports.help = {
    name: "kayıtreset"
};