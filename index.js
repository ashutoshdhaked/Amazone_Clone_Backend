const express = require('express'); 
const cors = require('cors');
const env = require('dotenv').config();
const connectionDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(errorHandler);
connectionDB();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
app.set('socketio', io);
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);
  socket.on('sendMessage', (message) => {  // on method is used for reading from the socket 
    io.emit('message', message);          // function is used for writing on  the socket 
  });
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

app.use("/user",require('./routes/UserRoutes'));
app.use("/product",require('./routes/productsRoutes'));
app.use("/userportal",require('./routes/UserTypeRoutes'));
app.use("/order",require('./routes/OrderRoutes'));
app.use("/rating",require('./routes/RatingRoutes'));
const port = process.env.PORT;
server.listen(port,()=>{
    console.log(`server is started on port ${port}`);
})
