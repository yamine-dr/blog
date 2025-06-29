import { getPost } from "@/src/libs/posts"
import { getLocale, getTranslations } from "next-intl/server"
import { Link } from "@/src/i18n/navigation"
import { notFound } from "next/navigation"
import Image from "next/image"
import Mdx from "@/src/features/mdx/Mdx"

export default async function PostPage(props) {
  const { slug } = await props.params
  const post = await getPost(slug)
  if (!post) {
    notFound();
  }

  const locale = await getLocale()
  const t = await getTranslations("PostPage")

  const postTitle = post.title[locale]
  return (
    <main className="prose prose-sm lg:prose-lg mx-auto mb-10">
      <small>
        <Link href="/" className="text-info">{t("home")}</Link> / {postTitle}
      </small>
      <h1 className="mb-2">{postTitle}</h1>
      <div className="text-xs text-base-content/70">
        {(new Date(post.publishedAt)).toLocaleDateString(locale)}
      </div>
      <Image
        src={"/images/project-placeholder.png"}
        alt={postTitle}
        width={495}
        height={374}
        className="w-full aspect-[2] object-cover"
      />
      <Mdx>{post.content}</Mdx>
    </main>
  )
}
