# PROJECT 3 [EXPRESS, SQLite3, KNEX]
In this project 3 we start a brand new project and create a SQlite database using the Knex.js library.



<!-- ## STEP 1: Add NODEMON
- Make sure we are in our terminals, backend first `\project1`
- Add nodemon by typing in the terminal `yarn add nodemon`
- once installed edit `package.json` with the following

```
"scripts": {
    "start": "node index.js",
    "server": "nodemon index.js"
  },

```

## STEP 2: Add shortid
-we'll also add shortid and we will add that to our Development Dependencies by using the `-D`
- so in the Terminal type `yarn add shortid -D`

- Nodemon helps us spin up server when we make changes, so we don't have to run `yarn start` after each change.
- Now we can run `yarn server`

## Step 3: Writing some API calls
- Because I am writing this project for my main project [anchorgold](https://anchor.gold 'anchorGold' ) we'll make the API calls as thus

## LETS EDIT index.js FILE
- Edit the index.js file, so it looks like the below

```
const cors = require('cors');
const express = require('express');
const shortid = require('shortid')

const server = express();

server.use(express.json())
server.use(cors());

const PORT = 5000;

let users = [];


server.get('/', (req, res) => {
    res.json({welcome: 'Welcome to project 2 or PART II'});
})


```

- make sure server is running and open browser at `http://localhost:5000/`

- now lets make another _GET_ in `index.js` add the following codec

```
server.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

```

- now point server to `http://localhost:5000/api/users` because we haven't _POST_ anything you should see an empty array `[]`

- so now lets post something to out `users = []` array, from the code on line 12

- to post we are going to need either POSTMAN or INSOMIA

## STEP 4: POST using INSOMNIA

- lets download POSTMAN and INSOMNIA -->