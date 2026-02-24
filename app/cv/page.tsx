"use client";

import { useEffect } from "react";

export default function CVPage() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            const exportLight = document.getElementById("export-light");
            const exportDark = document.getElementById("export-dark");

            const exportPDF = (mode: "light" | "dark") => {
                const el = document.getElementById("cv");
                if (!el) return;
                document.body.classList.add("exporting");
                if (mode === "light") document.body.classList.add("printing");

                setTimeout(() => {
                    // @ts-expect-error html2pdf is loaded dynamically
                    html2pdf()
                        .set({
                            margin: 0,
                            filename: `CV_Dawid_Ferus_${mode}.pdf`,
                            image: { type: "jpeg", quality: 0.98 },
                            html2canvas: {
                                scale: 2,
                                useCORS: true,
                                logging: false,
                                onclone: (clonedDoc: Document) => {
                                    clonedDoc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
                                        const href = link.getAttribute("href") || "";
                                        if (href.startsWith("http") && !href.includes(window.location.hostname)) {
                                            link.remove();
                                        }
                                    });
                                    clonedDoc.querySelectorAll("style").forEach((style) => {
                                        if (style.textContent) {
                                            style.textContent = style.textContent.replace(/@import\s+url\([^)]+\);?/g, "");
                                        }
                                    });
                                    const cvEl = clonedDoc.getElementById("cv");
                                    if (cvEl) {
                                        cvEl.style.margin = "0";
                                        cvEl.style.borderRadius = "0";
                                        cvEl.style.border = "none";
                                        cvEl.style.boxShadow = "none";
                                    }
                                },
                            },
                            pagebreak: { mode: ["avoid-all", "css", "legacy"], avoid: [".cv-section", ".experience-item", ".project-item", ".skill-group", ".education-item", ".cert-item", ".cv-header", ".cv-footer"] },
                            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                        })
                        .from(el)
                        .save()
                        .then(() => {
                            document.body.classList.remove("exporting", "printing");
                        });
                }, 300);
            };

            exportLight?.addEventListener("click", () => exportPDF("light"));
            exportDark?.addEventListener("click", () => exportPDF("dark"));
        };

        return () => {
            script.remove();
        };
    }, []);

    return (
        <>
            <style>{cvStyles}</style>

            {/* Export buttons */}
            <div className="export-bar">
                <button id="export-light" className="export-btn export-btn--light" title="Export Light PDF">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    PDF Light
                </button>
                <button id="export-dark" className="export-btn export-btn--dark" title="Export Dark PDF">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    PDF Dark
                </button>
            </div>

            <div id="cv" className="cv-container">
                {/* HEADER */}
                <header className="cv-header">
                    <div className="header-main">
                        <h1>Dawid Feruś</h1>
                        <p className="headline">Full-Stack Developer</p>
                    </div>
                    <div className="header-contact">
                        <div className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <span>dawid.ferus546@gmail.com</span>
                        </div>
                        <div className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span>+48 667 857 666</span>
                        </div>
                        <div className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>Zielona Góra, Polska</span>
                        </div>
                        <div className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            <span>github.com/Fernando546</span>
                        </div>
                        <div className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                            <span>linkedin.com/in/dawid-feruś-210924197</span>
                        </div>
                    </div>
                </header>

                {/* BODY */}
                <main className="cv-body">
                    <div className="cv-column cv-column--left">
                        {/* SUMMARY */}
                        <section className="cv-section">
                            <h2 className="section-title">Podsumowanie</h2>
                            <p className="summary-text">
                                Jestem studentem studiów magisterskich na kierunku Informatyka.
                                Moje doświadczenie obejmuje budowanie responsywnych stron internetowych oraz projektowanie aplikacji mobilnych.
                                Poza warstwą software&apos;ową, zgłębiam systemy wbudowane i projektuję własne rozwiązania.
                                W wolnej chwili lubię eksperymentować z nowymi technologiami i tworzyć własne projekty.
                            </p>
                        </section>

                        {/* EXPERIENCE */}
                        <section className="cv-section">
                            <h2 className="section-title">Doświadczenie</h2>

                            <div className="experience-item">
                                <div className="exp-header">
                                    <div>
                                        <h3 className="exp-title">Praktyka zawodowa</h3>
                                        <p className="exp-company">Perceptus Sp. z o.o. — Zielona Góra</p>
                                    </div>
                                    <span className="exp-date">2021</span>
                                </div>
                                <ul className="exp-list">
                                    <li>Zdobywanie wiedzy z zakresu podstaw cyberbezpieczeństwa i ochrony danych</li>
                                    <li>Administracja usługami katalogowymi Active Directory</li>
                                    <li>Rozwijanie umiejętności miękkich poprzez przygotowywanie i prowadzenie prezentacji technicznych</li>
                                </ul>
                            </div>

                            <div className="experience-item">
                                <div className="exp-header">
                                    <div>
                                        <h3 className="exp-title">Praktyka zawodowa</h3>
                                        <p className="exp-company">Orlen SA. Dział Informatyki — Zielona Góra</p>
                                    </div>
                                    <span className="exp-date">2025</span>
                                </div>
                                <ul className="exp-list">
                                    <li>Konfiguracja sprzętowa serwerów oraz modernizacja i migracja komponentów bazowych</li>
                                    <li>Zarządzanie uprawnieniami użytkowników w strukturach systemowych</li>
                                    <li>Automatyzacja procesów za pomocą skryptów zarządzających</li>
                                    <li>Świadczenie bieżącego wsparcia technicznego i rozwiązywanie problemów incydentalnych (Helpdesk)</li>
                                </ul>
                            </div>
                        </section>

                        {/* PROJECTS */}
                        <section className="cv-section">
                            <h2 className="section-title">Projekty</h2>

                            <div className="project-item">
                                <div className="project-header">
                                    <h3 className="project-name">Versa - AI Fashion App</h3>
                                    <span className="project-tech">Expo, TypeScript, Supabase</span>
                                </div>
                                <p className="project-desc">Aplikacja rekomendująca stylizacje, oparta na sztucznej inteligencji, która sugeruje stylizacje w oparciu o preferencje użytkownika.</p>
                            </div>

                            <div className="project-item">
                                <div className="project-header">
                                    <h3 className="project-name">HEDUM - Pediatric Therapy</h3>
                                    <span className="project-tech">Next.js, TypeScript, Tailwind CSS, Node.js</span>
                                </div>
                                <p className="project-desc">Strona internetowa stworzona dla ośrodka terapii pediatrycznej w Zielonej Górze.</p>
                            </div>

                            <div className="project-item">
                                <div className="project-header">
                                    <h3 className="project-name">Message App based on LoRa</h3>
                                    <span className="project-tech">Kotlin, Android Studio, ESP32, LoRa, C++</span>
                                </div>
                                <p className="project-desc">Aplikacja do przesyłania wiadomości w czasie rzeczywistym wykorzystująca technologię LoRa do komunikacji o niskim poborze mocy i dużym zasięgu.</p>
                            </div>
                        </section>
                    </div>

                    <div className="cv-column cv-column--right">
                        {/* SKILLS */}
                        <section className="cv-section">
                            <h2 className="section-title">Umiejętności</h2>

                            <div className="skill-group">
                                <h4 className="skill-group-title">Frontend</h4>
                                <div className="skill-tags">
                                    <span className="tag">React</span>
                                    <span className="tag">Next.js</span>
                                    <span className="tag">TypeScript</span>
                                    <span className="tag">JavaScript</span>
                                    <span className="tag">HTML5</span>
                                    <span className="tag">CSS3 / SCSS</span>
                                    <span className="tag">Tailwind CSS</span>
                                </div>
                            </div>

                            <div className="skill-group">
                                <h4 className="skill-group-title">Backend</h4>
                                <div className="skill-tags">
                                    <span className="tag">Node.js</span>
                                    <span className="tag">REST API</span>
                                </div>
                            </div>

                            <div className="skill-group">
                                <h4 className="skill-group-title">Bazy danych</h4>
                                <div className="skill-tags">
                                    <span className="tag">Supabase</span>
                                    <span className="tag">MongoDB</span>
                                </div>
                            </div>

                            <div className="skill-group">
                                <h4 className="skill-group-title">DevOps & Narzędzia</h4>
                                <div className="skill-tags">
                                    <span className="tag">Git</span>
                                    <span className="tag">Docker</span>
                                    <span className="tag">Linux</span>
                                    <span className="tag">ArduinoIDE</span>
                                </div>
                            </div>

                            <div className="skill-group">
                                <h4 className="skill-group-title">Inne</h4>
                                <div className="skill-tags">
                                    <span className="tag">C++</span>
                                </div>
                            </div>
                        </section>

                        {/* EDUCATION */}
                        <section className="cv-section">
                            <h2 className="section-title">Edukacja</h2>

                            <div className="education-item">
                                <h3 className="edu-title">Informatyka - mgr inż.</h3>
                                <p className="edu-school">Uniwersytet Zielonogórski</p>
                                <span className="edu-date">2026 - teraz</span>
                            </div>

                            <div className="education-item">
                                <h3 className="edu-title">Informatyka - inż.</h3>
                                <p className="edu-school">Uniwersytet Zielonogórski</p>
                                <span className="edu-date">2022-2026</span>
                            </div>
                        </section>

                        {/* CERTIFICATIONS */}
                        <section className="cv-section">
                            <h2 className="section-title">Certyfikaty</h2>
                            <div className="cert-item">
                                <h3 className="cert-name">Kwalifikacja EE.08</h3>
                                <span className="cert-date">2020</span>
                            </div>
                            <div className="cert-item">
                                <h3 className="cert-name">Kwalifikacja EE.09</h3>
                                <span className="cert-date">2021</span>
                            </div>
                        </section>

                        {/* LANGUAGES */}
                        <section className="cv-section">
                            <h2 className="section-title">Języki</h2>
                            <div className="lang-list">
                                <div className="lang-item">
                                    <span className="lang-name">Polski</span>
                                    <span className="lang-level">Ojczysty</span>
                                </div>
                                <div className="lang-item">
                                    <span className="lang-name">Angielski</span>
                                    <span className="lang-level">B2</span>
                                </div>
                                <div className="lang-item">
                                    <span className="lang-name">Hiszpański</span>
                                    <span className="lang-level">A1</span>
                                </div>
                            </div>
                        </section>

                        {/* INTERESTS */}
                        <section className="cv-section">
                            <h2 className="section-title">Zainteresowania</h2>
                            <p className="interests-text">
                                Open Source • Siłownia • Home Automation • AI • Podróże
                            </p>
                        </section>
                    </div>
                </main>

                {/* FOOTER */}
                <footer className="cv-footer">
                    <p>Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu
                        rekrutacji zgodnie z art. 6 ust. 1 lit. a Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
                        z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych (RODO).
                        Jednocześnie wyrażam zgodę na przetwarzanie moich danych osobowych również na potrzeby przyszłych procesów rekrutacyjnych.</p>
                </footer>
            </div>
        </>
    );
}

// Inline CV styles (isolated from main portfolio)
const cvStyles = `
  .cv-container, .cv-container *, .cv-container *::before, .cv-container *::after,
  .export-bar, .export-bar * {
    cursor: auto !important;
  }

  :root {
    --cv-bg-primary: #0f0f13;
    --cv-bg-secondary: #16161d;
    --cv-bg-card: #1c1c27;
    --cv-bg-accent: rgba(99, 102, 241, 0.08);
    --cv-text-primary: #e8e8ed;
    --cv-text-secondary: #9ca3af;
    --cv-text-muted: #6b7280;
    --cv-accent: #818cf8;
    --cv-accent-bright: #a5b4fc;
    --cv-accent-dim: #4f46e5;
    --cv-border: rgba(255, 255, 255, 0.06);
    --cv-border-accent: rgba(129, 140, 248, 0.25);
    --cv-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --cv-page-padding: 48px;
    --cv-section-gap: 28px;
  }

  .export-bar {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 1000;
    display: flex;
    gap: 8px;
  }

  .export-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: var(--cv-font);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .export-btn--light {
    background: linear-gradient(135deg, #f59e0b, #f97316);
    box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35);
  }
  .export-btn--light:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245, 158, 11, 0.5); }

  .export-btn--dark {
    background: linear-gradient(135deg, var(--cv-accent-dim), var(--cv-accent));
    box-shadow: 0 4px 16px rgba(79, 70, 229, 0.35);
  }
  .export-btn--dark:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79, 70, 229, 0.5); }

  .cv-container {
    width: 100%;
    max-width: 900px;
    margin: 40px auto;
    background: var(--cv-bg-secondary);
    border-radius: 16px;
    border: 1px solid var(--cv-border);
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 20px 60px rgba(0, 0, 0, 0.5);
    font-family: var(--cv-font);
    font-size: 14px;
    color: var(--cv-text-primary);
    line-height: 1.6;
  }

  .cv-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
    padding: var(--cv-page-padding);
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(129, 140, 248, 0.06));
    border-bottom: 1px solid var(--cv-border);
    position: relative;
    overflow: hidden;
  }

  .cv-header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(129, 140, 248, 0.08), transparent 70%);
    pointer-events: none;
  }

  .header-main h1 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--cv-text-primary), var(--cv-accent-bright));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .headline {
    font-size: 1.05rem;
    font-weight: 500;
    color: var(--cv-accent);
    margin-top: 4px;
  }

  .header-contact {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: var(--cv-text-secondary);
  }

  .contact-item svg { flex-shrink: 0; stroke: var(--cv-accent); }

  .cv-body {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 0;
  }

  .cv-column { padding: var(--cv-page-padding); }
  .cv-column--left { border-right: 1px solid var(--cv-border); }
  .cv-column--right { background: var(--cv-bg-card); }

  .cv-section { margin-bottom: var(--cv-section-gap); }
  .cv-section:last-child { margin-bottom: 0; }

  .section-title {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--cv-accent);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--cv-border-accent);
  }

  .summary-text { color: var(--cv-text-secondary); font-size: 0.9rem; line-height: 1.7; }

  .experience-item { margin-bottom: 22px; padding-bottom: 22px; border-bottom: 1px solid var(--cv-border); }
  .experience-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }

  .exp-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 10px; }
  .exp-title { font-size: 1rem; font-weight: 600; color: var(--cv-text-primary); }
  .exp-company { font-size: 0.85rem; color: var(--cv-text-muted); margin-top: 2px; }
  .exp-date {
    font-size: 0.78rem; font-weight: 500; color: var(--cv-accent); white-space: nowrap;
    background: var(--cv-bg-accent); padding: 3px 10px; border-radius: 6px;
  }

  .exp-list { list-style: none; padding: 0; }
  .exp-list li { position: relative; padding-left: 16px; font-size: 0.85rem; color: var(--cv-text-secondary); margin-bottom: 5px; line-height: 1.5; }
  .exp-list li::before {
    content: ''; position: absolute; left: 0; top: 8px; width: 5px; height: 5px;
    border-radius: 50%; background: var(--cv-accent); opacity: 0.6;
  }

  .project-item { margin-bottom: 16px; padding: 14px; background: var(--cv-bg-accent); border-radius: 10px; border: 1px solid var(--cv-border-accent); }
  .project-item:last-child { margin-bottom: 0; }
  .project-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .project-name { font-size: 0.95rem; font-weight: 600; color: var(--cv-text-primary); }
  .project-tech { font-size: 0.72rem; color: var(--cv-accent); font-weight: 500; }
  .project-desc { font-size: 0.82rem; color: var(--cv-text-secondary); line-height: 1.5; }

  .skill-group { margin-bottom: 16px; }
  .skill-group:last-child { margin-bottom: 0; }
  .skill-group-title { font-size: 0.8rem; font-weight: 600; color: var(--cv-text-primary); margin-bottom: 8px; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag {
    font-size: 0.72rem; font-weight: 500; padding: 4px 10px; border-radius: 6px;
    background: var(--cv-bg-accent); color: var(--cv-accent-bright); border: 1px solid var(--cv-border-accent);
    transition: all 0.2s ease;
  }
  .tag:hover { background: rgba(99, 102, 241, 0.15); transform: translateY(-1px); }

  .education-item { margin-bottom: 14px; }
  .education-item:last-child { margin-bottom: 0; }
  .edu-title { font-size: 0.9rem; font-weight: 600; color: var(--cv-text-primary); }
  .edu-school { font-size: 0.82rem; color: var(--cv-text-muted); margin-top: 2px; }
  .edu-date { font-size: 0.75rem; color: var(--cv-accent); font-weight: 500; }

  .cert-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid var(--cv-border); }
  .cert-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .cert-name { font-size: 0.85rem; font-weight: 500; color: var(--cv-text-primary); }
  .cert-date { font-size: 0.75rem; color: var(--cv-accent); font-weight: 500; }

  .lang-list { display: flex; flex-direction: column; gap: 8px; }
  .lang-item { display: flex; justify-content: space-between; align-items: center; }
  .lang-name { font-size: 0.85rem; color: var(--cv-text-primary); font-weight: 500; }
  .lang-level { font-size: 0.78rem; color: var(--cv-accent); background: var(--cv-bg-accent); padding: 2px 10px; border-radius: 4px; font-weight: 500; }

  .interests-text { font-size: 0.85rem; color: var(--cv-text-secondary); line-height: 1.7; }

  .cv-footer { padding: 20px var(--cv-page-padding); border-top: 1px solid var(--cv-border); text-align: left; }
  .cv-footer p { font-size: 0.65rem; font-style: italic; color: var(--cv-text-muted); line-height: 1.5; }

  @media (max-width: 700px) {
    :root { --cv-page-padding: 28px; }
    .cv-body { grid-template-columns: 1fr; }
    .cv-column--left { border-right: none; border-bottom: 1px solid var(--cv-border); }
    .cv-header { flex-direction: column; align-items: flex-start; }
    .exp-header { flex-direction: column; gap: 6px; }
    .export-bar { top: auto; bottom: 24px; right: 24px; }
  }

  @media print {
    * { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; }
    body { padding: 0; }
    .export-bar { display: none !important; }
    .cv-container { border: none; border-radius: 0; box-shadow: none; max-width: 100%; }
  }

  body.exporting .export-bar { display: none !important; }
  body.exporting .cv-container { border: none; border-radius: 0; box-shadow: none; margin: 0; }
  body.exporting .header-main h1 { -webkit-text-fill-color: var(--cv-text-primary); background: none; }
  body.exporting .cv-header::before { display: none; }

  body.exporting .cv-section,
  body.exporting .experience-item,
  body.exporting .project-item,
  body.exporting .skill-group,
  body.exporting .education-item,
  body.exporting .cert-item,
  body.exporting .cv-header {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  body.exporting .section-title {
    break-after: avoid;
    page-break-after: avoid;
  }

  body.printing {
    --cv-bg-primary: #ffffff;
    --cv-bg-secondary: #ffffff;
    --cv-bg-card: #f8f9fa;
    --cv-bg-accent: rgba(79, 70, 229, 0.06);
    --cv-text-primary: #111827;
    --cv-text-secondary: #4b5563;
    --cv-text-muted: #6b7280;
    --cv-accent: #4f46e5;
    --cv-accent-bright: #4338ca;
    --cv-border: #e5e7eb;
    --cv-border-accent: rgba(79, 70, 229, 0.2);
  }
`;
