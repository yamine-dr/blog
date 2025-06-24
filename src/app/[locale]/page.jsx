import Header from "@/src/app/components/layout/Header"
import Section from "../components/layout/Section"
import PostCard from "../components/PostCard"
import Icons from "../components/ui/Icons"
import { getPosts } from "@/src/libs/posts"

export default async function RootPage() {
  const posts = await getPosts()

  return (
    <>
      <Header/>

      <Section marginTop={0}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Featured Posts</h1>
          <a href="#"
            className="flex items-center gap-1"
          >
            More {Icons["right arrow"]}
          </a>
        </div>

        {posts.map((post) => (
          <PostCard key={post.slug} post={post}/>
        ))}
      </Section>
    </>
  )
}