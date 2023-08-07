import { useEffect, useState } from "react";
import axios from "axios";

import { PreviewPost, PreviewPostApiResponse } from "../types/Post";

const PREVIEW_POSTS_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/preview`;

const usePreviewPosts = () => {
  const [previewPosts, setPreviewPosts] = useState<PreviewPost[]>([]);

  useEffect(() => {
    const fetchPreviewPosts = async () => {
      try {
        const response: PreviewPostApiResponse = await axios.get<PreviewPost[]>(
          PREVIEW_POSTS_URL
        );
        setPreviewPosts(response.data);
      } catch (e) {
        console.log("Error retrieving preview posts:", e);
      }
    };

    fetchPreviewPosts();
  }, []);

  return previewPosts;
};

export default usePreviewPosts;
