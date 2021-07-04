require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 3000;
const path = require('path');




app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname+'/index.html')));

app.post("/github", (req, res) => {
//Todo: change the content name to contain the repository name 
//github user name and add some emojis



  const username = req.body.sender.login;
  const repoName = req.body.repository.full_name;
  var content;
  //issue variables
  const issuestatus = req.body.action;
  // console.log(issuestatus);
  // console.log(username);

  if(issuestatus==="open"){
     content = `:taco: :taco: ${username} just opened an issue on ${repoName} :rocket: :tada: :tada:`;
  }
  else if(issuestatus==="closed"){
     content = `:taco: :taco: ${username} just closed an issue on ${repoName} :rocket: :tada: :tada:`;
  }
  else{
    content = `:taco: :taco: ${username} just opened starred ${repoName} :rocket: :tada: :tada:`;
  }

 
  const avatarUrl = req.body.sender.avatar_url;
  
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    })
    .then((discordResponse) => {
      console.log("Success!");
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to Discord: ${err}`));
});


app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
