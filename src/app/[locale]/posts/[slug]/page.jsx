import { getLocalisedPost } from "@/src/libs/posts"
import { getLocale, getTranslations } from "next-intl/server"
import { Link } from "@/src/i18n/navigation"
import { notFound } from "next/navigation"
import Image from "next/image"
import Mdx from "@/src/features/mdx/Mdx"
import UpdateViews from "./UpdateViews"
import { redis } from "@/src/libs/redis"
import { PostViews } from "@/src/app/components/PostViews"

export const dynamic = "force-static"
export const revalidate = 60 // revalidate page every 60s, instead of on every request

export async function generateMetadata({ params }) {
  const post = await getLocalisedPost((await params).slug, locale)
  if (!post) {
    const t = await getTranslations("Metadata")
    return {
      title: t("notFound.title"),
      description: t("notFound.description"),
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }) {
  const slug = (await params).slug
  const locale = await getLocale()
  const post = await getLocalisedPost(slug, locale)
  if (!post) {
    notFound();
  }

  const views = Number(await redis.get(`postviews:${slug}`)) ?? 0

  const t = await getTranslations("PostPage")
  return (
    <main className="prose prose-sm lg:prose-lg mx-auto mb-10">
      <UpdateViews slug={slug}/>

      <small>
        <Link href="/" className="text-info">{t("home")}</Link> / {post.title}
      </small>
      <h1 className="mb-2 lg:mb-2">{post.title}</h1>
      <div className="text-xs text-base-content/70">
        {(new Date(post.publishedAt)).toLocaleDateString(locale)}
        <PostViews views={views} className="mt-2"/>
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