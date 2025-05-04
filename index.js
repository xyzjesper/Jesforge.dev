import axios from "axios";
import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client
  .login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log("Logged in successfully!");
    website(client);
  })
  .catch((error) => {
    console.error("Error logging in:", error);
  });

async function website(client) {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.static("assets"));
  app.use(express.static("assets/work"));
  app.use(express.static("assets/connections"));
  app.use(express.static("html"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "html" });
  });

  app.get("/api", (req, res) => {
    res.json({ message: "Hello from the API!" });
  });

  app.get("/api/css", (req, res) => {
    res.sendFile("styles.css", { root: "assets" });
  });

  app.get("/api/img/:filename", (req, res) => {
    const filename = req.params.filename;
    res.sendFile(filename, { root: "assets" }, (err) => {
      if (err) {
        res.status(err.status).end();
      }
    });
  });

  app.get("/api/img/work/:filename", (req, res) => {
    const filename = req.params.filename;
    res.sendFile(filename, { root: "assets/work" }, (err) => {
      if (err) {
        res.status(err.status).end();
      }
    });
  });

  app.get("/api/img/connections/:filename", (req, res) => {
    const filename = req.params.filename;
    res.sendFile(filename, { root: "assets/connections" }, (err) => {
      if (err) {
        res.status(err.status).end();
      }
    });
  });

  app.get("/api/discord", async (req, res) => {
    const guild = await client.guilds.fetch("1328003522133757995");
    await guild.members.fetch();

    const status =
      guild.members.cache.get("850470027026759690").presence.status;
    res.json({
      status: status,
    });
  });

  app.get("/api/discord/presence", async (req, res) => {
    const guild = await client.guilds.fetch("1328003522133757995");
    await guild.members.fetch();

    const status = guild.members.cache.get("850470027026759690").presence;
    res.json({
      status: status,
    });
  });

  app.get("/api/github/:user", async (req, res) => {
    const user = req.params.user;
    try {
      const response = await axios.get(
        `https://api.github.com/users/${user}/repos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      const data = response.data;
      res.json(data);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
