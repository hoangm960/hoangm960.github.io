import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    }),
  ],
})
