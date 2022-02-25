const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const port = process.env.PORT || 5000;
app.get('/',(req, res)=>{
    res.json('this is my mongoos project');
});

//api routes
let api = require('./Route/api');

app.use('/api',api);

app.listen(port);