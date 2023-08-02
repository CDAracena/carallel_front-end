import { useUser } from "@auth0/nextjs-auth0/client";
import usePreviewPosts from "../hooks/usePreviewPosts";

interface PreviewPost {
  id: number;
  title: string;
}
export default function Page() {
  const { user } = useUser();
  const previewPosts = usePreviewPosts();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Article Previews</h1>
      {user ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/login">Login to read full articles</a>
      )}
      <hr />
      {previewPosts?.map((previewPost: PreviewPost) => (
        <a key={previewPost.id} href={`/resources/${previewPost.id}`}>
          {previewPost.title}
        </a>
      ))}
    </div>
  );
}
