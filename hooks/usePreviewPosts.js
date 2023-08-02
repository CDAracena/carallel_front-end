import { useEffect, useState } from "react";
import axios from "axios";

const PREVIEW_POSTS_URL = "http://localhost:3001/preview";

const usePreviewPosts = () => {
  const [previewPosts, setPreviewPosts] = useState([]);

  useEffect(() => {
    const fetchPreviewPosts = async () => {
      try {
        const response = await axios.get(PREVIEW_POSTS_URL);
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
