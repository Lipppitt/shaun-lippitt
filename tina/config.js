import { defineConfig } from "tinacms";
import {pageFields, projectFields, sectionFields, serviceFields} from "./templates";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "24a9b746-5bd0-47cd-94a9-29128f76bcce", // Get this from tina.io
  token: "549f52847684cbb0ae19e26d81ca7b86dd4c5023", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        format: "md",
        label: "Pages",
        name: "pages",
        path: "_pages",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...pageFields(),
        ],
      },
      {
        format: "md",
        label: "Posts",
        name: "posts",
        path: "_posts",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: 'rich-text',
            label: 'Excerpt',
            name: 'excerpt',
          },
          {
            type: 'image',
            label: 'Featured Image',
            name: 'featured_image',
          },
          {
            label: "Date",
            name: "date",
            type: "datetime",
          },
          {
            type: 'reference',
            label: 'Author',
            name: 'author',
            collections: ['author'],
          },
          ...pageFields(),
        ],
      },
      {
        label: 'Authors',
        name: 'author',
        path: 'content/authors',
        format: 'md',
        fields: [
          {
            type: 'string',
            label: 'Name',
            name: 'name',
            isTitle: true,
            required: true,
          },
          {
            type: 'image',
            label: 'Avatar',
            name: 'avatar',
          },
        ],
      },
      {
        format: "md",
        label: "Projects",
        name: "projects",
        path: "_projects",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...projectFields(),
        ],
      },
      {
        format: "md",
        label: "Services",
        name: "services",
        path: "_services",
        match: {
          include: "**/*",
        },
        fields: [
          ...serviceFields(),
          {
            type: "object",
            list: true,
            templateKey: "template",
            label: "Content",
            name: "content",
            templates: [
              {
                fields: sectionFields(),
                label: "Section",
                name: "section",
              },
            ],
          },
        ],
      },
      {
        label: 'Global',
        name: 'global',
        path: 'content/global',
        format: 'json',
        ui: {
          global: true,
        },
        fields: [
          {
            type: 'object',
            label: 'Header',
            name: 'header',
            fields: [
              {
                type: 'string',
                label: 'Name',
                name: 'name',
              },
              {
                type: 'object',
                label: 'Nav Links',
                name: 'nav',
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.label }
                  },
                  defaultItem: {
                    href: 'home',
                    label: 'Home',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Link',
                    name: 'href',
                  },
                  {
                    type: 'string',
                    label: 'Label',
                    name: 'label',
                  },
                ],
              },
            ],
          },
        ]
      },
    ],
  },
});
