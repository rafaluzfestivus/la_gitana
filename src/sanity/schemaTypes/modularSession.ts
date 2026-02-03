import { defineField, defineType } from 'sanity'

export const modularSession = defineType({
    name: 'modularSession',
    title: 'Modular Session',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Session Title',
            type: 'string',
            description: 'Optional title for the session section',
        }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Full Width', value: 'full' },
                    { title: 'Half (Symmetrical)', value: 'half-sym' },
                    { title: 'Half (Asymmetrical Left)', value: 'half-asym-left' },
                    { title: 'Half (Asymmetrical Right)', value: 'half-asym-right' },
                    { title: 'Thirds', value: 'thirds' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'cards',
            title: 'Cards',
            type: 'array',
            of: [{ type: 'modularCard' }],
            validation: (Rule) => Rule.min(1),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'layout',
        },
        prepare({ title, subtitle }) {
            return {
                title: title || 'Untitled Session',
                subtitle: `Layout: ${subtitle}`
            }
        }
    },
})
