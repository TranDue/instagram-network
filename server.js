require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
require("express")()

// let app = require("express")();
// Socket
// io.set('transports', ['websocket']) //config

// let server = rSSSequire("http").Server(app);
// let io = sio(server);
// sio = require('socket.io')

//  const http = require('http').createServer(app)
// console.log({ sio });
const http = require('http')
const server = http.createServer(app);
const Server = require("socket.io");
const io = new Server(server);

io
    .set('transports', ['websocket'])
    .on('connection', (socket) => {
        console.log('a user connected');
        console.log({ socket })
    });

// Create peer server
ExpressPeerServer(http, { path: '/' })


// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))
app.use('/api', require('./routes/messageRouter'))


const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to mongodb')
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Server is running on port', port)
})
