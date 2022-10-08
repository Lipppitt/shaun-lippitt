import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'

export function getSlugs(directory) {
    return fs.readdirSync(directory)
}

export function getBySlug(slug, directory, fields = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(directory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents)
    const items = {}

    items['slug'] = realSlug;

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }

        if (data[field]) {
            items[field] = data[field]
        }
    });

    return items;
}

export function getAll(directory, fields = []) {
    let slugs = getSlugs(directory);
    slugs = slugs.map( (slug) => getBySlug(slug, directory, fields));
    return slugs;
}
