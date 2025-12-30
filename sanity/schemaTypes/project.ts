import { defineField, defineType } from "sanity";

export default defineType({
    name: "project",
    title: "Project",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        }),

        defineField({
            name: "category",
            title: "Category",
            type: "string",
        }),

        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true, // can pick focal point that wont be cropped out
            },
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }], //rich text blocks and images
        }),
        defineField({
            name: "featured",
            title: "Feature on Homepage?",
            type: "boolean",
            description: "Mark as featured to show on homepage",
            initialValue: false,
        }),
        defineField({
            name: "Purchasable",
            title: "Mark item as Purchasable?",
            type: "boolean",
            description: "Mark as purchasable to display on shop page",
            initialValue: false,
        }),
    ],
});