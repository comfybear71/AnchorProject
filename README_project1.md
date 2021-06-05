# project1 [EXPRESS, CORS, AXIOS]
Building our First Project, this is going to be a Frontend & Backend project.
Using Express, Cors for the backend and Axios for the Frontend.
It should be heaps of fun!!!

## Step 1
- go to [GitHub] (https://www.github.com "GitHub")
- Create an account, if you haven't already got one.
- Create a new repository and give it a name.
- Add a README.file
- Add .gitignore
- Choose a license (MIT)
- Hit Create Repository button

## Step 2
- Copy Git Repository as per image below.
! [GitHub] (http://anchor.gold/project_folder/images/githubScreenShot.png)
- Open powerShell on PC.
- Change to your _project_ Directory and
- type `git clone` then paste the git repository link you copied to

## Step 3
- Today we are making a **Backend** _Express_ Node JS server and a
- **Frontend** react app with _Axios_ to talk to Express Backend.
- This is gonna be awesome and so educational, ( I can't wait)
### Let's Begin

## Step 4 Creating the Backend server
- This sounds scary but it ain't
- Let create a Directory, called "project1" 
- Now lets change directory to our project `cd project1`
- Then we initialize our node server, use `npm init -y`
- Then install _express_ & _cors_ `npm i --save express cors`
- Add our server `server.js` 
- in powerShell, the command is `New-Item -ItemType file server.js`
- Then add the following code to `server.js`

```
const express = require('express');
app = express();
port = process.env.PORT || 5000;
cors = require('cors');

app.use(cors());
app.listen(port, () => console.log('Server Listening on port: ' + port));

app.get('/', (req, res) => {
    res.send({message: 'We are ready and waiting'})
}) 

```

## Step 5 Open in localhost:5000
- run command `node server.js` in console
- then open browser and type [localhost] (https://localhost:5000)
- perfect, that's the backend setup, now lets do the frontend

# Setting up the frontend

## step 1
- So lets make sure we are in our `project1` folder?
- And lets make our frontend by typing `npx create-react-app frontend`
- Then `cd frontend` this is where we install our modules for API requests
- type the command `npm i --save axios` or if you prefer yarn, type `yarn add axios`

## Step 2 Create App.js File
- let's start with a clean project, so delete everything from `\src` folder
- then add New File `App.js` and add te following code
```
import Axios from 'axios'

function App() {

  Axios ({
    methods: "GET",
    url: "http://localhost:5000/",
    headers: { 
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message);
  })
  
  return (
    <div className="App">
    </div>
  );
}

export default App;

```

- Then save file

## Step 3 Create index.js File

- Create new file, called `index.js` and add the following code

```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
    );

```
## Step 4 Get ya motor running
- Now make sure, terminal is inside the `\frontend` folder
- You can either `npm start` or `yarn start`
- then add another terminal and make sure you are in `project1` folder and
- run the command `node server.js` then lets open our browser again at [localhost] (https://localhost:3000)
- right click on screen, go inspect, then select console
- Where you'll see our message 'We are ready and waiting'
- project 1 is complete

# That's it for first project.
- That's it for project 1, now lets go deeper, with project 2.
- Fork off from this project1 and add some API calls
