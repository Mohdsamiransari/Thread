import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";


export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser()

  return (
    <div>
      <h1 className="head-text text-left">Home</h1>

      <section>
        {result.posts.length === 0?(
          <p className="no-result">No threads found</p>
        ):(
          <>
          {result.posts.map((posts)=>(
            <ThreadCard
                key={posts.id}
                id={posts._id}
                currentUserId={user?.id || ""}
                parentId={posts.parentId}
                content={posts.text}
                author={posts.author}
                community={posts.community}
                createdAt={posts.createdAt}
                comments={posts.children}
            />
          ))}
          </>
        )}
      </section>
    </div>
  )
}