export type Skill = {
    name: string;
    icon: string | null;
    bgColor?: string | null;
    textColor?: string | null;
};

export type SkillCategory = {
    _id: string;
    name: string;
    order: number;
    skills: Skill[];
};

export type Project = {
    _id: string;
    name: string;
    description: string;
    image: string | null;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
    startDate: string;
    endDate: string;
    order: number;
};

export type SocialLink = {
    platform: string;
    title: string;
    url: string;
    enabled: boolean;
    order: number;
};

export type PersonalInfo = {
    name: string;
    role: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    avatar: string;
    aboutImage: string;
    bio: string;
    stats: {
        yearsExperience: number;
        projectsCompleted: number;
        cupsOfCoffee: number;
    };
};

export const personalInfo: PersonalInfo = {
    name: "Hoang Nhat Minh",
    role: "Full-stack Developer",
    tagline:
        "A Jack-of-all-trades with ADHD eager to learn everything this little head can fit.",
    location: "District 7, HCMC",
    email: "hnminh.work@gmail.com",
    phone: "0814553357",
    avatar: "/avatar.jpg",
    aboutImage: "/avatar-alt.jpg",
    bio: "Computer Science graduate from Fulbright University Vietnam (3.45 GPA) with hands-on experience building full-stack web applications, real-time systems, and AI agent workflows using React, Next.js, TypeScript, Node.js, and Python. Experienced in designing REST and WebSocket APIs, relational and NoSQL data models, spatial-indexed canvas interfaces, and automated test suites with Jest, Vitest, Playwright, and Pytest.",
    stats: {
        yearsExperience: 6,
        projectsCompleted: 12,
        cupsOfCoffee: 500,
    },
};

export const projects: Project[] = [
    {
        _id: "proj-drawft",
        name: "Drawft",
        description:
            "Built an infinite 2D HTML5 Canvas drawing application supporting 5 Path2D shape tools, pan/zoom affine matrix transforms, group anchor scaling, center-pivot rotation, and keyboard shortcuts. Indexed shape bounding boxes in an rbush R-tree synchronized across live mutations and undo/redo snapshots, backed by 5 modular Zustand stores and validated across 17 Jest suites and 6 Playwright visual regression specs.",
        image: null,
        techStack: [
            "React 19",
            "TypeScript",
            "Vite",
            "Zustand",
            "Tailwind CSS",
            "rbush",
            "Jest",
            "Playwright",
        ],
        githubUrl: "https://github.com/hoangm960/drawft",
        liveUrl: "https://hoangm960.github.io/drawft/",
        startDate: "2025-06",
        endDate: "present",
        order: 0,
    },
    {
        _id: "proj-email-agent",
        name: "Email Agent",
        description:
            "Engineered a 3-service email automation platform (FastAPI backend, LangGraph agent server, and React TypeScript SPA) with JWT/bcrypt authentication and dual WebSocket notification streams. Implemented a stateful LangGraph workflow with human-in-the-loop interrupt approval, 18 Google Gemini ReAct tools for email drafting, calendar conflict checks, and PDF parsing, plus a local SentenceTransformers + FAISS RAG pipeline verified by 11 Pytest modules.",
        image: null,
        techStack: [
            "FastAPI",
            "LangGraph",
            "Google Gemini",
            "React",
            "TypeScript",
            "SQLite",
            "FAISS",
            "WebSockets",
            "Pytest",
        ],
        githubUrl: "https://github.com/zk-qmy/email-agent",
        liveUrl: "",
        startDate: "2026-03",
        endDate: "2026-05",
        order: 1,
    },
    {
        _id: "proj-snuggle",
        name: "Snuggle",
        description:
            "Built a full-stack pet adoption platform with a Next.js 14 App Router frontend and an Express.js TypeScript backend managing 14 Cloud Firestore collections, featuring a multi-step eKYC verification pipeline with 6-digit OTP email validation and RBAC admin review. Engineered Socket.io real-time chat and a PDFKit digital adoption contract service with dual-party e-signatures, verified across 24 Jest + Supertest and 14 Vitest test suites.",
        image: null,
        techStack: [
            "Next.js 14",
            "TypeScript",
            "Express.js",
            "Firebase",
            "Socket.io",
            "Tailwind CSS",
            "Zod",
            "PDFKit",
            "Jest",
            "Vitest",
        ],
        githubUrl: "https://github.com/hoangm960/snuggle",
        liveUrl: "",
        startDate: "2026-03",
        endDate: "2026-05",
        order: 2,
    },
    {
        _id: "proj-security",
        name: "Smart Security System",
        description:
            "Engineered a 3-node edge IoT security system in a 3-person team, connecting a Raspberry Pi AI gateway and two dual-core FreeRTOS ESP32 nodes over CoreIoT MQTT telemetry and RPC channels. Built an async Python gateway running OpenCV YuNet/SFace face recognition with 3-frame debounced intruder alerts and an aiohttp dashboard, alongside multi-tasking ESP32 C++ firmware running on-device TensorFlow Lite Micro anomaly detection.",
        image: "/projects/security.png",
        techStack: [
            "Python",
            "C++",
            "FreeRTOS",
            "Raspberry Pi",
            "ESP32",
            "OpenCV",
            "TensorFlow Lite Micro",
            "MQTT",
        ],
        githubUrl: "https://github.com/hoangminh2901/final-embeded",
        liveUrl: "",
        startDate: "2025-11",
        endDate: "2025-12",
        order: 3,
    },
    {
        _id: "proj-fire",
        name: "Fire Detection & Extinguishment System",
        description:
            "Architected a 6-task ESP32 hazard monitoring and suppression system in C++ using FreeRTOS tasks pinned across cores for concurrent DHT20/ultrasonic sensing, I2C LCD updates, and actuator control. Synchronized inter-task communication with FreeRTOS mutexes, binary semaphores, and overwrite queues, deploying an on-device 8 KB TensorFlow Lite Micro 3-class hazard model alongside a LittleFS Wi-Fi SoftAP web server.",
        image: "/projects/fire_alarm.png",
        techStack: [
            "C++",
            "FreeRTOS",
            "ESP32",
            "TensorFlow Lite Micro",
            "PlatformIO",
            "LittleFS",
        ],
        githubUrl:
            "https://github.com/hoangminh2901/midterm-embeded/tree/RTOS_Project",
        liveUrl: "",
        startDate: "2025-10",
        endDate: "2025-11",
        order: 4,
    },
    {
        _id: "proj-onion",
        name: "Onion",
        description:
            "Designed and built an interpreted Lisp- and Python-inspired S-expression programming language from scratch using an ANTLR4 grammar and a modular parse-tree visitor hierarchy in Python. Implemented lexical scoping, environment-capturing lambda closures, functional list primitives, optional static type checking, and an interactive REPL and CLI runner with AST export and 41 automated test programs.",
        image: null,
        techStack: ["Python", "ANTLR4", "PyInstaller", "GitHub Actions"],
        githubUrl: "https://github.com/hoangminh2901/onion-lang",
        liveUrl: "",
        startDate: "2025-04",
        endDate: "2025-05",
        order: 5,
    },
    {
        _id: "proj-eq-hand",
        name: "EQ Hand",
        description:
            "Led a 3-developer team to build a real-time, gesture-controlled 3-band audio equalizer desktop app in Python using PyQt6, threaded 44.1 kHz sounddevice streaming, and OpenCV + MediaPipe dual-hand tracking. Engineered a real-time DSP audio pipeline with 2nd-order SciPy Butterworth filters, a dynamic peak limiter, and a state-machine gesture controller with 3-step palm-scale calibration.",
        image: "/projects/eq_hand.png",
        techStack: [
            "Python",
            "OpenCV",
            "MediaPipe",
            "SciPy",
            "NumPy",
            "PyQt6",
            "sounddevice",
            "pydub",
            "FFmpeg",
        ],
        githubUrl: "https://github.com/hoangminh2901/eq-hand",
        liveUrl: "",
        startDate: "2025-04",
        endDate: "2025-05",
        order: 6,
    },
    {
        _id: "proj-unmixer",
        name: "Unmixer",
        description:
            "Built a full-stack color unmixing web application that decomposes target hex colors into exact watercolor pigment mixing ratios. Engineered a Python and Flask REST API using NumPy and SciPy SLSQP constrained optimization to minimize CIE76 Delta-E perceptual distance in D65 CIELAB space across subtractive CMY mixtures, paired with an interactive React 19 and Tailwind CSS client.",
        image: null,
        techStack: [
            "React 19",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "Python",
            "Flask",
            "NumPy",
            "SciPy",
        ],
        githubUrl: "https://github.com/hoangm960/unmixer",
        liveUrl: "https://unmixer.onrender.com",
        startDate: "2025-03",
        endDate: "2025-04",
        order: 7,
    },
    {
        _id: "proj-trivia",
        name: "Trivia Scoring",
        description:
            "Built a real-time multiplayer trivia and credit-wagering web platform used in live STEM Club events with 20+ concurrent participants, reducing manual score tallying time from ~10 minutes to under 30 seconds per round. Synchronized 4-stage game state transitions across 6 route views, countdown timers, and live projector scoreboards using Socket.io, Express.js REST APIs, and Firebase CI/CD.",
        image: "/projects/trivia_scoring.jpg",
        techStack: [
            "React",
            "JavaScript",
            "Socket.io",
            "Express.js",
            "Firebase",
            "GitHub Actions",
        ],
        githubUrl: "https://github.com/hoangm960/trivia_scoring",
        liveUrl: "https://trivia-scoring.web.app",
        startDate: "2024-02",
        endDate: "2025-04",
        order: 8,
    },
    {
        _id: "proj-terminal",
        name: "Terminal Emulator",
        description:
            "Built a UNIX command-line shell in C supporting interactive read-parse-execute loops, 4 built-in commands (cd, ls, help, exit), and external process execution via fork, execvp, and waitpid. Implemented multi-stage command pipelining (|) using POSIX pipe and dup2 file-descriptor redirection alongside concurrent background job execution (&) and child signal termination diagnostics.",
        image: "/projects/terminal.jpg",
        techStack: ["C", "Linux", "POSIX System Calls", "Make"],
        githubUrl: "https://github.com/hoangminh2901/terminal-emulator",
        liveUrl: "",
        startDate: "2024-11",
        endDate: "2024-12",
        order: 9,
    },
    {
        _id: "proj-sea",
        name: "S.E.A",
        description:
            "Built a cross-platform Flutter monitoring application and IoT telemetry pipeline for ocean renewable energy stations, winning 2nd Prize at the Hue Science and Engineering Fair. Engineered a 3-process Python hardware bridge interfacing with an Arduino controller at 9600 baud to stream 8 DC/AC power metrics, GPS coordinates, and fingerprint auth states to a remote MySQL database.",
        image: "/projects/sea.jpg",
        techStack: ["Flutter", "Dart", "Python", "C++ (Arduino)", "MySQL"],
        githubUrl: "https://github.com/hoangm960/Station_energy_automatic",
        liveUrl: "",
        startDate: "2021-11",
        endDate: "2022-03",
        order: 10,
    },
    {
        _id: "proj-astrea",
        name: "Astrea",
        description:
            "Led a 3-member team to build a desktop programming education and automated code-grading platform in Python and PyQt5, winning 3rd Prize at the Hue Science and Engineering Fair. Engineered an automated judging engine using subprocess pipes to compile and evaluate student Python and Free Pascal submissions with 2-second execution timeouts, stdout diffing, and encrypted MySQL virtual classrooms.",
        image: "/projects/astrea.jpg",
        techStack: ["Python", "PyQt5", "MySQL", "Cryptography"],
        githubUrl: "https://github.com/hoangm960/Astraea",
        liveUrl: "",
        startDate: "2020-09",
        endDate: "2021-12",
        order: 11,
    },
];

export const skillCategories: SkillCategory[] = [
    {
        _id: "cat-languages",
        name: "Languages",
        order: 0,
        skills: [
            { name: "Python", icon: "logos:python" },
            { name: "TypeScript", icon: "logos:typescript-icon" },
            { name: "JavaScript", icon: "logos:javascript" },
            { name: "C++", icon: "logos:c-plusplus" },
            { name: "C", icon: "logos:c" },
            { name: "Java", icon: "logos:java" },
            { name: "SQL", icon: "vscode-icons:file-type-sql" },
            { name: "Dart", icon: "logos:dart" },
        ],
    },
    {
        _id: "cat-frontend",
        name: "Frontend",
        order: 1,
        skills: [
            { name: "React", icon: "logos:react" },
            { name: "Next.js", icon: "logos:nextjs-icon" },
            { name: "Zustand", icon: "devicon:zustand" },
            { name: "TanStack Query", icon: "logos:react-query-icon" },
            { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
            { name: "Three.js", icon: "skill-icons:threejs-dark" },
            {
                name: "HTML5 Canvas",
                icon: null,
                bgColor: "#ea580c",
                textColor: "#ffedd5",
            },
            { name: "Framer Motion", icon: "devicon:framermotion" },
            {
                name: "Recharts",
                icon: null,
                bgColor: "#0284c7",
                textColor: "#e0f2fe",
            },
            { name: "SolidJS", icon: "logos:solidjs-icon" },
            { name: "Flutter", icon: "logos:flutter" },
            { name: "HTML", icon: "logos:html-5" },
            { name: "CSS", icon: "logos:css-3" },
            { name: "Zod", icon: "logos:zod" },
        ],
    },
    {
        _id: "cat-backend",
        name: "Backend",
        order: 2,
        skills: [
            { name: "Node.js", icon: "logos:nodejs-icon" },
            { name: "Express.js", icon: "skill-icons:expressjs-light" },
            { name: "FastAPI", icon: "logos:fastapi-icon" },
            { name: "Flask", icon: "skill-icons:flask-light" },
            {
                name: "LangGraph",
                icon: null,
                bgColor: "#1c3c3c",
                textColor: "#5eead4",
            },
            { name: "Socket.io", icon: "devicon:socketio" },
            { name: "WebSockets", icon: "logos:websocket" },
            {
                name: "REST APIs",
                icon: null,
                bgColor: "#0369a1",
                textColor: "#e0f2fe",
            },
            {
                name: "PDFKit",
                icon: null,
                bgColor: "#dc2626",
                textColor: "#fee2e2",
            },
        ],
    },
    {
        _id: "cat-database",
        name: "Database",
        order: 3,
        skills: [
            { name: "MySQL", icon: "logos:mysql-icon" },
            { name: "MongoDB", icon: "logos:mongodb-icon" },
            { name: "SQLite", icon: "devicon:sqlite" },
            { name: "Firebase / Firestore", icon: "logos:firebase-icon" },
            { name: "SQLAlchemy", icon: "devicon:sqlalchemy" },
            {
                name: "FAISS",
                icon: null,
                bgColor: "#1d4ed8",
                textColor: "#dbeafe",
            },
        ],
    },
    {
        _id: "cat-embedded",
        name: "System & Embedded",
        order: 4,
        skills: [
            { name: "Linux", icon: "logos:linux-tux" },
            {
                name: "FreeRTOS",
                icon: null,
                bgColor: "#e7000b",
                textColor: "#ffe2e2",
            },
            {
                name: "ESP32",
                icon: null,
                bgColor: "#009966",
                textColor: "#d0fae5",
            },
            { name: "Raspberry Pi", icon: "logos:raspberry-pi" },
            { name: "Arduino", icon: "logos:arduino" },
            {
                name: "MQTT",
                icon: null,
                bgColor: "#660066",
                textColor: "#f3e8ff",
            },
            { name: "OpenCV", icon: "logos:opencv" },
            {
                name: "MediaPipe",
                icon: null,
                bgColor: "#00897b",
                textColor: "#ccfbf1",
            },
            { name: "TensorFlow Lite Micro", icon: "logos:tensorflow" },
            { name: "SciPy / NumPy", icon: "logos:numpy" },
        ],
    },
    {
        _id: "cat-tools",
        name: "Tools & Development",
        order: 5,
        skills: [
            { name: "Git", icon: "logos:git-icon" },
            { name: "GitHub Actions", icon: "logos:github-actions" },
            { name: "Vite", icon: "logos:vitejs" },
            { name: "Jest", icon: "logos:jest" },
            { name: "Playwright", icon: "logos:playwright" },
            { name: "Vitest", icon: "logos:vitest" },
            { name: "Pytest", icon: "devicon:pytest" },
            {
                name: "Supertest",
                icon: null,
                bgColor: "#4f46e5",
                textColor: "#e0e7ff",
            },
            { name: "ANTLR4", icon: "vscode-icons:file-type-antlr" },
            { name: "PlatformIO", icon: "vscode-icons:file-type-platformio" },
            { name: "Vercel", icon: "logos:vercel-icon" },
            { name: "npm", icon: "logos:npm-icon" },
            { name: "Yarn", icon: "logos:yarn" },
            { name: "Bun", icon: "logos:bun" },
        ],
    },
];

export const socialLinks: SocialLink[] = [
    {
        platform: "github",
        title: "Github",
        url: "https://github.com/hoangm960",
        enabled: true,
        order: 0,
    },
    {
        platform: "linkedin",
        title: "Linkedin",
        url: "https://www.linkedin.com/in/minh-hoang-tech/",
        enabled: true,
        order: 1,
    },
    {
        platform: "facebook",
        title: "Facebook",
        url: "https://www.facebook.com/daylaminhne2901/",
        enabled: true,
        order: 2,
    },
];
