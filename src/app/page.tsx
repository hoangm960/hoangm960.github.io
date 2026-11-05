import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { personalInfo, projects, skillCategories, socialLinks } from "@/lib/data";

export default function Home() {
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
