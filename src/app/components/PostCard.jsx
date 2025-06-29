import { Link } from "@/src/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"

export default function PostCard({ post, className }) {
  const locale = useLocale()
  const t = useTranslations()
  return (
    <div className={`card bg-base-100 border border-base-content rounded-md shadow-sm ${className}`}>
      <figure>
        <Image 
          src={"/images/project-placeholder.png"}
          alt=""
          width={495}
          height={374}
          className="object-cover w-full aspect-[1.72] max-md:max-w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {post.title}
        </h2>

        <div className="text-xs text-base-content/70">
          {(new Date(post.publishedAt)).toLocaleDateString(locale)}
        </div>

        <p>{post.description}</p>

        <div className="card-actions">
          <Link href={`/posts/${post.slug}`} className="text-info font-bold hover:underline">
            {t("HomePage.readMore")}
          </Link>
        </div>
        
        <div className="card-actions justify-end">
          {post.tags && post.tags.length > 0 && (
            <div className="card-actions justify-end">
              {post.tags.map((tag, index) => (
                <div key={index} className="badge badge-outline">
                  {tag}
                </div>
              ))}
            </div>
          )
          }
        </div>
      </div>
    </div>
  )
}