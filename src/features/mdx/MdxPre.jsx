import { clipboardIcon } from "@/src/app/components/ui/Icons"

export const MdxPre = ({ className, children, ...props }) => (
  <div className="relative mb-4">
    {/* button to copy code */}
    {/* <button
      className="opacity-40 absolute top-3 right-3 p-2 border border-current/30 rounded-md hover:opacity-100 hover:cursor-pointer transition-opacity"
    >
      {clipboardIcon}
    </button> */}
    <pre
      className={`not-prose p-4 text-sm rounded-lg ${className}`}
      {...props}
    >
      {children}
    </pre>
  </div>
)