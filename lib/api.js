import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'

const pagesDirectory    = join(process.cwd(), '_pages');
const servicesDirectory = join(process.cwd(), '_services');
const projectsDirectory = join(process.cwd(), '_projects');

export function getSlugs(directory) {
    return fs.readdirSync(directory)
}

export function getBySlug(slug, directory, fields = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(directory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items = {}

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
    })
    return items
}

export function getAll(directory, fields = []) {
    const slugs = getSlugs(directory)
    return slugs
        .map((slug) => getBySlug(slug, directory, fields))
        .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
}
