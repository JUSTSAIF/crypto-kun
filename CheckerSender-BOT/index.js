import Discord from 'discord.js';
import { update_users, get_data } from "./te.js";
import axios from 'axios';
// Remove This if You Will Not Upload this Bot on heroku
import express from 'express';
express()
    .listen(process.env.PORT || 5000)



const client = new Discord.Client();
const token = ""; // YOUR `Second` Discord Bot Token
const Api = 'https://api.nomics.com/v1/currencies/ticker?key=e6215948d47c8b6f2b9355c18089f0c1e8f49efb&ids=BTC,ETH,XRP,DOGE&interval=1d,30d&convert=USD&per-page=100&page=1'; // if token invalid or expired Gen new one from the smae website <==
const Embedimg = 'https://cdn.discordapp.com/attachments/763638730653040650/848452050047860746/dance.gif';
let justAnumber = 0;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("DM Sender .. 0w0")
    setInterval(async () => {
        const data = await axios.get(Api).then(res=>{
            return res.data
        })
        new Promise((resolve) => {
            resolve(get_data());
        }).then(async users => {
            users.forEach(async (e, _i) => {
                const dat = data.filter(i => ((Number(i.price) - (0.01 * Number(i.price))) <= e.price && e.price <= (Number(i.price) + (0.01 * Number(i.price)))) & (i.id.toLowerCase() == e.coin.toLowerCase()))
                if (dat !== undefined && dat.length != 0) {
                    console.log("=============> GG Boy $_$ <===============");
                    console.log("Sended TO :" + e.id);
                    client.users.fetch(e.id).then(user => {
                        user.send(new Discord.MessageEmbed({})
                            .setTitle(dat[0].name)
                            .addField('Inserted Price', e.price)
                            .addField('Your Coin Price Now', dat[0].price)
                            .addField('Price Date', dat[0].price_timestamp)
                            .setImage(Embedimg)
                            .setColor("#680DB4"));
                    });
                    users.splice(_i, 1);
                    await update_users(users);
                    return;
                }
            });
        })
        console.log("Try ..", justAnumber++)
    }, 10000);
});


client.login(token);