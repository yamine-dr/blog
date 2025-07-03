import path from "node:path"; 
import { promises as fs } from "node:fs";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

export async function getPosts() {
  const files = await fs.readdir(postsDirectory);
  const fileNames = files.filter(file => file.endsWith(".mdx"));
  
  const posts = []; // with type -> const posts: Post[] = [];
  for await (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const frontMatter = matter(fileContent);

    // Skip unpublished posts in production
    if (!frontMatter.data.published && process.env.NODE_ENV !== "development") {
      continue;
    }

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

    // Skip unpublished posts in production
    if (!frontMatter.data.published && process.env.NODE_ENV !== "development") {
      continue;
    }

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