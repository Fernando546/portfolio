"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import SkillCard from "@/components/ui/SkillCard";
import ProjectCard from "@/components/ui/ProjectCard";
import ExperienceCard from "@/components/ui/ExperienceCard";
import HobbyCard from "@/components/ui/HobbyCard";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconMail, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-stone-900/80 backdrop-blur-sm border-b border-stone-700 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center relative">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute left-6 md:hidden text-white hover:text-stone-300 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex gap-12">
            <a
              href="#skills"
              className="text-sm text-stone-300 hover:text-white transition-colors font-medium"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-sm text-stone-300 hover:text-white transition-colors font-medium"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="text-sm text-stone-300 hover:text-white transition-colors font-medium"
            >
              Experience
            </a>
            <a
              href="#hobbies"
              className="text-sm text-stone-300 hover:text-white transition-colors font-medium"
            >
              Hobbies
            </a>
          </div>
        </div>

        {/* Mobile Navigation - Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-stone-700 bg-stone-900/90">
            <div className="px-6 py-4 space-y-3 flex flex-col">
              <a
                href="#skills"
                className="text-sm text-stone-300 hover:text-white transition-colors font-medium block"
                onClick={() => setIsOpen(false)}
              >
                Skills
              </a>
              <a
                href="#projects"
                className="text-sm text-stone-300 hover:text-white transition-colors font-medium block"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </a>
              <a
                href="#experience"
                className="text-sm text-stone-300 hover:text-white transition-colors font-medium block"
                onClick={() => setIsOpen(false)}
              >
                Experience
              </a>
              <a
                href="#hobbies"
                className="text-sm text-stone-300 hover:text-white transition-colors font-medium block"
                onClick={() => setIsOpen(false)}
              >
                Hobbies
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900">
        <StarsBackground
          starDensity={0.0001}
          allStarsTwinkle={true}
          twinkleProbability={0.7}
          className="absolute inset-0"
        />
        <ShootingStars
          minSpeed={10}
          maxSpeed={30}
          minDelay={1200}
          maxDelay={4200}
          starColor="#E8DAEF"
          trailColor="#B19CD9"
          className="absolute inset-0"
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-stone-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="relative z-10 text-center max-w-4xl">
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0s" }}>
            <h1 className="text-6xl md:text-7xl font-semibold mb-4 leading-tight text-white">
              Hey, I'm <span className="text-stone-300">Dawid</span>
            </h1>
          </div>
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-xl md:text-2xl text-stone-200 mb-2 font-normal">
              4th Year Student | Full Stack Developer
            </p>
            <p className="text-lg text-stone-400">
              Crafting beautiful and functional digital experiences
            </p>
          </div>
          <div
            className="animate-fade-in-up flex gap-4 justify-center flex-wrap"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-stone-600 text-white font-semibold rounded-xl hover:bg-stone-500 hover:shadow-lg hover:shadow-stone-600/50 transition-all duration-300 hover:scale-105 text-lg"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-stone-800 hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-stone-700/50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Skills" subtitle="What I know" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Frontend */}
            <SkillCard name="TypeScript" proficiency="advanced" />
            <SkillCard name="React" proficiency="advanced" />
            <SkillCard name="Next.js" proficiency="advanced" />

            {/* Mobile */}
            <SkillCard name="React Native" proficiency="intermediate" />
            <SkillCard name="Expo" proficiency="intermediate" />
            <SkillCard name="Mobile Development" proficiency="intermediate" />

            {/* Backend */}
            <SkillCard name="Node.js" proficiency="intermediate" />
            <SkillCard name="Express" proficiency="intermediate" />
            <SkillCard name="PostgreSQL" proficiency="intermediate" />

            {/* Tools & Other */}
            <SkillCard name="Tailwind CSS" proficiency="advanced" />
            <SkillCard name="Git & GitHub" proficiency="advanced" />
            <SkillCard name="REST APIs" proficiency="advanced" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-6 overflow-hidden">
        <BackgroundRippleEffect rows={4} cols={40} cellSize={80} />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle title="Projects" subtitle="Featured work" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              title="E-Commerce Platform"
              description="Full-stack e-commerce solution with real-time inventory management, secure payment processing, and responsive design."
              tech={[
                "Next.js",
                "TypeScript",
                "PostgreSQL",
                "Tailwind CSS",
              ]}
              link="https://example.com"
              github="https://github.com"
            />

            <ProjectCard
              title="Task Management App"
              description="Collaborative task management application built with React and Node.js. Features real-time updates and team collaboration."
              tech={["React", "Node.js", "WebSocket", "MongoDB"]}
              github="https://github.com"
            />

            <ProjectCard
              title="Mobile Fitness Tracker"
              description="Cross-platform mobile app for fitness tracking with workouts, nutrition logging, and progress analytics."
              tech={["React Native", "Expo", "Firebase"]}
              github="https://github.com"
            />

            <ProjectCard
              title="Personal Blog"
              description="Modern blog platform with markdown support, dark mode, and optimized performance."
              tech={["Next.js", "MDX", "Vercel"]}
              link="https://example.com"
              github="https://github.com"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-stone-700/30">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Experience" subtitle="My journey" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Work Experience */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">
                Work Experience
              </h3>
              <div className="space-y-6">
                <ExperienceCard
                  title="Junior Developer"
                  company="Tech Company"
                  period="2024 - Present"
                  description="Building responsive web applications and contributing to full-stack projects using modern technologies."
                  type="work"
                />

                <ExperienceCard
                  title="Freelance Developer"
                  company="Self-employed"
                  period="2023 - Present"
                  description="Developing custom web solutions for small businesses and startups."
                  type="work"
                />
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">
                Education
              </h3>
              <div className="space-y-6">
                <ExperienceCard
                  title="4th Year Student"
                  company="University"
                  period="2021 - 2025"
                  description="Majoring in Computer Science with focus on web and mobile development."
                  type="education"
                />

                <ExperienceCard
                  title="Advanced Web Development"
                  company="Online Courses"
                  period="2022 - 2024"
                  description="Completed certifications in React, Node.js, and Full-Stack Development."
                  type="education"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Hobbies & Interests" subtitle="Beyond coding" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HobbyCard
              title="Sports"
              description="Passionate about fitness - gym training and running every day to maintain a healthy lifestyle and mental clarity."
            />

            <HobbyCard
              title="IoT & Hardware"
              description="Interested in Internet of Things projects, smart devices, and embedded systems development."
            />

            <HobbyCard
              title="Web Development"
              description="Building modern, responsive web applications and exploring new frameworks and technologies."
            />

            <HobbyCard
              title="Tech Writing"
              description="Documenting my learning journey and sharing insights about web development on blogs and platforms."
            />

            <HobbyCard
              title="Music"
              description="Enjoys listening to various genres and exploring music production tools."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-800/50 to-stone-900/50"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <SectionTitle title="Let's Connect" />
          
          <p className="text-lg text-stone-300 mb-12 leading-relaxed">
            I'm always interested in hearing about new opportunities and collaborations.
          </p>

          <div className="flex justify-center mt-12">
            <FloatingDock
              items={[
                {
                  title: "Email",
                  icon: <IconMail className="h-full w-full text-white" />,
                  href: "mailto:contact@example.com",
                },
                {
                  title: "GitHub",
                  icon: <IconBrandGithub className="h-full w-full text-white" />,
                  href: "https://github.com",
                },
                {
                  title: "LinkedIn",
                  icon: <IconBrandLinkedin className="h-full w-full text-white" />,
                  href: "https://linkedin.com",
                },
              ]}
              desktopClassName="bg-stone-800 border border-stone-700 h-20 px-6 pb-4 gap-6 [&>a]:scale-125"
              mobileClassName="bg-stone-800 border border-stone-700"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-700 py-8 px-6 bg-stone-800/50">
        <div className="max-w-6xl mx-auto text-center text-stone-400 text-sm">
          <p>© 2024 Dawid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
