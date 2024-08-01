import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { accessToken } from "./osu/osuToken.js";
import { getUserData } from "./osu/getUser.js";
import { buildEmbedUser } from "./buildembed/buildembed_user.js";
import { buildEmbedMap } from "./buildembed/buildembed_beatmap.js";
import { sleep } from "openai/core.mjs";
import { getUserByName } from "./osu/getUserByname.js";
import { getBeatmap } from "./osu/getBeatmap.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const CHANNELS = [
  "1170994441444675584",
  "1239276266138370252",
  "1240184556762693715",
  "1239221025179308095",
]; // only works on specific channels for now

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  await message.channel.sendTyping;

  if (
    CHANNELS.includes(message.channelId) &&
    !message.author.bot &&
    message.author.username !== "impen"
  ) {
    await message.reply(`บ่นไร ${message.author.username}`);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!CHANNELS.includes(interaction.channelId)) return;

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "get-user") {
    try {
      const userData = await getUserData(
        accessToken,
        interaction.options.getString("url")
      );
      const embed = await buildEmbedUser(userData);

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error.stack);
    }
  }

  if (interaction.commandName === "get-user-by-name") {
    try {
      const userName = interaction.options.getString("username");
      const userData = await getUserByName(accessToken, userName);

      if (userData.error === null) {
        await interaction.reply(
          `Cannot find user that has Username: ${userName}`
        );
      } else {
        const embed = await buildEmbedUser(userData);
        await interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.log(err.stack);
    }
  }

  if (interaction.commandName === "get-beatmap") {
    try {
      const beatmapData = await getBeatmap(
        accessToken,
        interaction.options.getString("url")
      );
      const embed = await buildEmbedMap(beatmapData);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error.stack);
    }
  }
});

client.login(process.env.TOKEN);
