export async function getUserByName(accessToken, username) {
    if (!username) {
        console.log("Username is required");
        return;
    }

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const url = new URL(`https://osu.ppy.sh/api/v2/users/${username}/osu`);
    url.searchParams.append('key', 'username');


    const userData = await fetch(url.toString(), {
      method: "GET",
      headers,
    }).then((response) => response.json());

    return userData;
}
