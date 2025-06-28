import { getPost } from "@/src/libs/posts"
import { getLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Mdx from "@/src/features/mdx/Mdx"

export default async function PostPage(props) {
  const post = await getPost(props.params.slug)
  if (!post) {
    notFound();
  }

  const locale = await getLocale()
  
  return (
    <main className="prose prose-sm lg:prose-lg mx-auto mb-10">
      <small>Home / {post.title}</small>
      <h1>{post.title}</h1>
      <div className="text-xs text-base-content/70">
        {(new Date(post.publishedAt)).toLocaleDateString(locale)}
      </div>
      <Image
        src={"/images/project-placeholder.png"}
        alt={post.title}
        width={495}
        height={374}
        className="w-full aspect-[2] object-cover"
      />
      <Mdx>{post.content}</Mdx>
    </main>
  )
}
