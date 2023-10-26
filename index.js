const express = require('express'); 
const cors = require('cors');
const env = require('dotenv').config();
const connectionDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);

connectionDB();
app.use("/user",require('./routes/UserRoutes'));
app.use("/product",require('./routes/productsRoutes'));
app.use("/usertype",require('./routes/UserTypeRoutes'));

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is started on port ${port}`);
})
