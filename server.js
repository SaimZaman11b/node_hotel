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

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});