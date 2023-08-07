import { useUser } from "@auth0/nextjs-auth0/client";
import usePreviewPosts from "../hooks/usePreviewPosts";
import Link from "next/link";

import { PreviewPost } from "../types/Post";

export default function Page() {
  const { user } = useUser();
  const previewPosts = usePreviewPosts();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Article Previews</h1>
      {user ? (
        <Link href="/api/auth/logout">Logout</Link>
      ) : (
        <Link href="/api/auth/login">Login to read full articles</Link>
      )}
      <hr />
      {previewPosts?.map((previewPost: PreviewPost) => (
        <Link key={previewPost.id} href={`/resources/${previewPost.id}`}>
          {previewPost.title}
        </Link>
      ))}
    </div>
  );
}
