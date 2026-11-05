import { PortfolioLayout } from "@/components/PortfolioLayout";
import {
    personalInfo,
    projects,
    skillCategories,
    socialLinks,
} from "@/lib/data";

export default function Home() {
    return (
        <PortfolioLayout
            personalInfo={personalInfo}
            projects={projects}
            skillCategories={skillCategories}
            socialLinks={socialLinks}
        />
    );
}
