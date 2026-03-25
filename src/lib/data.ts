import { asset } from "./assets";

export const personalInfo = {
    name: "Hoang Nhat Minh",
    role: "Full-stack Developer",
    tagline:
        "A Jack-of-all-trades ADHD eager to learn everything this little head can fit.",
    location: "District 7, HCMC",
    email: "hnminh.work@gmail.com",
    phone: "0814553357",
    avatar: asset("/avatar.jpg"),
    aboutImage: asset("/avatar-alt.jpg"),
    bio: "Computer Science senior with hands-on experience building full-stack web applications using React, TypeScript, and Node.js. Focused on developing performant, user-centric systems with real-world impact, including event-scale scoring platforms and interactive canvas tools. Strong foundation in data structures, backend integration, and collaborative development.",
    stats: {
        yearsExperience: 6,
        projectsCompleted: 9,
        cupsOfCoffee: 500,
    },
};

export const projects = [
    {
        id: 0,
        name: "Drawft",
        description:
            "Developed an infinite canvas drawing tool supporting real-time shape rendering and interaction. Implemented spatial indexing using rbush, improving rendering and lookup performance for large datasets. Designed scalable frontend architecture for handling complex drawing states and user interactions.",
        image: "",
        techStack: ["React", "TypeScript", "Vite", "Rough.js", "rbush"],
        githubUrl: "https://github.com/hoangm960/drawft",
        liveUrl: "https://hoangm960.github.io/drawft/",
        period: "June 2025 – Present",
    },
    {
        id: 1,
        name: "Smart Security System",
        description:
            "Engineered an edge AI gateway on a Raspberry Pi using Python and OpenCV (YuNet, SFace) to perform real-time face recognition and publish semantic intrusion events via MQTT. Developed actuator control firmware on an ESP32 using C++ and FreeRTOS, implementing mutexes to safely synchronize concurrent MQTT remote procedure calls (RPC) and physical hardware updates. Built asynchronous local web servers on both edge devices, exposing RESTful API endpoints to provide real-time system visualization and manual actuator overrides during cloud connectivity drops. Collaborated in a 3-person team to integrate decentralized IoT nodes with a centralized CoreIoT decision engine for a comprehensive, event-driven security architecture.",
        image: asset("/projects/security.png"),
        techStack: [
            "Python",
            "C++",
            "FreeRTOS",
            "Raspberry Pi",
            "ESP32",
            "OpenCV",
            "MQTT",
        ],
        githubUrl: "https://github.com/hoangm960/final-embeded/",
        liveUrl: "",
        period: "November 2025 – December 2025",
    },
    {
        id: 2,
        name: "Smart Fire Safety and Environmental Monitoring System",
        description:
            "Engineered a real-time fire safety system on an ESP32 microcontroller, utilizing FreeRTOS to manage concurrent sensor monitoring and automated suppression tasks. Synchronized critical mechanisms by deploying semaphores, preventing race conditions between environmental data acquisition and immediate actuator deployment.",
        image: asset("/projects/fire_alarm.png"),
        techStack: ["C++", "FreeRTOS", "ESP32"],
        githubUrl:
            "https://github.com/hoangminh2901/midterm-embeded/tree/RTOS_Project",
        liveUrl: "",
        period: "October – November 2025",
    },
    {
        id: 3,
        name: "Onion",
        description:
            "Created a fully functional programming language from scratch inspired by Lisp and Python. Built lexer, parser, and interpreter using ANTLR4. Final project for Language Paradigm class.",
        image: "",
        techStack: ["ANTLR4", "Python"],
        githubUrl: "https://github.com/hoangminh2901/onion-lang",
        liveUrl: "",
        period: "April – May 2025",
    },
    {
        id: 4,
        name: "EQ Hand",
        description:
            "Led a team of 3 developers in architecting a real-time, hand-controlled audio application that maps multi-hand spatial gestures to dynamic volume and frequency adjustments. Implemented a state-machine driven control flow to manage complex initialization sequences, gesture locks, and seamless mode transitions.",
        image: asset("/projects/eq_hand.png"),
        techStack: ["Python", "FFmpeg", "pydub", "Computer Vision"],
        githubUrl: "https://github.com/hoangminh2901/eq-hand",
        liveUrl: "",
        period: "April – May 2025",
    },
    {
        id: 5,
        name: "Trivia Scoring",
        description:
            "Built a full-stack scoring system used in live events (~20+ participants per session). Reduced manual scoring time from ~10 minutes to under 30 seconds per round. Designed real-time data flow between frontend and backend for rapid score updates.",
        image: asset("/projects/trivia_scoring.jpg"),
        techStack: ["React", "Express.js", "Firebase"],
        githubUrl: "https://github.com/hoangm960/trivia_scoring",
        liveUrl: "https://trivia-scoring.web.app",
        period: "February 2024 – April 2025",
    },
    {
        id: 6,
        name: "Terminal Emulator",
        description:
            "Built a cross-platform terminal emulator from scratch in C, implementing a high-performance, non-blocking rendering loop. Resolved complex UTF-8 and double-width character rendering constraints. Final project for Operating System class.",
        image: asset("/projects/terminal.jpg"),
        techStack: ["C"],
        githubUrl: "https://github.com/hoangminh2901/terminal-emulator",
        liveUrl: "",
        period: "November – December 2024",
    },
    {
        id: 7,
        name: "S.E.A",
        description:
            "A desktop application for monitoring renewable energy from the ocean. Set up remote server infrastructure for database storing energy production measurements. Won second place in Hue's Engineering and Science Fair.",
        image: asset("/projects/sea.jpg"),
        techStack: ["Flutter", "Windows Server"],
        githubUrl: "https://github.com/hoangm960/Station_energy_automatic",
        liveUrl: "",
        period: "November 2021 – March 2022",
    },
    {
        id: 8,
        name: "Astrea",
        description:
            "Developed a desktop application for teaching programming concepts to students. Led a 3-member team to deliver a working product for live demo. Awarded 3rd Prize at Hue Science & Engineering Fair.",
        image: asset("/projects/astrea.jpg"),
        techStack: ["Python", "PyQt5"],
        githubUrl: "https://github.com/hoangm960/Astraea",
        liveUrl: "",
        period: "September 2020 – December 2021",
    },
];

export type Skill = {
    name: string;
    icon: string | null;
};

export type SkillCategory = {
    id: number;
    name: string;
    skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
    {
        id: 1,
        name: "Languages",
        skills: [
            { name: "Python", icon: "logos:python" },
            { name: "JavaScript", icon: "logos:javascript" },
            { name: "TypeScript", icon: "logos:typescript-icon" },
            { name: "Java", icon: "logos:java" },
            { name: "C++", icon: "logos:c-plusplus" },
        ],
    },
    {
        id: 2,
        name: "Frontend",
        skills: [
            { name: "React", icon: "logos:react" },
            { name: "SolidJS", icon: "logos:solidjs-icon" },
            { name: "HTML", icon: "logos:html-5" },
            { name: "CSS", icon: "logos:css-3" },
            { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
            { name: "Next.js", icon: "logos:nextjs-icon" },
        ],
    },
    {
        id: 3,
        name: "Backend",
        skills: [
            { name: "Node.js", icon: "logos:nodejs-icon" },
            { name: "Express.js", icon: "skill-icons:expressjs-light" },
            { name: "Flask", icon: "logos:flask" },
        ],
    },
    {
        id: 4,
        name: "Database",
        skills: [
            { name: "MySQL", icon: "logos:mysql-icon" },
            { name: "MongoDB", icon: "logos:mongodb-icon" },
            { name: "SQLite", icon: "devicon:sqlite" },
            { name: "Firebase", icon: "logos:firebase-icon" },
            { name: "Postgresql", icon: "logos:postgresql" },
        ],
    },
    {
        id: 5,
        name: "Tools & Development",
        skills: [
            { name: "Git", icon: "logos:git-icon" },
            { name: "GitHub", icon: "logos:github-icon" },
            { name: "Vite", icon: "logos:vitejs" },
            { name: "Vercel", icon: "logos:vercel-icon" },
            { name: "npm", icon: "logos:npm" },
            { name: "Yarn", icon: "logos:yarn" },
            { name: "Bun", icon: "logos:bun" },
        ],
    },
    {
        id: 6,
        name: "Embedded Hardware",
        skills: [
            { name: "Arch Linux", icon: "logos:archlinux" },
            { name: "ESP32", icon: null },
            { name: "Arduino", icon: "logos:arduino" },
            { name: "FreeRTOS", icon: null },
        ],
    },
    {
        id: 7,
        name: "Scraping & Automation",
        skills: [
            { name: "Playwright", icon: "logos:playwright" },
            { name: "Selenium", icon: "logos:selenium" },
            { name: "Beautiful Soup", icon: null },
        ],
    },
];

export const skillFallbacks: Record<string, { bg: string; text: string }> = {
    TailwindCSS: {
        bg: "bg-sky-100 dark:bg-sky-500/20",
        text: "text-sky-600 dark:text-sky-400",
    },
    Flask: {
        bg: "bg-neutral-100 dark:bg-neutral-500/20",
        text: "text-neutral-600 dark:text-neutral-300",
    },
    ESP32: {
        bg: "bg-emerald-100 dark:bg-emerald-500/20",
        text: "text-emerald-600 dark:text-emerald-400",
    },
    FreeRTOS: {
        bg: "bg-red-100 dark:bg-red-500/20",
        text: "text-red-600 dark:text-red-400",
    },
    "Beautiful Soup": {
        bg: "bg-yellow-100 dark:bg-yellow-500/20",
        text: "text-yellow-700 dark:text-yellow-400",
    },
};

export const socialLinks = {
    github: "https://github.com/hoangm960",
    linkedin: "https://linkedin.com/in/minh-hoang-tech",
    facebook: "https://www.facebook.com/daylaminhne2901",
};
