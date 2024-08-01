export async function getBeatmap(accessToken, beatmapURL) {
  if (!beatmapURL) {
    console.log("Need beatmap URL");
    return;
  }
  const urlParts = beatmapURL.split("/");
  const lastPart = urlParts[urlParts.length - 1];
  const beatmapID = lastPart.includes("#") ? lastPart.split("#")[1] : lastPart;
  console.log(beatmapID);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const beatmapData = await fetch(
    `https://osu.ppy.sh/api/v2/beatmaps/${beatmapID}`,
    {
      method: "GET",
      headers,
    }
  ).then((response) => response.json());

  return beatmapData;
}
