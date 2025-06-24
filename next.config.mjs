import createMDX from "@next/mdx"
import createNextIntlPlugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));