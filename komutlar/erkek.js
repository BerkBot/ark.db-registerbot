const Discord = require("discord.js");
const ayar = require("../ayarlar.json");
const database = global.db;


exports.run = async (client, message, args) => {
    if (message.author.bot || message.channel.type === "dm") return;
    let kayitlog = message.guild.channels.cache.get(ayar.registerkanal);
    let sohbet = message.guild.channels.cache.get(ayar.sohbet);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  
  let yetkilirol = ayar.yetkilirol;
  let erkekrol = ayar.erkekrol;
  let erkekrol2 = ayar.erkekrol2;
  let erkekrol3 = ayar.erkekrol3;
  let kayıtsız = ayar.kayıtsızrol;

    
    let isim = args[1];
    let yas = parseInt(args[2]);
    let tamisim = ayar.tag + isim + ayar.tırnak + yas
    let embed = new Discord.MessageEmbed().setFooter(`LosKros ❤️ ark.db`, client.user.avatarURL()).setColor("BLACK").setTimestamp()
    
    if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.get(yetkilirol)) return message.channel.send(":x:").then(e => e.delete({ timeout: 3000 }));
    if (!member) return message.reply(`Kayıt Edilecek Kullanıcıyı Belirtmelisin.`).then(e => e.delete({ timeout : 6000 }));
    if (!isim) return message.reply(`Kullanıcıyı Kayıt Etmem İçin Bir İsim Yazmalısın.`).then(e => e.delete({ timeout: 6000 }));
    if (!yas) return message.reply(`Kullanıcının Kaydını Tamamlamam İçin Yaşını Belirtmelisin.`).then(e => e.delete({ timeout: 6000 }));

    if (member.roles.cache.get(erkekrol)) return message.channel.send(embed.setDescription(`Bu Kullanıcı Zaten Kayıtlı Olduğu İçin Tekrar Kayıt Edemem. \nİsim Değiştirmek İçin \`!isim <@loskros/ıd> İsim Yaş\` Komutunu Kullanmalısın.`)).then(e => e.delete({ timeout: 6000 })).catch(err => console.error(err));
    if (member.roles.cache.get(ayar.kız)) return message.channel.send(embed.setDescription(`Bu Kullanıcı Zaten Kayıtlı Olduğu İçin Tekrar Kayıt Edemem. \nİsim Değiştirmek İçin \`!isim <@loskros/ıd> İsim Yaş\` Komutunu Kullanmalısın.`)).then(e => e.delete({ timeout: 6000 })).catch(err => console.error(err));

    await member.setNickname(tamisim).catch(() => { });
    await member.roles.add(erkekrol).catch(() => { });
    await member.roles.add(erkekrol2).catch(() => { });
    await member.roles.add(erkekrol3).catch(() => { });
    await member.roles.remove(kayıtsız).catch(() => { });

    database.add(`Erkek_${message.guild.id}.${message.author.id}`, 1)
    database.add(`ToplamKayit_${message.guild.id}.${message.author.id}`, 1)
    database.push(`isimler_${member.id}`, `${member} [**<@&${erkekrol}>**]`);
    
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
  
const kayitlogsend = new Discord.MessageEmbed()
.setThumbnail(member.user.avatarURL({dynamic: true}))
.setDescription(`
 \`>\` **Kayıt Edilen Kullanıcı**: ${member} [${member.id}]
 \`>\` **Kayıt Eden Yetkili:** ${message.author} [${message.author.id}]
 \`>\` **Kullanıcıya Verilen Roller:** <@&${erkekrol}><@&${erkekrol2}><@&${erkekrol3}>`) 
.setColor("0x2f3136")
  
const sohbetsend = new Discord.MessageEmbed()
.setThumbnail(member.user.avatarURL({dynamic: true}))
.setDescription(`
 \`>\` ${member.user} Aramıza **<@&${erkekrol}>** Olarak Katıldı.
 \`>\` Sunucuda Toplam **${message.guild.memberCount}** Kişi Olduk.
 \`>\` Sohbete Katılmadan Önce <#${ayar.kurallar}> Kanalına Göz Atmayı Unutma.`) 
.setColor("0x2f3136")

const messagechannel = new Discord.MessageEmbed()
.setThumbnail(member.user.avatarURL({dynamic: true}))
.setTitle("Ark.db Register Bot")
.setDescription(`
 \`>\` ${member} [${member.id}], <@&${erkekrol}> Olarak
 \`>\` ${message.author} [${message.author.id}] Tarafından Kayıt Edildi
 \`>\` Kullanıcı Adını **${tamisim}** Olarak Güncelleyip Veri Tabanına Kaydettim.
 
 \`•\` Bu Kullanıcı Daha Önceden **${isimgecmisi.length}** Farklı İsimle Kayıt Olmuş.`)
.setFooter(`İsimler İçin !isimler <loskros/ıd>`)
.setColor("0x2f3136")
  
    kayitlog.send(kayitlogsend)
    sohbet.send(sohbetsend).then(g => (g.delete({ timeout: 6000 })))    
    message.channel.send(messagechannel)
      };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["e","erkek","E"],
    permLevel: 0,
}

exports.help = {
      name: "erkek"  
  
}