import { useEffect, useState } from "react";
import axios from "axios";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const [fullPost, setFullPost] = useState(null);

  useEffect(() => {
    const fetchProtected = async () => {
      if (user) {
        const result = await axios.get(`/api/getFullPost/${id}`);
        setFullPost(result.data);
      }
    };
    fetchProtected();
  }, [user]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <a href={"/"}>Go back</a>
      <hr />
      {user && <a href={"/api/auth/logout"}>Logout</a>}
      <hr />
      {fullPost ? (
        <div>
          <div>
            <b>{fullPost.title}</b>
          </div>
          <hr />
          <div>{fullPost.body}</div>
        </div>
      ) : (
        <div>Please wait a moment...</div>
      )}
    </div>
  );
};

export default withPageAuthRequired(Page);
