import { defineField, defineType } from 'sanity'

export const modularCard = defineType({
    name: 'modularCard',
    title: 'Modular Card',
    type: 'object',
    fields: [
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'image' },
                    { title: 'Video', value: 'video' },
                    { title: 'Text', value: 'text' },
                    { title: 'Banner', value: 'banner' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            hidden: ({ parent }) => parent?.type === 'text' || parent?.type === 'video',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            hidden: ({ parent }) => parent?.type !== 'video',
        }),
        defineField({
            name: 'link',
            title: 'Link URL',
            type: 'string',
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
        }),
        defineField({
            name: 'overlay',
            title: 'Overlay Text',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'height',
            title: 'Height',
            type: 'string',
            options: {
                list: [
                    { title: 'Small (~250px)', value: 'small' },
                    { title: 'Medium (~400px)', value: 'medium' },
                    { title: 'Large (~600px)', value: 'large' },
                    { title: 'Extra Large (~800px)', value: 'xl' },
                    { title: 'Full Screen (100vh)', value: 'screen' },
                ],
            },
            initialValue: 'medium',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'type',
            media: 'image',
        },
    },
})
