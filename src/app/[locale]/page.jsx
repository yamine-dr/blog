import { getLocale, getTranslations } from "next-intl/server"
import Section from "../components/layout/Section"
import PostCard from "../components/PostCard"
import { Icons } from "../components/ui/Icons"
import { getLocalisedPosts } from "@/src/libs/posts"

export default async function RootPage() {
  const locale = await getLocale()
  const t = await getTranslations("HomePage")

  const posts = await getLocalisedPosts(locale)
  return (
    <>
      <Section>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">{t("featuredPosts")}</h1>
          <a href="#"
            className="flex items-center gap-1 text-info hover:animate-bounce-x"
          >
            {t("morePosts")} {Icons.rightArrow}
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