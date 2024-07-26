export async function getUserData(accessToken, userURL) {
    if(!userURL){
        console.log("need user URL");
        return;
    }
    const parts = userURL.split('/');
    const userID = parts[parts.length - 1];

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    
    const userData = await fetch(`https://osu.ppy.sh/api/v2/users/${userID}/osu`, {
      method: "GET",
      headers,
    }).then((response) => response.json());
  
    return userData;
  }