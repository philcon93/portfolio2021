import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'src/posts');
const sketchesDirectory = join(process.cwd(), 'src/sketches');

export const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory);
}

export const getSketchSlugs = () => {
  return fs.readdirSync(sketchesDirectory);
}

export const getContent = (slug, fields = [], directory = postsDirectory) => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(directory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

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

export const getAllPosts = (fields = []) => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getContent(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
  return posts;
}

export const getAllSketches = (fields = []) => {
  const slugs = getSketchSlugs();
  const sketches = slugs
    .map((slug) => getContent(slug, fields, sketchesDirectory))
    // sort sketches by date in descending order
    .sort((sketch1, sketch2) => (sketch1.date > sketch2.date ? '-1' : '1'));
  return sketches;
}