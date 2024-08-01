import { EmbedBuilder } from "discord.js";

export async function buildEmbedMap(beatmapData) {
  const lastUpdated = beatmapData.last_updated;
  const date = new Date(lastUpdated);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const embed = new EmbedBuilder()
    .setColor("#0099ff") // Set the color of the embed
    .setTitle(
      `${beatmapData.beatmapset.artist} – ${beatmapData.beatmapset.title}`
    )
    .setURL(beatmapData.url)
    .setDescription(
      `Length: ${Math.floor(beatmapData.total_length / 60)}:${
        beatmapData.total_length % 60 < 10 ? "0" : ""
      }${beatmapData.total_length % 60} BPM: ${beatmapData.bpm} Mods: -`
    )
    .setThumbnail(beatmapData.beatmapset.covers.list)
    .addFields(
      {
        name: "Difficulty",
        value: `${beatmapData.difficulty_rating.toFixed(2)}★`,
        inline: true,
      },
      { name: "Max Combo", value: `${beatmapData.max_combo}x`, inline: true },
      { name: "AR", value: `${beatmapData.ar}`, inline: true },
      { name: "OD", value: `${beatmapData.accuracy}`, inline: true },
      { name: "HP", value: `${beatmapData.drain}`, inline: true },
      { name: "CS", value: `${beatmapData.cs}`, inline: true },

      {
        name: `${beatmapData.status}`,
        value: `${beatmapData.beatmapset.favourite_count} ❤️ | Last Updated ${formattedDate}`,
        inline: false,
      }
    );

  return embed;
}
