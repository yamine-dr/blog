import { Icons } from "@/src/app/components/ui/Icons"

export const PostViews = ({ views, className }) => (
  <span className={`flex gap-1.5 items-center text-xs text-base-content/70 ${className}`}>
    {Icons.eye} {views}
  </span>
)