// const openai = require("../config/openai.js");

var OpenAI = require("openai").OpenAI;
require("dotenv").config();


var openai = new OpenAI({
    apiKey : process.env.API_KEY
});
  
module.exports = openai;

module.exports.onSocketIo = function (io){
    io.on('connection', (sock) => {
        sock.on(`send-message`, (msg) => {
            console.log(msg);
            io.emit('send-message', msg);
            openai.chat.completions.create({
                messages: [{ role: "user", content: msg }],
                model: "gpt-3.5-turbo",
            }).then((data) => {
                console.log(data.choices[0])
                io.emit("send-message",data.choices[0]["message"]["content"])
            }).catch((err) => {
                console.log(`Error occured: ${err}`)
            });
        })
    })    
}
