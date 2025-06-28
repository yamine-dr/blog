import Section from "../components/layout/Section"
import PostCard from "../components/PostCard"
import { rightArrowIcon } from "../components/ui/Icons"
import { getPosts } from "@/src/libs/posts"

export default async function RootPage() {
  const posts = await getPosts()

  return (
    <>
      <Section marginTop={0}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Featured Posts</h1>
          <a href="#"
            className="flex items-center gap-1"
          >
            More {rightArrowIcon}
          </a>
        </div>

        <div className="flex gap-5 max-md:flex-col flex-wrap justify-between items-stretch max-md:items-center">
          {posts.slice(0, 2).map((post) => (
            <PostCard key={post.slug} post={post} className="w-8/12 md:w-5/12"/>
          ))}
        </div>
      </Section>
    </>
  )
}