import dotenv from 'dotenv'
import path from 'path'

// Load .env file explicitly
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

import { createClient } from '@sanity/client'
import { personalInfo, projects, skillCategories, socialLinks, type Skill, type SkillCategory } from '../../src/lib/data'

type SkillCategoryType = SkillCategory & { skills: Skill[] }

const client = createClient({
  projectId: 'z1k5z0p3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

async function migrate() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('\n❌ Error: SANITY_WRITE_TOKEN not found in environment')
    console.log('   Make sure .env file exists in studio-portfolio/ directory')
    console.log('   With content: SANITY_WRITE_TOKEN=your_token_here')
    process.exit(1)
  }
  
  console.log('Starting migration...\n')

  // 1. Create personalInfo (skip if exists)
  console.log('1. Personal Info')
  const existingPersonalInfo = await client.fetch(`*[_type == "personalInfo"][0]`)
  if (!existingPersonalInfo) {
    const personalInfoDoc = {
      _type: 'personalInfo',
      name: personalInfo.name,
      role: personalInfo.role,
      tagline: personalInfo.tagline,
      location: personalInfo.location,
      email: personalInfo.email,
      phone: personalInfo.phone,
      bio: personalInfo.bio,
      stats: personalInfo.stats,
    }
    const result = await client.create(personalInfoDoc)
    console.log('   ✓ Created:', result._id)
  } else {
    console.log('   - Already exists, skipping')
  }

  // 2. Create projects (skip if name exists)
  console.log('\n2. Projects')
  const existingProjectNames = await client.fetch(`*[_type == "project"].name`)
  let projectsCreated = 0
  for (const project of projects) {
    if (!existingProjectNames.includes(project.name)) {
      const projectDoc = {
        _type: 'project',
        name: project.name,
        description: project.description,
        image: null,
        techStack: project.techStack,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl || null,
        period: project.period,
      }
      const result = await client.create(projectDoc)
      console.log('   ✓ Created:', project.name)
      projectsCreated++
    } else {
      console.log('   - Already exists:', project.name)
    }
  }
  if (projectsCreated === 0) {
    console.log('   (all projects already exist)')
  }

  // 3. Create skillCategories (skip if name exists)
  console.log('\n3. Skill Categories')
  const existingCategoryNames = await client.fetch(`*[_type == "skillCategory"].name`)
  let categoriesCreated = 0
  for (const category of skillCategories as SkillCategoryType[]) {
    if (!existingCategoryNames.includes(category.name)) {
      const categoryDoc = {
        _type: 'skillCategory',
        name: category.name,
        skills: category.skills.map((skill: Skill) => ({
          _type: 'object',
          name: skill.name,
          icon: skill.icon,
        })),
      }
      const result = await client.create(categoryDoc)
      console.log('   ✓ Created:', category.name)
      categoriesCreated++
    } else {
      console.log('   - Already exists:', category.name)
    }
  }
  if (categoriesCreated === 0) {
    console.log('   (all categories already exist)')
  }

  // 4. Create socialLinks (skip if platform exists)
  console.log('\n4. Social Links')
  const existingPlatforms = await client.fetch(`*[_type == "socialLink"].platform`)
  const socialPlatforms = [
    { platform: 'github', url: 'https://github.com/hoangm960' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/minh-hoang-tech' },
    { platform: 'facebook', url: 'https://www.facebook.com/daylaminhne2901' },
  ]
  let socialsCreated = 0
  for (const social of socialPlatforms) {
    if (!existingPlatforms.includes(social.platform)) {
      const socialDoc = {
        _type: 'socialLink',
        platform: social.platform,
        url: social.url,
        enabled: true,
      }
      const result = await client.create(socialDoc)
      console.log('   ✓ Created:', social.platform)
      socialsCreated++
    } else {
      console.log('   - Already exists:', social.platform)
    }
  }
  if (socialsCreated === 0) {
    console.log('   (all social links already exist)')
  }

  console.log('\n✅ Migration complete!')
  console.log('\n⚠️  Note: Images need to be uploaded manually in Sanity Studio:')
  console.log('   - avatar.jpg → personalInfo.avatar')
  console.log('   - avatar-alt.jpg → personalInfo.aboutImage')
  console.log('   - Project images → respective project.image fields')
}

migrate().catch(console.error)
