const prettyjson = require('prettyjson');
const express = require('express');
const bodyParser = require('body-parser');

const options = {
  noColor: true
};

//  create an express app and configure it with bodyParser middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// create our webhook endpoint to receive webhooks from safaricom
app.post('/hooks/mpesa', (req, res)=>{
  console.log('---------------Received M-pesa webhook-------');

//  format and dump the resaquest payload received from safaricom in terminal
console.log(prettyjson.render(req.body, options));
console.log('-----------------------');

let message = {
  "ResponceCode": "0000000",
  "ResponceDesc": "success"
};

// respond to safaricom server with success message
res.json(message);

});

const server = app.listen(5000, () =>{
  let host = server.address().address;
  let port = server.address().port;
  console.log(`server is listening on port ${port}`);
});