import { Template, defineConfig } from "tinacms";

export const example1: Template = {
    name: 'example1',
    label: 'Example 1',
    ui: {
        defaultItem: {
            field1: 'Hello 111',
        }
    },
    fields: [
        {
            name: 'field1',
            type: 'string',
            label: 'Field 1',
            ui: {
                component: 'text',
            }
        },
    ],
}

export const example2: Template = {
    name: 'example2',
    label: 'Example 2',
    ui: {
        defaultItem: {
            field2: 'Hello 222',
        }
    },
    fields: [
        {
            name: 'field2',
            type: 'string',
            label: 'Field 2',
            ui: {
                component: 'text',
            }
        },
    ],
}

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
    branch,
    clientId: null, // Get this from tina.io
    token: null, // Get this from tina.io

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
                name: "post",
                label: "Posts",
                path: "content/posts",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'object',
                        name: 'field1',
                        label: 'Field 1',
                        list: true,
                        ui: {
                            component: 'blocks',
                        },
                        templates: [
                            example1,
                            example2,
                        ],
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body",
                        isBody: true,
                    },
                ],
                ui: {
                    // This is an DEMO router. You can remove this to fit your site
                    router: ({ document }) => `/demo/blog/${document._sys.filename}`,
                },
            },
        ],
    },
});