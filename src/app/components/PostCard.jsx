import Image from "next/image"

export default function PostCard({ post }) {
  // to add: published date, tags, link to full post ("read more" button)
  return (
    <div className="card bg-base-100 w-90 border border-base-content rounded-xl shadow-sm">
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
        <p>{post.description}</p>
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