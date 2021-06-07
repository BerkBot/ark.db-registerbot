const Discord = require("discord.js");
const client = new Discord.Client();
const database = global.db;

exports.run = (client, message, args) => {
    let embed = new Discord.MessageEmbed().setFooter(`LosKros ❤️ ark.db`, client.user.avatarURL()).setColor("BLACK").setTimestamp()
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.react(":x:")
    if(!member) return message.reply(`Hangi Kullanıcının Geçmiş İsimlerini Temizlemek İstiyorsun?`).then (message => (message.delete({timeout:6000})))

    database.delete(`isimler_${member.id}`)
    message.channel.send(embed.setDescription(`${member} Adlı Kullanıcının Geçmiş İsimleri Başarıyla Temizlendi.`)).then(e => (e.delete({ timeout: 6000 })));
};

exports.conf = {
    aliases: ["isimlertemizle", "itemizle"]
};

exports.help = {
    name: "isimtemizle"
};