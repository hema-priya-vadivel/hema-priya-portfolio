/**
 * Site-wide config and content. Public contact links default to the values
 * below and can be overridden via NEXT_PUBLIC_* env vars.
 */
export const site = {
  name: "Hema Priya",
  fullName: "Hema Priya V",
  jobTitle: "Quality Engineer II (Automation)",
  company: "Juspay",
  location: "Bangalore, India",
  title: "Hema Priya | Quality Engineer II · SDET II",
  role: "Quality Engineer II · SDET II · Automation Engineering",
  description:
    "Quality Engineer II / SDET II specializing in automation framework design, web and mobile UI automation, Playwright, Appium, CI/CD and AI-assisted quality engineering.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hemapriyav2002@gmail.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/hema-priya-v-74926318b",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/hema-priya-vadivel",
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/hema_priya_v",
  linktree: process.env.NEXT_PUBLIC_LINKTREE_URL || "https://linktr.ee/hemapriyav",
  /** Google Drive link to the resume (access-controlled in Drive). Buttons are hidden if empty. */
  resumeDriveUrl:
    process.env.NEXT_PUBLIC_RESUME_DRIVE_URL ||
    "https://drive.google.com/file/d/12fCs246s-LR2b089HL40m-eRa8XsMqoE/view?usp=drive_link",
} as const;

/** Availability messaging shown as status pills. */
export const availability = {
  hero: "Exploring Senior SDET / Quality Engineering opportunities",
  contact: "Open to new opportunities",
} as const;

export const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/#skills", label: "Skills" },
  { href: "/#ai-qa", label: "AI × QA" },
  { href: "/#contact", label: "Contact" },
] as const;

export const metrics = [
  { value: "3+", label: "Years", detail: "Quality Engineering" },
  { value: "15+", label: "Modules", detail: "Frontend modules accelerated" },
  { value: "5×", label: "Faster", detail: "Regression cycle" },
  { value: "60–70%", label: "Increase", detail: "Automation coverage" },
] as const;

export const about = [
  "I am a Quality Engineer II / SDET II focused on automation framework design, UI automation, CI/CD, and AI-assisted quality engineering.",
  "My work spans reusable, component-based frameworks across Playwright, Selenium, and Appium, with end-to-end testing across UI and API layers. I focus on building automation that scales beyond individual test cases — making it easier to maintain, debug, run, and adopt across teams.",
  "I enjoy solving quality problems through engineering — from framework architecture and test reliability to developer feedback and continuous quality.",
];

export const leadership = [
  {
    value: "5",
    label: "engineers mentored",
    detail: "In adopting AI-assisted test development, alongside leading the MCP-based automation framework (2026).",
  },
  {
    value: "4",
    label: "cross-functional teams",
    detail: "Standardized quality engineering workflows, automation frameworks and best practices across them (2026).",
  },
  {
    value: "+30%",
    label: "test coverage",
    detail: "Contributed to by mentoring teammates on automation best practices and framework adoption (2025).",
  },
  {
    value: "5+",
    label: "internal teams",
    detail:
      "Adopted the component-level Selenium + Python POM framework I designed (2024). Now architecting and leading the Playwright + Python AI-assisted framework, adopted across 3 teams (2026).",
  },
] as const;

export const principles = [
  {
    title: "I solve the pattern, not the symptom.",
    body: "When I see a repeated problem, I improve the right abstraction instead of adding another workaround.",
  },
  {
    title: "I model intent, not implementation.",
    body: "I want my tests to read like the product, not like a collection of selectors.",
  },
  {
    title: "I keep failures honest.",
    body: "I don't hide problems just to make the pipeline green.",
  },
  {
    title: "I wait for conditions, not time.",
    body: "I build automation around application state, not arbitrary sleeps.",
  },
  {
    title: "I separate concerns deliberately.",
    body: "I keep framework logic, components, test data, configuration, and reporting where they belong.",
  },
  {
    title: "I let AI propose; I make the decision.",
    body: "I use AI to accelerate engineering while keeping human judgment in the loop.",
  },
  {
    title: "I follow the evidence.",
    body: "When something breaks, I investigate the actual behaviour before reaching for a workaround.",
  },
  {
    title: "I document the why.",
    body: "I want the next engineer to understand the reasoning without having to rediscover it.",
  },
  {
    title: "I turn friction into infrastructure.",
    body: "When I encounter the same pain repeatedly, I look for a way to improve the system itself.",
  },
  {
    title: "I make quality visible.",
    body: "I want automation to communicate more than pass or fail—what happened, what matters, and what needs attention.",
  },
] as const;

export const exploring = [
  "Scalable Automation Architecture",
  "Framework & Test Infrastructure",
  "AI-Assisted Quality Engineering",
  "API & Service-Level Testing",
  "Non-Functional Testing — Performance & Load",
];

export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  location?: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "Jan 2026 — Present",
    title: "Quality Engineer II",
    company: "Juspay",
    location: "Bangalore, India",
    summary: "MCP-based AI-assisted automation framework and a PR-driven quality gate.",
    highlights: [
      "Architected and led an MCP-based automation framework using Python and Playwright, enabling AI-generated test automation, self-healing execution, adaptive DOM extraction and AI-assisted validation.",
      "Designed and integrated a PR-driven Jenkins pipeline that analyzes code changes to identify impacted modules and runs targeted Playwright suites, establishing a shift-left quality gate.",
      "Engineered a 5× reduction in regression cycle time and increased automation coverage by 60–70% through reusable component-based architecture and parallel execution.",
      "Accelerated automation delivery across 15+ frontend modules within a month using AI-assisted workflows, with cross-browser testing on Chromium, Firefox and WebKit.",
      "Standardized quality engineering workflows across 4 cross-functional teams and mentored 5 engineers in AI-assisted test development.",
      "Designed pre-commit auto-fixers and automated validation pipelines to detect and correct deviations in AI-generated automation code.",
    ],
    tech: ["Python", "Playwright", "MCP", "Jenkins", "Chromium", "Firefox", "WebKit"],
  },
  {
    period: "Jan 2025 — Dec 2025",
    title: "Quality Engineer II",
    company: "Juspay",
    location: "Bangalore, India",
    summary: "Mobile and web automation with Dockerized CI/CD.",
    highlights: [
      "Built a scalable Selenium + Appium automation framework using Pytest, with Dockerized CI/CD integration, enabling isolated test execution and early detection of 80% of critical issues while delivering 5+ modules within 2 weeks.",
      "Led end-to-end testing across native and webview flows for iOS and Android — transaction analytics, refunds, login, passkey auto-trigger and the LLM-powered Genius assistant (response correctness, contextual relevance, edge cases). The platform is used by 100+ merchants.",
      "Automated secure 2FA OTP verification using pyotp with Selenium for end-to-end login flows.",
      "Mentored team members in automation best practices and framework adoption, contributing to a 30% increase in test coverage and improved release stability.",
    ],
    tech: ["Selenium", "Appium", "Pytest", "Docker", "pyotp"],
  },
  {
    period: "Jan 2024 — Dec 2024",
    title: "Quality Engineer I",
    company: "Juspay",
    location: "Bangalore, India",
    summary: "Component-level framework, REST API validation and DevTools-based tracing.",
    highlights: [
      "Designed a scalable, component-level Selenium + Python POM automation framework, adopted by 5+ internal teams.",
      "Optimized test execution by 70% via component-level priority handling and code de-duplication.",
      "Built a reusable flow architecture for multi-role testing (admin, tenant, reseller, merchant), cutting manual and automation effort by 80%.",
      "Validated REST APIs for response accuracy, latency and schema compliance across analytics and transactional endpoints, supporting performance optimization initiatives that reduced dashboard load times by 95%.",
      "Automated Chrome DevTools (Console and Network) validations for deep frontend + API issue tracing without backend dependency.",
    ],
    tech: ["Selenium", "Python", "POM", "REST APIs", "Chrome DevTools"],
  },
  {
    period: "Jan 2023 — Dec 2023",
    title: "Quality Engineer",
    company: "Juspay",
    location: "Bangalore, India",
    summary: "End-to-end integration testing of analytics dashboards.",
    highlights: [
      "Performed E2E integration testing on analytics dashboards (transactions, refunds, mandates, outages) used by 500+ merchants, reducing bug impact and escalations by 95%+.",
      "Built reusable, modular automation components for analytics dashboards, reducing manual effort by 70%, with time comparisons, dimension-based views and error-rate trends that help stakeholders spot success-rate drops.",
    ],
    tech: ["Integration testing", "E2E testing", "Automation components"],
  },
];

/** Internships and early roles, per the LinkedIn profile (most recent first). */
export const internships: ExperienceItem[] = [
  {
    period: "Sep 2022 — Jan 2023",
    title: "SAP Sergeant — Technical FTF Consultant",
    company: "Kaar Technologies",
    location: "Chennai, Tamil Nadu, India",
    summary: "Full-stack internship before moving into quality engineering.",
    highlights: [
      "Built a full-stack CRUD web application using AngularJS and Flask (Python) with a responsive Angular Material UI, improving user workflow efficiency by 60%.",
      "Integrated a time-series forecasting model using Facebook Prophet (95%+ accuracy), with insights visualized in Power BI.",
    ],
    tech: ["AngularJS", "Flask", "Facebook Prophet", "Power BI"],
  },
  {
    period: "Mar 2022 — Jul 2022",
    title: "Google Cloud Ready Facilitator",
    company: "Google Cloud Community India",
    summary: "Guided students through hands-on Google Cloud Platform learning.",
    highlights: [
      "Assisted over 300 students in learning Google Cloud Platform through hands-on guidance with tools like Kubernetes, Docker and Jenkins.",
      "Shared practical insights on how cloud computing integrates with AI, machine learning, app development and web development.",
    ],
    tech: ["GCP", "Kubernetes", "Docker", "Jenkins"],
  },
  {
    period: "Nov 2021 — Apr 2022",
    title: "Content Writer",
    company: "Your Friend",
    summary: "Content development and marketing internship.",
    highlights: [],
    tech: ["Content Development", "Content Marketing", "Creative Content Creation", "Canva"],
  },
  {
    period: "Feb 2022 — Mar 2022",
    title: "Web Developer",
    company: "LetsGrowMore",
    summary: "Web development internship.",
    highlights: [],
    tech: ["HTML", "CSS", "JavaScript", "React.js"],
  },
  {
    period: "Aug 2021 — Oct 2021",
    title: "Human Resources (HR)",
    company: "Career Dreams Educations",
    summary: "Hiring and corporate communications internship.",
    highlights: [],
    tech: [
      "Corporate Communications",
      "Hiring Process",
      "Presentation Skills",
      "Teamwork",
      "Leadership",
      "Microsoft Office",
    ],
  },
  {
    period: "Apr 2021 — Jun 2021",
    title: "Internshala Student Partner ’22",
    company: "Internshala",
    summary: "Student community and campus outreach role.",
    highlights: [],
    tech: ["Leadership", "Public Speaking", "Presentation Skills", "Website Promotion", "Community Promotion"],
  },
];

export interface WorkItem {
  index: string;
  title: string;
  summary: string;
  flow?: string;
  highlights: string[];
  tags: string[];
}

export const work: WorkItem[] = [
  {
    index: "01",
    title: "MCP-Based Automation Framework",
    summary:
      "An AI-assisted Python + Playwright framework with reusable component-based architecture and parallel execution.",
    highlights: [
      "AI-generated test automation, self-healing execution, adaptive DOM extraction and AI-assisted validation.",
      "5× reduction in regression cycle time and 60–70% higher automation coverage.",
      "Cross-browser testing on Chromium, Firefox and WebKit.",
      "Accelerated delivery across 15+ frontend modules within a month.",
    ],
    tags: ["Python", "Playwright", "MCP", "AI-generated Tests", "Self-healing"],
  },
  {
    index: "02",
    title: "PR-Driven Quality Gate",
    summary:
      "A Jenkins pipeline that analyzes code changes, identifies impacted modules and runs targeted suites.",
    flow: "Code change → Impacted modules → Targeted tests",
    highlights: [
      "Targeted Playwright suites triggered automatically from pull requests.",
      "Shift-left gate for early defect detection, faster developer feedback and efficient regression validation.",
      "Pre-commit auto-fixers and validation pipelines that detect and correct deviations in AI-generated automation code.",
    ],
    tags: ["Jenkins", "CI/CD", "Playwright", "Shift Left"],
  },
  {
    index: "03",
    title: "Mobile & Cross-Platform Automation",
    summary:
      "Selenium + Appium + Pytest framework for native and webview flows on iOS and Android, with Dockerized CI/CD.",
    highlights: [
      "Isolated test execution and early detection of 80% of critical issues; 5+ modules delivered within 2 weeks.",
      "End-to-end coverage of transaction analytics, refunds, login, passkey auto-trigger and the LLM-powered Genius assistant.",
      "Secure 2FA OTP automation with pyotp.",
    ],
    tags: ["Selenium", "Appium", "Pytest", "Docker", "XCUITest", "UiAutomator"],
  },
  {
    index: "04",
    title: "Component-Level POM Framework",
    summary:
      "A scalable Selenium + Python page-object framework built around reusable components and flows.",
    highlights: [
      "Adopted by 5+ internal teams.",
      "70% faster test execution through component-level priority handling and de-duplication.",
      "Reusable multi-role flows (admin, tenant, reseller, merchant) cut manual and automation effort by 80%.",
    ],
    tags: ["Selenium", "Python", "POM", "Reusability"],
  },
  {
    index: "05",
    title: "Analytics & API Validation",
    summary:
      "Validation across UI, REST APIs and browser DevTools for analytics dashboards and transactional endpoints.",
    highlights: [
      "REST API checks for response accuracy, latency and schema compliance, supporting a 95% reduction in dashboard load times.",
      "Chrome DevTools (Console and Network) automation for frontend + API issue tracing without backend dependency.",
      "E2E integration testing of dashboards used by 500+ merchants, reducing bug impact and escalations by 95%+.",
      "Reusable, modular automation components that reduced manual effort by 70%.",
    ],
    tags: ["REST API", "Chrome DevTools", "E2E Testing", "Reusable Components"],
  },
];

export interface SkillGroup {
  group: string;
  items: string[];
}

/** Main skill groups, shown as cards. */
export const coreSkills: SkillGroup[] = [
  {
    group: "Automation Testing",
    items: ["Playwright (Python)", "Selenium (Python)", "Pytest", "Appium (Android - UiAutomator, iOS - XCUITest)"],
  },
  {
    group: "Languages",
    items: ["Python (automation)", "Java (problem solving)", "C"],
  },
  {
    group: "AI",
    items: ["AI-generated Test Automation", "Self-healing Automation", "Failure Analysis", "MCP"],
  },
  {
    group: "DevOps / Cloud",
    items: ["Jenkins", "Docker", "Kubernetes", "CI/CD", "Google Cloud Platform (GCP)"],
  },
  {
    group: "Testing Methodologies",
    items: ["SDLC", "STLC", "Functional", "Integration", "Regression", "Smoke", "Exploratory", "White/Black Box"],
  },
  {
    group: "Leadership",
    items: ["Technical Leadership", "Mentorship", "Cross-functional Collaboration", "Framework Adoption"],
  },
];

/** Supporting tools, shown compactly. */
export const moreSkills: SkillGroup[] = [
  { group: "Databases", items: ["MySQL"] },
  { group: "Monitoring", items: ["Kibana", "Grafana"] },
  { group: "Version Control", items: ["Git", "Bitbucket", "GitHub"] },
  {
    group: "Web Technologies",
    items: ["HTML", "CSS", "JavaScript", "React.js", "AngularJS", "Angular Material", "Node.js", "Bootstrap"],
  },
  { group: "Tools", items: ["JIRA", "Postman", "VS Code", "PyCharm", "Visual Studio"] },
];

export const education = {
  school: "Chennai Institute of Technology",
  degree: "Bachelor of Engineering — Computer Science and Engineering",
  year: "2023",
  detail: "CGPA 9.64 / 10 · Graduated 1st out of 180 students · First Class with Distinction",
};

export const certifications = [
  "Programming in Java — NPTEL, IIT Kharagpur (91%, Elite + Gold)",
  "Java Certification — HackerRank",
  "AI for Everyone — DeepLearning.ai",
  "Web Design for Everybody (Capstone) — University of Michigan",
];

export interface AiTopic {
  title: string;
  flow: string[];
  detail: string;
  tech: string;
}

export const aiTopics: AiTopic[] = [
  {
    title: "AI-Generated Test Automation",
    flow: ["Requirement", "Candidate Tests", "Review"],
    detail:
      "Part of the MCP-based Python + Playwright framework, used to accelerate automation delivery across 15+ frontend modules within a month.",
    tech: "MCP, Python, Playwright",
  },
  {
    title: "Adaptive DOM Extraction",
    flow: ["Application", "DOM Extraction", "Target Identification"],
    detail: "Extracts the DOM adaptively so the framework can identify the elements a test needs to act on.",
    tech: "MCP, Playwright",
  },
  {
    title: "Self-Healing Execution",
    flow: ["Failure", "Investigation", "Selector Adaptation", "Retry"],
    detail: "Self-healing execution in the framework to significantly reduce test maintenance overhead.",
    tech: "MCP, Python, Playwright",
  },
  {
    title: "AI-Assisted Validation & Guardrails",
    flow: ["AI-generated code", "Auto-fixers", "Validation pipeline"],
    detail:
      "AI-assisted validation, plus pre-commit auto-fixers and automated validation pipelines that detect and correct deviations in AI-generated automation code to keep it compliant with the framework.",
    tech: "Pre-commit, Python, Jenkins",
  },
];

export interface Recommendation {
  quote: string;
  author: string;
  context: string;
}

import recommendationsData from "./recommendations.json";

/**
 * Curated recommendations, generated from LinkedIn's data export by
 * `npm run import:recommendations` (see README). Never presented as a live feed.
 */
export const curatedRecommendations: Recommendation[] = recommendationsData;
