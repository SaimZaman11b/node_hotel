require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, resp) => {
    resp.send('Welcomde to the API');
});


const personroutes  = require('./routes/personroute');
app.use('/person', personroutes);

const menuitemsroutes = require('./routes/menuitemRoute');
app.use('/menuitem', menuitemsroutes);

const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});