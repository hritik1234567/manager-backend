const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const morgan = require('morgan'); // Import morgan middleware
const cors=require('cors');
const auth=require('./routes/authRoute');
const metricdata=require('./routes/metricRoute');
dotenv.config();
connectdb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Use morgan middleware for logging



//Routes
app.use("/api/auth",auth);
app.use("/api/metric",metricdata);

//
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Health Tracking App</h1>");
});


const PORT = process.env.PORT || 8000; // Provide a default port if PORT is not specified in the environment
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`.bgBlue);
});
