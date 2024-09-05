const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");


const token = "7533455767:AAFhkwGwDZ4X4UAkLb974MYG_3m17e9S05o";


const bot = new TelegramBot(token, {polling: true});
process.env.NTBA_FIX_319 = 1;

bot.on("message", async (msg) => {
    //  console.log(msg)
    const chatId = msg.chat.id;
    const userInput = msg.text;


    //  const message = "hello"
    //  bot.sendMessage(chatId, message);

    try{
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?=${userInput}&appid=6d2384b4365ebdf3eb6f5869ebcb1626`

        );
        const data = response.data;
        const weather = data.weather[0].description;
        const temperature = data.main.temp - 273.15;
        const city = data.name;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(
            2
        )}*C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

        bot.sendMessage(chatId, message);
    }catch(error){
        bot.sendMessage(chatId,"City doesn't exist.")
    }

});




