import { EmbedBuilder } from "discord.js";

export async function buildEmbedMap(beatmapData) {
  const embed = new EmbedBuilder()
    .setColor("#0099ff") // Set the color of the embed
    .setTitle("Example Embed") // Set the title of the embed
    .setURL("https://example.com") // Set the URL of the embed (title will be clickable)
    .setAuthor({
      name: "Author Name",
      iconURL: "https://example.com/avatar.png",
      url: "https://example.com",
    }) // Set the author with a name, avatar, and URL
    .setDescription("This is an example description") // Set the description of the embed
    .setThumbnail("https://example.com/thumbnail.png") // Set the thumbnail image
    .addFields(
      { name: "Field 1", value: "Some value here", inline: true }, // Add a field with a name and value
      { name: "Field 2", value: "Some value here", inline: true },
      { name: "Field 3", value: "Some value here", inline: true }
    )
    .setImage("https://example.com/image.png") // Set an image to be displayed in the embed
    .setTimestamp() // Set the current timestamp
    .setFooter({
      text: "Footer text",
      iconURL: "https://example.com/footer-icon.png",
    }); // Set the footer text and icon

  return embed;
}
