import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Next JS Blog Project using Drizzle and Postgres",
};

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="py-10 min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {posts.length === 0 ? (
            <div>No post yet.</div>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
      </main>
    </div>
  );
}
