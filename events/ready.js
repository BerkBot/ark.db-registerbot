const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayar = require('../ayarlar.json');

var prefix = ayar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("dnd");
  client.user.setActivity("LosKros ❤️ Ark.db ", { type: "WATCHING"}); // watching - listening 
    let sesKanal = client.channels.cache.get(ayar.seskanal);
    if (!sesKanal) return console.log(`Ses Kanalı Bulunamadı.`);
    sesKanal.join().then(console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Ses Kanalına Bağlanıldı.`)).catch(err => console.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Ses Kanalına Bağlanılamadı.`));

      setInterval(() => {
        sesKanal.leave();
        sesKanal.join();
        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Ses Kanalına Bağlantı Güncellendi.`);
    }, 600000)
};
