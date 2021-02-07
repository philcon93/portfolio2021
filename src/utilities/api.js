import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export const postsDirectory = join(process.cwd(), 'src/posts');
export const sketchesDirectory = join(process.cwd(), 'src/sketches');

export const postsFilePaths = fs
  .readdirSync(postsDirectory)
  // Only include md(x) files
  .filter(path => /\.mdx?$/.test(path))

export const sketchesFilePaths = fs
  .readdirSync(sketchesDirectory)
  // Only include md(x) files
  .filter(path => /\.mdx?$/.test(path))

export const getContent = (slug, fields = [], directory = postsDirectory) => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(directory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  })

  return items;
}

export const getAllPosts = (fields = [], directory = postsDirectory) => {
  const slugs = fs.readdirSync(directory);
  const posts = slugs
    .map((slug) => getContent(slug, fields, directory))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
  return posts;
}