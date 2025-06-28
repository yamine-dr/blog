import { MDXRemote } from "next-mdx-remote-client/rsc"
import { Suspense } from "react"
import { ShikiPlugin } from "./mdx_plugins"
import { useMDXComponents } from "@/mdx-components"
import { MdxYouTube } from "./MdxYouTube"
import { MdxPre } from "./MdxPre"

export default function Mdx({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MDXRemote
        source={children}
        options={{
          mdxOptions: {
            rehypePlugins: [ShikiPlugin],
          }
        }}
        components={useMDXComponents({ // custom MDX components
          YouTube: MdxYouTube,
          pre: MdxPre,
        })}
      />
    </Suspense>
  )
}