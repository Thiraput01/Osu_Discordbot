import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!!",
  },
  {
    name: "senior",
    description: "boom!",
  },
  {
    name: "get-user",
    description: "get Osu user",
    options: [
      {
        name: "url",
        description: "get user by http",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  {
    name: "get-user-by-name",
    description: "get Osu user by Username",
    options: [
      {
        name: "username",
        description: "OSU! username",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  {
    name: "get-beatmap",
    description: "get OSU! beatmap",
    options: [
      {
        name: "url",
        description: "get beatmap by http",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]

  }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.ClientID,
        process.env.ChannelID
      ),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
