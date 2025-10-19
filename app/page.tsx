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
import { Spotlight } from "@/components/ui/spotlight-new";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
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
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(41, 100%, 85%, .08) 0, hsla(41, 100%, 55%, .02) 50%, hsla(41, 100%, 45%, 0) 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(41, 100%, 85%, .06) 0, hsla(41, 100%, 55%, .02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(41, 100%, 85%, .04) 0, hsla(41, 100%, 45%, .02) 80%, transparent 100%)"
        />
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
          maxDelay={3000}
          starColor="#E8DAEF"
          trailColor="#B19CD9"
          className="absolute inset-0"
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-stone-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="relative z-10 max-w-5xl w-full mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            {/* Image Placeholder */}
            <div className="hidden md:flex justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-600 to-stone-800 rounded-full blur-2xl opacity-50"></div>
                <div className="relative w-80 h-80 rounded-full border-2 border-stone-600 overflow-hidden">
                  <img
                    src="/photo.jpg"
                    alt="Dawid"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center text-center -ml-8">
              <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0s" }}>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-white">
                  Hey, I'm <span className="text-stone-300">Dawid</span>
                </h1>
              </div>
              <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <p className="text-xl md:text-2xl text-stone-200 mb-2 font-normal">
                  4th Year IT Student | Full Stack Developer
                </p>
                <p className="text-lg text-stone-400">
                  Crafting beautiful and functional digital experiences
                </p>
              </div>
              <div
                className="animate-fade-in-up flex gap-4 justify-center flex-wrap"
                style={{ animationDelay: "0.2s" }}
              >
                <HoverBorderGradient
                  containerClassName="rounded-lg"
                  className="px-6 py-2 bg-stone-600 text-white font-semibold text-sm"
                  duration={1}
                  clockwise={true}
                >
                  <a href="#projects" className="flex items-center justify-center w-full h-full">
                    View My Work
                  </a>
                </HoverBorderGradient>
                <HoverBorderGradient
                  containerClassName="rounded-lg"
                  className="px-6 py-2 text-white font-semibold text-sm"
                  duration={1}
                  clockwise={true}
                >
                  <a href="#contact" className="flex items-center justify-center w-full h-full">
                    Get In Touch
                  </a>
                </HoverBorderGradient>
              </div>
            </div>
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
            <SkillCard name="TypeScript" proficiency="intermediate" />
            <SkillCard name="React" proficiency="intermediate" />
            <SkillCard name="Next.js" proficiency="intermediate" />

            {/* Mobile */}
            <SkillCard name="React Native" proficiency="intermediate" />
            <SkillCard name="Expo" proficiency="intermediate" />
            <SkillCard name="Mobile Development" proficiency="intermediate" />

            {/* Backend */}
            <SkillCard name="Node.js" proficiency="intermediate" />
            <SkillCard name="Express.js" proficiency="beginner" />
            <SkillCard name="MongoDB" proficiency="intermediate" />

            {/* Tools & Other */}
            <SkillCard name="Tailwind CSS" proficiency="intermediate" />
            <SkillCard name="Git & GitHub" proficiency="intermediate" />
            <SkillCard name="REST APIs" proficiency="beginner" />
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
              title="Versa - AI Fashion App"
              description="AI-powered fashion recommendation app that suggests outfits based on user preferences and help's share people's style."
              tech={[
                "Expo",
                "TypeScript",
                "Supabase",
                "Tailwind CSS",
                "Mobile Development",
              ]}
              link="https://versa-style.vercel.app/"
              github="https://github.com/strat-development/fashion-app"
            />

            <ProjectCard
              title="HEDUM - Pediatric Therapy Website"
              description="Website created for pediatric therapy center in Zielona Góra. It includes information about the center, services, and contact information."
              tech={["React", "Node.js", "Next.js", "Tailwind CSS", "Website Development"]}
              link="https://www.hedum.pl/"
            />

            <ProjectCard
              title="Temperature Monitoring App"
              description="Device based on ESP32 measures temperature and other parameters and displays them on the website."
              tech={["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "ArduinoIDE", "C++", "Website Development"]}
              link="https://esp32-frontend.vercel.app/"
              github="https://github.com/Fernando546/esp32-frontend"
            />

            <ProjectCard
              title="Message App based on LoRa technology"
              description="Real-time messaging app utilizing LoRa technology for low-power, long-range communication."
              tech={["Kotlin", "Android Studio", "ESP32", "LoRa", "Mobile Development"]}
              github="https://github.com/Fernando546/LoraApp"
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

            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">
                Education
              </h3>
              <div className="space-y-6">
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
