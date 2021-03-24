import fetch from "isomorphic-unfetch";
import qs from "querystring";
import Cookies from "cookies";
import base from "@utils/airtable";
import id from "@utils/id";

export default async (req, res) => {
  const cookies = new Cookies(req, res);
  let access = await fetch(
    `https://github.com/login/oauth/access_token?code=${req.query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
  );
  let token = await access.text();
  token = qs.parse(token);
  if (token.error) return res.send(401);
  token = token.access_token;

  let data = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  let randToken = id(32);
  data = await data.json();
  if (data.login !== "neelr") return res.send(401);
  await base("me").create([
    {
      fields: {
        token: randToken,
        access: token,
      },
    },
  ]);
  cookies.set("loginToken", randToken, {
    httpOnly: false,
  });
  res.redirect("/");
};
