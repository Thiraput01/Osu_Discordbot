import dotenv from "dotenv";

dotenv.config();

const Client_Secret = process.env.OsuSecret;
const Client_ID = process.env.OsuID;

const authURL = new URL("https://osu.ppy.sh/oauth/token");

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

let body = {
  client_id: Client_ID,
  client_secret: Client_Secret,
  grant_type: "client_credentials",
  scope: "public",
};

const accessTokenResponse = await fetch(authURL, {
  method: "POST",
  headers,
  body: JSON.stringify(body),
}).then((response) => response.json());

const accessToken = accessTokenResponse.access_token;

export { accessToken };