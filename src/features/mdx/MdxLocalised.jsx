import { useLocale } from "next-intl"

export const MdxLocalised = ({ lang, children }) => {
  const locale = useLocale()
  return locale === lang ? <>{children}</> : null;
}
