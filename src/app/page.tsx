import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { getPersonalInfo, getProjects, getSkillCategories, getSocialLinks } from "@/lib/db";

export const revalidate = 86400;

export default async function Home() {
  const [personalInfo, projects, skillCategories, socialLinks] = await Promise.all([
    getPersonalInfo(),
    getProjects(),
    getSkillCategories(),
    getSocialLinks(),
  ]);

  return (
    <>
      <Hero personalInfo={personalInfo} />
      <About personalInfo={personalInfo} />
      <Projects projects={projects} />
      <Skills skillCategories={skillCategories} />
      <Contact personalInfo={personalInfo} socialLinks={socialLinks} />
    </>
  );
}
