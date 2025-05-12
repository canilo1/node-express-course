
const express = require('express');
const path = require('path');
const tasks = require('./public/route/tasks.js');
const app = express();
const port = 3000;
const connectDB = require('./db/connect.js');
require('dotenv').config();
const notFound = require('./middleware/not-found.js') 
// Middleware
app.use(express.json());
app.use(express.static('./public'))
app.use('/api/v1/tasks', tasks);

app.use(notFound)
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }catch(err){
        console.log(err)

    }
}
start()