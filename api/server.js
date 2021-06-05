const cors = require('cors');
const express = require('express');


const server = express();
server.use(express.json())

port = process.env.PORT || 5000;


server.use(cors());

server.listen(port, () => console.log('Server Listening on port: ' + port));

server.get('/', (req, res) => {
    res.send({message: 'We are moving on with Project 2'})
})