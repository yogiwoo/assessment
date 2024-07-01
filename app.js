const express = require('express');
const cors = require('cors');
const database = require('./db');
const router = require('./router');
require('dotenv').config();
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}));

// Use the router
app.use(router);

// Default route
app.get('/', (req, res) => {
    res.send('default path');
});
// const loadCpu = () => {
//     let i = 0;
//     while (true) {
//        // console.log("-------------- hello -------------")
//       i++;
//     }
//   };
//   loadCpu();

// Connect to the database and start the server
database().then(() => {
    app.listen(port, () => {
        console.log(`Server is active at port ${port}`);
    });
}).catch(err => {
    console.error("Error connecting to MongoDB", err.message);
});
