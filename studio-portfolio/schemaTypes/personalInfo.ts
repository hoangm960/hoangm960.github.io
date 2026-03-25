import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'personalInfo',
  title: 'Personal Info',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        { name: 'yearsExperience', title: 'Years Experience', type: 'number' },
        { name: 'projectsCompleted', title: 'Projects Completed', type: 'number' },
        { name: 'cupsOfCoffee', title: 'Cups of Coffee', type: 'number' },
      ],
    }),
  ],
})
