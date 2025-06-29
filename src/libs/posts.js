import path from "node:path"; 
import { promises as fs } from "node:fs";
// import { z } from "zod";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

/* Define a schema for the blog posts metadata (= front matter), using zod */
// const PostFrontMatterSchema = z.object({
//   title: z.object({
//     en: z.string(),
//     fr: z.string(),
//   }),
//   description: z.object({
//     en: z.string(),
//     fr: z.string(),
//   }),
//   published: z.boolean().optional().default(false),
//   publishedAt: z.coerce.string(),
// });

/* Define the "Post" type for blog posts */
// type Post = z.infer<typeof PostFrontMatterSchema> & {
//  slug: string;
//  content: string;
// };

export async function getPosts() {
  const files = await fs.readdir(postsDirectory);
  const fileNames = files.filter(file => file.endsWith(".mdx"));
  
  const posts = []; // with type -> const posts: Post[] = [];
  for await (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const frontMatter = matter(fileContent);

    /* Validate the blog post front matter against the schema */
    // const parsedData = PostFrontMatterSchema.safeParse(frontMatter.data);
    // // If validation fails, log the error and skip this file
    // if (!parsedData.success) { 
    //   console.error(`Invalid front matter in ${fileName}:`, parsedData.error);
    //   continue;
    // }
    // // Skip unpublished posts in production
    // if (!parsedData.data.published && process.env.NODE_ENV !== "development") {
    //   continue;
    // }

    posts.push({
      ...frontMatter.data, // after validation, use parsedData.data
      slug: fileName.replace(/^\d+-/,"").replace(".mdx", ""),
      content: frontMatter.content,
    })
  }
  
  return posts;
}

export async function getLocalisedPosts(locale) {
  const files = await fs.readdir(postsDirectory);
  const fileNames = files.filter(file => file.endsWith(".mdx"));

  const posts = [];
  for await (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const frontMatter = matter(fileContent);

    const { title, description, ...rest } = frontMatter.data;
    posts.push({
      ...rest,
      title: title[locale], // extract the localized title
      description: description[locale], // Extract the localized description
      slug: fileName.replace(/^\d+-/,"").replace(".mdx", ""),
      content: frontMatter.content,
    });
  }

  return posts;
}

export async function getPost(slug) {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug);
}

export async function getLocalisedPost(slug, locale) {
  const posts = await getLocalisedPosts(locale);
  return posts.find(post => post.slug === slug);
}