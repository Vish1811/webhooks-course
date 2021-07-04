require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send(`
  <html>
    <head><title>Success!</title></head>
    <body>
      <h1>You did it!</h1>
      <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
    </body>
  </html>
`));

app.post("/github", (req, res) => {
//Todo: change the content name to contain the repository name 
//github user name and add some emojis



  const username = req.body.sender.login;
  const repoName = req.body.repository.full_name;

  const content = `:taco: :taco: ${username} just starred ${repoName} :rocket: :tada: :tada:`;
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
