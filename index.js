const express = require('express'); 
const cors = require('cors');
const env = require('dotenv').config();
const connectionDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
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
app.use("/user",require('./routes/UserRoutes'));
app.use("/product",require('./routes/productsRoutes'));
app.use("/userportal",require('./routes/UserTypeRoutes'));
app.use("/order",require('./routes/OrderRoutes'));
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is started on port ${port}`);
})
