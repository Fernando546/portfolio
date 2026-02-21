"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import GlitchText from "@/components/ui/GlitchText";
import SkillCard from "@/components/ui/SkillCard";
import ProjectCard from "@/components/ui/ProjectCard";
import ExperienceCard from "@/components/ui/ExperienceCard";
import HobbyCard from "@/components/ui/HobbyCard";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { FloatingDock } from "@/components/ui/floating-dock";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconBallBasketball, IconWifi, IconCode, IconBrain, IconMusic, IconDrone, IconTerminal2, IconChevronDown } from "@tabler/icons-react";
import { useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";

function CodeRain() {
  const lines = [
    "const developer = new Developer();",
    "while(gym) { pump(); }",
    "git commit -m 'andreus'",
    "npm install minilitics",
    "export default Portfolio",
    "// TODO: listen opeth",
    "ssh user@production",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute font-mono text-white text-xs whitespace-nowrap"
          style={{
            left: `${(i * 17) % 90}%`,
            top: `${(i * 14) % 85}%`,
            transform: `rotate(${-3 + (i % 3) * 3}deg)`,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

function SectionDivider({ variant = "fade" }: { variant?: "fade" | "line" | "dots" | "code" }) {
  if (variant === "line") {
    return (
      <div className="relative h-px mx-auto max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400/30 rounded-full" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-zinc-700 rounded-full" />
        ))}
      </div>
    );
  }

  if (variant === "code") {
    return (
      <div className="flex items-center justify-center py-6">
        <span className="font-mono text-[10px] text-zinc-700 tracking-widest">
          {"// "}---{"---"}---{"---"}---{"---"}---{"---"}---{"---"}
        </span>
      </div>
    );
  }

  return (
    <div className="h-24 bg-gradient-to-b from-transparent to-transparent" />
  );
}

// Memoize heavy background components to prevent re-renders
const MemoStars = memo(StarsBackground);
const MemoShootingStars = memo(ShootingStars);

// Skills data
const allSkills = [
  { name: "TypeScript", proficiency: "intermediate" as const },
  { name: "React", proficiency: "intermediate" as const },
  { name: "Next.js", proficiency: "intermediate" as const },
  { name: "React Native", proficiency: "intermediate" as const },
  { name: "Expo", proficiency: "intermediate" as const },
  { name: "Mobile Development", proficiency: "intermediate" as const },
  { name: "Node.js", proficiency: "intermediate" as const },
  { name: "C++", proficiency: "beginner" as const },
  { name: "MongoDB", proficiency: "intermediate" as const },
  { name: "Tailwind CSS", proficiency: "intermediate" as const },
  { name: "Git & GitHub", proficiency: "intermediate" as const },
  { name: "REST APIs", proficiency: "beginner" as const },
];

const MOBILE_SKILLS_VISIBLE = 6;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200">
      {/* ===== NAVIGATION ===== */}
      <motion.nav
        layout
        initial={false}
        className={`fixed z-50 backdrop-blur-xl border border-zinc-800/60 shadow-lg shadow-black/40 overflow-hidden
        ${isOpen
            ? "top-4 w-[280px] rounded-xl left-0 right-0 mx-auto bg-[#09090b]/95"
            : "top-4 right-4 w-11 h-11 rounded-full bg-[#09090b]/80"}
        md:!w-[90%] md:!max-w-xl md:!h-auto md:!rounded-full md:!top-4 md:!right-auto md:!left-1/2 md:!-translate-x-1/2 md:!mx-0 md:!bg-[#09090b]/80
      `}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="md:px-6 md:py-3 flex items-center justify-between md:justify-center w-full min-h-[44px]">
          <motion.button
            layout
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors flex items-center justify-center w-11 h-11 absolute top-0 right-0 z-20"
          >
            <IconTerminal2 size={18} />
          </motion.button>

          <div className="hidden md:flex gap-1 items-center w-full justify-center">
            {["skills", "projects", "experience", "hobbies", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-xs font-mono text-zinc-500 hover:text-white transition-all font-medium px-3 py-1.5 rounded-full hover:bg-white/5"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden w-full"
            >
              <div className="px-4 pb-4 space-y-1 flex flex-col mt-1">
                {["skills", "projects", "experience", "hobbies", "contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="text-sm font-mono text-zinc-500 hover:text-white transition-colors font-medium block w-full text-center py-2 hover:bg-white/5 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <MemoStars
          starDensity={0.00012}
          allStarsTwinkle={true}
          twinkleProbability={0.5}
          className="absolute inset-0"
        />
        <MemoShootingStars
          minSpeed={10}
          maxSpeed={25}
          minDelay={2000}
          maxDelay={4000}
          starColor="#ffffff"
          trailColor="#4ade80"
          className="absolute inset-0"
        />
        <CodeRain />

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-5xl w-full mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Avatar */}
            <div className="flex justify-center order-first md:order-none mb-6 md:mb-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/20 via-transparent to-emerald-500/10 rounded-full blur-sm" />
                <div className="relative w-48 md:w-64 h-48 md:h-64 rounded-full border border-zinc-800 overflow-hidden">
                  <img src="/photo.JPG" alt="Dawid" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>

            {/* Text — block centered on mobile, left on desktop; text inside always left */}
            <div className="flex flex-col items-center md:items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white font-mono tracking-tight">
                  Hey, I&apos;m{" "}
                  <GlitchText text="Dawid" className="text-emerald-400 inline" />
                </h1>
              </motion.div>

              {/* Bio terminal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mb-8 terminal-card p-4 w-full max-w-md scanline-flash flash-active"
              >
                <div className="terminal-header !p-2 !-mx-4 !-mt-4 !mb-3 !px-3">
                  <div className="terminal-dot red" style={{ width: 8, height: 8 }} />
                  <div className="terminal-dot yellow" style={{ width: 8, height: 8 }} />
                  <div className="terminal-dot green" style={{ width: 8, height: 8 }} />
                  <span className="ml-2 text-[10px] font-mono text-zinc-600">~/.bio</span>
                </div>
                <div className="font-mono text-sm space-y-1.5 text-left">
                  <p>
                    <span className="text-emerald-400">→</span>{" "}
                    <span className="text-zinc-500">role:</span>{" "}
                    <span className="text-white">&quot;Full Stack Developer&quot;</span>
                  </p>
                  <p>
                    <span className="text-emerald-400">→</span>{" "}
                    <span className="text-zinc-500">education:</span>{" "}
                    <span className="text-white">&quot;4th Year IT Student&quot;</span>
                  </p>
                  <p>
                    <span className="text-emerald-400">→</span>{" "}
                    <span className="text-zinc-500">passion:</span>{" "}
                    <span className="text-white">&quot;Building digital experiences&quot;</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-3 justify-center md:justify-start flex-wrap"
              >
                <HoverBorderGradient
                  containerClassName="rounded-lg"
                  className="px-5 py-2 bg-emerald-500/5 text-white font-mono font-medium text-sm"
                  duration={1}
                  clockwise={true}
                >
                  <a href="#projects" className="flex items-center justify-center w-full h-full gap-2">
                    View Projects
                  </a>
                </HoverBorderGradient>
                <HoverBorderGradient
                  containerClassName="rounded-lg"
                  className="px-5 py-2 text-zinc-400 font-mono font-medium text-sm"
                  duration={1}
                  clockwise={true}
                >
                  <a href="#contact" className="flex items-center justify-center w-full h-full gap-2">
                    Get In Touch
                  </a>
                </HoverBorderGradient>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-zinc-700" />
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="line" />

      {/* ===== SKILLS dotted background ===== */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-dots" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle title="Skills" subtitle="what I work with" />

          {/* Desktop: all skills visible / Mobile: collapsible */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`${!showAllSkills && index >= MOBILE_SKILLS_VISIBLE
                  ? "hidden md:block"
                  : ""
                  }`}
              >
                <SkillCard name={skill.name} proficiency={skill.proficiency} />
              </div>
            ))}
          </div>

          {/* Show more / less button — mobile only */}
          {allSkills.length > MOBILE_SKILLS_VISIBLE && (
            <div className="md:hidden flex justify-center mt-6">
              <button
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/5"
              >
                {showAllSkills ? "Show less" : `Show all (${allSkills.length})`}
                <motion.div
                  animate={{ rotate: showAllSkills ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconChevronDown size={14} />
                </motion.div>
              </button>
            </div>
          )}
        </div>
      </section>

      <SectionDivider variant="code" />

      {/* ===== PROJECTS lines background ===== */}
      <section id="projects" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-diag" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[100px]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle title="Projects" subtitle="things I've built" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ProjectCard
              title="Minilytics - Website Tracking Tool"
              description="Tool for tracking website visitors, analyzing traffic sources, and monitoring user behavior to optimize website performance."
              tech={["React", "Node.js", "Next.js", "Tailwind CSS", "NPM"]}
              github="https://github.com/Fernando546/minilytics"
            />

            <ProjectCard
              title="Versa - AI Fashion App"
              description="AI-powered fashion recommendation app that suggests outfits based on user preferences and help's share people's style."
              tech={["Expo", "TypeScript", "Supabase", "Tailwind CSS"]}
              link="https://versa-style.vercel.app/"
              github="https://github.com/strat-development/fashion-app"
            />

            <ProjectCard
              title="HEDUM - Pediatric Therapy Website"
              description="Website created for pediatric therapy center in Zielona Góra. It includes information about the center, services, and contact information."
              tech={["React", "Node.js", "Next.js", "Tailwind CSS"]}
              link="https://www.hedum.pl/"
            />

            <ProjectCard
              title="Temperature Monitoring App"
              description="Device based on ESP32 measures temperature and other parameters and displays them on the website."
              tech={["Next.js", "TypeScript", "MongoDB", "C++", "ArduinoIDE"]}
              link="https://esp32-frontend.vercel.app/"
              github="https://github.com/Fernando546/esp32-frontend"
            />

            <ProjectCard
              title="Message App based on LoRa technology"
              description="Real-time messaging app utilizing LoRa technology for low-power, long-range communication."
              tech={["Kotlin", "Android Studio", "ESP32", "LoRa"]}
              github="https://github.com/Fernando546/LoraApp"
            />
          </div>
        </div>
      </section>

      <SectionDivider variant="dots" />

      {/* ===== EXPERIENCE horizontal lines ===== */}
      <section id="experience" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-hlines" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle title="Experience" subtitle="my journey so far" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm font-mono font-medium text-zinc-500 mb-6 uppercase tracking-wider">
                Work
              </h3>
              <div className="space-y-3">
                <ExperienceCard
                  title="Intern"
                  company="ORLEN IT Group"
                  period="2025"
                  description="I learned how companies operate from the inside and gained practical experience in network administration."
                  type="work"
                />
                <ExperienceCard
                  title="Apprentice"
                  company="Perceptus"
                  period="2020"
                  description="Developed foundational knowledge in sector-specific software and hardware."
                  type="work"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-mono font-medium text-zinc-500 mb-6 uppercase tracking-wider">
                Education
              </h3>
              <div className="space-y-3">
                <ExperienceCard
                  title="4th Year Student"
                  company="University of Zielona Góra"
                  period="2021 - 2025"
                  description="Majoring in Computer Science with focus on web development and embedded systems."
                  type="education"
                />
                <ExperienceCard
                  title="Middle School"
                  company="ZSEIS Elektronik Zielona Góra"
                  period="2017 - 2021"
                  description="Completed middle school education with IT technician specialization."
                  type="education"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="line" />

      {/* ===== HOBBIES cross-hatch ===== */}
      <section id="hobbies" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-cross" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle title="Hobbies" subtitle="beyond the code" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <HobbyCard
              title="Sports"
              description="Passionate about fitness - gym training and running every day to maintain a healthy lifestyle."
              icon={<IconBallBasketball size={22} />}
            />
            <HobbyCard
              title="IoT & Hardware"
              description="Interested in Internet of Things projects, smart devices, and embedded systems."
              icon={<IconWifi size={22} />}
            />
            <HobbyCard
              title="Web Development"
              description="Building modern, responsive web applications and exploring new frameworks."
              icon={<IconCode size={22} />}
            />
            <HobbyCard
              title="Artificial Intelligence"
              description="Fascinated by AI and machine learning. Exploring how they can revolutionize industries."
              icon={<IconBrain size={22} />}
            />
            <HobbyCard
              title="Music"
              description="Enjoys listening to various genres and exploring music production tools."
              icon={<IconMusic size={22} />}
            />
            <HobbyCard
              title="FPV Drones"
              description="Flying FPV drones, especially DJI Avata 2. Passionate about drone racing and aerial footage."
              icon={<IconDrone size={22} />}
            />
          </div>
        </div>
      </section>

      <SectionDivider variant="code" />

      {/* ===== CONTACT — grid background ===== */}
      <section id="contact" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/[0.02] rounded-full blur-[80px]" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <SectionTitle title="Contact" subtitle="let's talk" />

          <div className="terminal-card max-w-lg mx-auto mb-12">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="ml-3 text-xs font-mono text-zinc-600">~/contact</span>
            </div>
            <div className="p-5 font-mono text-sm text-left space-y-2">
              <p className="text-zinc-600">
                <span className="text-zinc-400">dev</span>
                <span className="text-zinc-700">@</span>
                <span className="text-zinc-400">portfolio</span>
                <span className="text-zinc-600"> ~ % </span>
                <span className="text-zinc-300">cat message.txt</span>
              </p>
              <p className="text-zinc-300 pl-2">
                I&apos;m always interested in hearing about new opportunities and collaborations.
              </p>
              <p className="text-zinc-600 mt-3">
                <span className="text-zinc-400">dev</span>
                <span className="text-zinc-700">@</span>
                <span className="text-zinc-400">portfolio</span>
                <span className="text-zinc-600"> ~ % </span>
                <span className="animate-blink text-emerald-400">▊</span>
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="hidden md:flex">
              <FloatingDock
                items={[
                  {
                    title: "Email",
                    icon: <IconMail className="h-full w-full text-white" />,
                    href: "mailto:dawid.ferus546@gmail.com",
                  },
                  {
                    title: "GitHub",
                    icon: <IconBrandGithub className="h-full w-full text-white" />,
                    href: "https://github.com/Fernando546",
                  },
                  {
                    title: "LinkedIn",
                    icon: <IconBrandLinkedin className="h-full w-full text-white" />,
                    href: "https://www.linkedin.com/in/dawid-feru%C5%9B-210924197/",
                  },
                ]}
                desktopClassName="bg-zinc-900/90 border border-zinc-800 h-20 px-6 pb-4 gap-6 [&>a]:scale-125"
                mobileClassName="bg-zinc-900/90 border border-zinc-800"
              />
            </div>

            <div className="md:hidden flex gap-8">
              <a href="mailto:dawid.ferus546@gmail.com" className="text-zinc-400 hover:text-white transition-colors" title="Email">
                <IconMail size={26} />
              </a>
              <a href="https://github.com/Fernando546" className="text-zinc-400 hover:text-white transition-colors" title="GitHub">
                <IconBrandGithub size={26} />
              </a>
              <a href="https://www.linkedin.com/in/dawid-feru%C5%9B-210924197/" className="text-zinc-400 hover:text-white transition-colors" title="LinkedIn">
                <IconBrandLinkedin size={26} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-700 text-xs font-mono">
            © 2026 My Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
}
