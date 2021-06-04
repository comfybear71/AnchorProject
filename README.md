# project1
Building my First Project

## Step 1
- got [GitHub] (https://www.github.com "GitHub")
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



