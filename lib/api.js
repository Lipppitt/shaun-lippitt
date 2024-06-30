// import fs from 'fs'
// import {join} from 'path'
// import matter from 'gray-matter'
//
// export function getSlugs(directory) {
//     return fs.readdirSync(directory)
// }
//
// export function getBySlug(slug, directory, fields = []) {
//     const realSlug = slug.replace(/\.md$/, '')
//     const fullPath = join(directory, `${realSlug}.md`)
//     const fileContents = fs.readFileSync(fullPath, 'utf8');
//     const { data, content } = matter(fileContents)
//     const items = {}
//
//     items['slug'] = realSlug;
//
//     markdownFileTreeLookUp(data);
//
//     // Return all data if no fields are specified
//     if (fields.length === 0) {
//         return data;
//     }
//
//     // Ensure only the minimal needed data is exposed
//     fields.forEach((field) => {
//         if (field === 'slug') {
//             items[field] = realSlug
//         }
//         if (field === 'content') {
//             items[field] = content
//         }
//         if (data[field]) {
//             items[field] = data[field]
//         }
//     });
//
//     return items;
// }
//
// export function getAll(directory, fields = []) {
//     let slugs = getSlugs(directory);
//     slugs = slugs.map( (slug) => getBySlug(slug, directory, fields));
//     return slugs;
// }
//
// function markdownFileTreeLookUp(o)
// {
//     Object.keys(o).forEach(function(k) {
//         if(o[k] !== null && typeof o[k] === 'object') {
//             markdownFileTreeLookUp(o[k]);
//             return;
//         }
//         if (typeof o[k] === 'string') {
//             if (o[k].includes(".md")) {
//                 let fileParts = o[k].split('/');
//                 let filePartKeys = Object.keys(fileParts);
//                 o[k] = getBySlug(fileParts[filePartKeys[1]], fileParts[filePartKeys[0]]);
//             }
//         }
//     });
// }
//
