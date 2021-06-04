const express = require('express');
app = express();
port = process.env.PORT || 5000;
cors = require('cors');

app.use(cors());
app.listen(port, () => console.log('Server Listening on port: ' + port));

app.get('/', (req, res) => {
    res.send({message: 'We are moving on with Project 2'})
})