import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { FullPost, FullPostApiResponse } from "../../../types/Post";

const FULL_POST_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { accessToken } = await getAccessToken(req, res);

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!id) {
    return res.status(400).json({ error: "postId parameter is required." });
  }

  const fullPostResponse: FullPostApiResponse = await axios.get<FullPost>(
    `${FULL_POST_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!fullPostResponse.data) {
    return res.status(404).json({ error: "Full post not found." });
  }

  return res.json(fullPostResponse.data);
});
