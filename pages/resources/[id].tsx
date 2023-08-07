import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import Link from "next/link";

import { FullPost, FullPostApiResponse } from "../../types/Post";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const [fullPost, setFullPost] = useState<FullPost | null>(null);

  useEffect(() => {
    const fetchProtected = async () => {
      if (user) {
        const result: FullPostApiResponse = await axios.get<FullPost>(
          `/api/getFullPost/${id}`
        );
        setFullPost(result.data);
      }
    };
    fetchProtected();
  }, [user, id]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link href={"/"}>Go back</Link>
      <hr />
      {user && <Link href={"/api/auth/logout"}>Logout</Link>}
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
