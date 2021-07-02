import axios from 'axios';
import { update_users, get_data } from "./te.js";
import Discord from 'discord.js';
// Remove This if You Will Not Upload this Bot on heroku
import express from 'express'; // 1 Del
express() // 2 Del
    .listen(process.env.PORT || 5000) // 3 Del

const client = new Discord.Client();
const token = ""; // YOUR Discord Bot Token
const Api = 'https://api.nomics.com/v1/currencies/ticker?key=e6215948d47c8b6f2b9355c18089f0c1e8f49efb&ids=BTC,ETH,XRP,DOGE&interval=1d,30d&convert=USD&per-page=100&page=1';
const BtcImg = "https://cdn.discordapp.com/attachments/847712630500098068/847712742025854976/btc.png";
const EthImg = "https://cdn.discordapp.com/attachments/847712630500098068/847712744374272050/eth.png";
const XrpImg = "https://cdn.discordapp.com/attachments/847712630500098068/847712745621291038/xrp.png";
const DogeImg = "https://cdn.discordapp.com/attachments/847712630500098068/847712743355449374/doge.png";
const InfoImg = "https://cdn.discordapp.com/attachments/763638730653040650/848163294489477130/tenor.gif";
const dno_Img = "https://cdn.discordapp.com/attachments/763638730653040650/848165961463103498/anime-money-gif.gif";
const avatarURL = "https://cdn.discordapp.com/attachments/763638730653040650/840517893397676032/ab2cd6181427e1dcfcc90d271a66b240.gif";
const hmm_img = "https://cdn.discordapp.com/attachments/763638730653040650/848166841985531925/original.gif";
var users = await get_data();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("type \"!info\" for Help")
});

const getDat = async () => {
    return await axios.get(Api).then(r => {
        return r.data
    }).catch(() => {
        return []
    })
}

function send_note(msg, txt, color) {
    msg.channel.send(new Discord.MessageEmbed({}).setTitle(txt).setColor(color));
}

client.on('message', async msg => {
    const data = await getDat();
    const args = msg.content.split(" ");
    var c = args[0].toLowerCase();
    var n = c == "!btc" ? "BTC" : c == "!eth" ? "ETH" : c == "!xrp" ? "XRP" : c == "!doge" ? "DOGE" : null;
    var chk = users.filter(e => e.id == msg.author);
    var usr;
    if (n !== null) {
        if (args.length === 1) {
            var d;
            data.forEach(e => {
                if (e.id == n) {
                    d = e;
                }
            });
            var price = new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'USD'
            }).format(d.price).replace(/(\.|,)00$/g, '')
            var embed = new Discord.MessageEmbed({})
                .setAuthor(d.name, avatarURL)
                .addField('status', d.status)
                .addField('Price', price)
                .addField('Price Date', d.price_timestamp)
                .setImage(d.id == "BTC" ? BtcImg : d.id == "ETH" ? EthImg : d.id == "XRP" ? XrpImg : d.id == "DOGE" ? DogeImg : null)
                .setColor("#" + d.id == "BTC" ? "585ed1" : d.id == "ETH" ? "a059de" : d.id == "XRP" ? "de59a4" : d.id == "DOGE" ? "4bc8eb" : '00b0f4')
            msg.channel.send(embed);
        } else if (args.length === 2) {
            var price = Number(args[1]);
            if (price == NaN) {
                send_note(msg, "Invalid Price ❌, Try Again", "#00D119");
            } else {
                if (chk === undefined || chk.length == 0) {
                    let newUser = { id: msg.author.id, coin: args[0].substring(1), price: price }
                    users.push(newUser);
                    var chk_up = await update_users(users);
                    if (chk_up == 1) {
                        send_note(msg, "Activated ✅", "#00D119");
                    } else {
                        send_note(msg, "BOT ERROR !!", "#00D119");
                    }
                } else {
                    send_note(msg, "max : 1 | unactivate first", "#E08518");
                }
            }
        }
    } else if (c == "!un") {
        if (users.length == 0) {
            send_note(msg, "no records ...", "#8665F6");
        } else {
            users.forEach(async (e, i) => {
                if (e.id == msg.author.id) {
                    users.splice(i, 1);
                    var chk_up = await update_users(users);
                    if (chk_up == 1) {
                        send_note(msg, "unactivated ✅", "#00D119");
                    } else {
                        send_note(msg, "BOT ERROR !! , Try Again", "#00D119");
                    }
                } else {
                    send_note(msg, "no records ...", "#8665F6");
                }
            });
        }
    } else if (c == "!info") {
        var embed = new Discord.MessageEmbed({})
            .setAuthor("Crypto-Chan Ahh!", avatarURL)
            .addField("show coin info", "!coin_name | like : !eth")
            .addField("set reminder", "!coin_name coin_price | like : !eth 2000000")
            .addField("show reminder info", "!show")
            .addField("cancel the reminder", "!un")
            .addField("Donation for me 0w0", "!sheesh")
            .addField("who am i ?", "!hmm")
            .setImage(InfoImg)
            .setColor('#F665DE')
        msg.channel.send(embed);
    } else if (c == "!sheesh") {
        var embed = new Discord.MessageEmbed({})
            .setAuthor("Crypto-Chan", avatarURL)
            .addField("BTC", "bc1qq00l7r6rrjyhn3lyhpvcywxnxgzastzdp3tfsh") // Please Do Not Change It !!
            .addField("ETH", "0x4Dd26a3cdB7333aC0319925387896537F04F7B8e") // Please Do Not Change It !!
            .addField("XRP", "rEM2kCNSTgo1pkKqEND5foQ86cs3aLyapv") // Please Do Not Change It !!
            .addField("NEO", "AN5yuxBkS3LAjT2GgFKArKC84R9J4bVmMi") // Please Do Not Change It !!
            .setImage(dno_Img)
            .setColor('#F665DE')
        msg.channel.send(embed);
    } else if (c == "!hmm") {
        var embed = new Discord.MessageEmbed({})
            .setAuthor("Crypto-Chan", avatarURL)
            .addField("Github", "github.com/JUSTSAIF") // Please Do Not Change It !!
            .addField("Instagram", "instagram.com/qq_iq") // Please Do Not Change It !!
            .addField("Discord", "discord.gg/tFdgRrq344") // Please Do Not Change It !!
            .setImage(hmm_img)
            .setColor('#F665DE')
        msg.channel.send(embed);
    } else if (c == "!show") {
        var embed = new Discord.MessageEmbed({});
        if (chk === undefined || chk.length == 0) {
            send_note(msg, "no records ...", "#8665F6");
        } else {
            usr = chk[0];
            embed.setAuthor("Crypto-Chan", avatarURL)
                .addField("User", msg.author)
                .addField("Inserted price", "$" + usr.price)
                .addField("Coin Name", usr.coin)
                .setImage(dno_Img)
                .setColor('#65F6A3');
            msg.channel.send(embed);
        }
    }
});

client.login(token);