require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const server = require('http').createServer(app);
const WebSocket = require("ws");
const {drafting_script} = require('../backend/scripts/drafting')
const {order, convert, roaster_update} = drafting_script();


const clients = {};

// console.log(server)
const wss = new WebSocket.WebSocketServer({port: 8080});
// function UUIDv4() {
//     return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
//         (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//     );
// }
function CreateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        console.log('the n word')
        return v.toString(16);
    });
}

let client_mess = [];
// Going to have to restructure this for when I deal with secure websockets and using wss.on (request)
wss.on('connection', function connection(ws) {
    // ws.send('something on server');
    ws.on('message', async function incoming(message) {
        // console.log(message, 'this is the initial message')
        let mess;
        try {
            mess = JSON.parse(message);
            client_mess.push(mess)
            if (mess[1] === 'order') {
                const players = await order(mess[2], mess[3]);
                // console.log('we got here')
                // ws.send(JSON.stringify(await convert(players[0])));
                // console.log('this message has been sent')
                let i = 0;
                while (i < players.length) {
                    console.log(i, players.length);
                    let user_picking = await convert(players[i]);
                    // const w = clients[mess[0]]
                    ws.send(JSON.stringify([user_picking, players[i]]));
                    console.log('this message has been nt');

                    function interval(){
                        return new Promise((resolve, reject) => {
                            console.log(client_mess)
                            let intervalId = setInterval(function () {
                                console.log('waiting for a message to come')
                                // console.log(client_mess[client_mess.length-2]);
                                // console.log(client_mess[client_mess.length-1], 'this is the -1');
                                // console.log(client_mess[client_mess.length-1] !== client_mess[client_mess.length-2]);

                                if (client_mess[client_mess.length-1][1] === 'button') {
                                    if (client_mess[client_mess.length-2][1] === 'button' || client_mess[client_mess.length-2][1] === undefined) {
                                        if (client_mess[client_mess.length-1] !== client_mess[client_mess.length-2]) {
                                            console.log('yayyayayayya this works')
                                            resolve('this works')
                                            clearInterval(intervalId);
                                        }
                                    }
                                }
                                // ws.send(JSON.stringify(user_picking));
                                // console.log('this message has been sent');
                            }, 1000)
                        })
                    }
                    await interval().then()
                    i++;
                }
            } else if (mess[1] === 'button') {
                console.log('button in here')
                await roaster_update(mess[2], mess[3], mess[4])
            }
        } catch (e) {
            mess = message;
        }

        console.log('received: %s', mess);
    });

    console.log('connection got')
    // const client_uuid = CreateUUID();
    // clients[client_uuid] = ws;
    // let count = 0;

    // ws.send(JSON.stringify(client_uuid));
});

const userRouter = require('./routes/users');
const leagueRouter = require('./routes/league');
const swimmerRouter = require('./routes/swimmer');

app.use(express.json());
// using the routes on the server
app.use('/api/user', userRouter);
app.use('/api/league', leagueRouter);
app.use('/api/swimmer', swimmerRouter);

app.use((req, res, next) => {
    // console.log(req.path, req.method);
    next();
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })
