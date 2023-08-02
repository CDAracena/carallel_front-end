import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";
import axios from "axios";

const FULL_POST_URL = "http://localhost:3001/posts";

export default withApiAuthRequired(async function handler(req, res) {
  const { id } = req.query;
  const { accessToken } = await getAccessToken(req, res);

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!id) {
    return res.status(400).json({ error: "postId parameter is required." });
  }

  const fullPost = await axios.get(`${FULL_POST_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!fullPost.data) {
    return res.status(404).json({ error: "Full post not found." });
  }

  return res.json(fullPost.data);
});
