import { EmbedBuilder } from "discord.js";

export async function buildEmbedUser(userData) {
  let color = null;
  let status;
  if (userData.is_online) {
    color = "#7FFF00";
    status = "online";
  } else {
    color = "#DC143C";
    status = "offline";
  }
  
  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(userData.username)
    .setURL(`https://osu.ppy.sh/users/${userData.id}`)
    .setAuthor({
      name: "User Info",
      iconURL:
        "https://logos-world.net/wp-content/uploads/2022/02/Osu-Logo.png",
    })
    .setThumbnail(userData.avatar_url)
    .addFields(
      { name: "Highest rank", value: ` # ${userData.rank_highest.rank.toString()}` },
      { name: "\u200B", value: "\u200B" },
      {
        name: "Beatmaps played",
        value: userData.statistics.play_count.toString(),
        inline: true,
      },
      { name: "Total pp", value: userData.statistics.pp.toString(), inline: true }
    )
    .addFields({
      name: "Ranks",
      value: `SSS: ${userData.statistics.grade_counts.ssh} \n SS: ${userData.statistics.grade_counts.ss} \n S: ${userData.statistics.grade_counts.sh} \n A: ${userData.statistics.grade_counts.a}`,
    })
    .setTimestamp()
    .setFooter({
      text: `Status : ${status}`,
    });
  
  return embed;
}
