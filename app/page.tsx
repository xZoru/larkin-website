"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const purposeStatements = [
  {
    name: "Our mission",
    text: "LARKIN ENTERPRISES LIMITED aims to build long-term relationships with our customers and clients and provide exceptional customer service through innovation and advanced technology. We also aim to build a solid foundation that supports the nation by empowering Papua New Guineans with real opportunities and responsibilities.",
  },
  {
    name: "Our vision",
    text: "We envision becoming the number one supplier and importer of quality construction materials and state-of-the-art products that exceed the expectations of our esteemed customers.",
  },
];

const constructionServices = [
  "New construction, minor repairs and major renovations",
  "Office and commercial fit-outs",
  "Civil works, concrete pavement and road construction",
  "Carpentry and joinery",
  "Plumbing, tiling, vinyl sheet installation and floor polishing",
  "Painting and spray painting",
  "Wall cladding, rapid dry wall systems and noise reduction products",
];

const serviceCategories = [
  {
    number: "02",
    title: "Glass, Aluminium & Specialty Products",
    intro: "Architectural glazing, durable metalwork and specialist finishes, supplied and installed.",
    services: [
      "Glass and aluminium systems, windows, doors, bi-folding doors and glazing",
      "High-grade stainless steel and stainless steel railings",
      "Vitracore G2 and elevator cladding",
      "Fire-rated doors, Laminex and acrylic sheets",
    ],
  },
  {
    number: "03",
    title: "Ceilings & Flooring",
    intro: "Practical ceiling and flooring finishes for new builds, refurbishments and fit-outs.",
    services: [
      "Suspended ceiling systems, including Armstrong Ceiling Systems",
      "Carpet supply and installation",
      "Carpet tiles",
    ],
  },
  {
    number: "04",
    title: "Electrical, Air-Conditioning & Power",
    intro: "Essential building services and power equipment for dependable day-to-day operation.",
    services: [
      "Electrical works and network cabling",
      "Air-conditioning systems: supply and installation",
      "Generators",
    ],
  },
  {
    number: "05",
    title: "Security & Access Systems",
    intro: "Integrated perimeter protection, surveillance and controlled access solutions.",
    services: [
      "Electric fences and security mesh",
      "Automatic sliding and swing gates",
      "CCTV cameras",
      "Magnetic door locks and biometric access",
      "Perimeter fencing",
    ],
  },
];

const partnerCapabilities = [
  {
    name: "Ad Focus",
    detail: "Branding, advertising and large-format printing up to 6 m × 50 m without joints.",
    image: "/images/AdFocus-Transparent.png",
  },
  {
    name: "Larkin Glass & Aluminum",
    detail: "Glass and aluminium supply and installation.",
    image: "/images/Larkin%20Glass%20%26%20Aluminum.png",
  },
  {
    name: "Paragon Tech Limited",
    detail: "IT, work-efficiency machinery, and computing and printing equipment supply, installation, repair and maintenance.",
    image: "/images/Paragon_Tech_Limited-Transparent.png",
  },
  {
    name: "Triton Renovations & Construction",
    detail: "Construction, minor repairs and major renovations.",
    image: "/images/Triton_Logo-Transparent.png",
  },
];

const completedProjects = [
  {
    number: "01",
    category: "Civil Works",
    name: "Nadzab International Airport",
    scope: "Tiling and vinyl sheet installation",
    location: "Nadzab, Papua New Guinea",
    period: "August 2023",
    images: [] as string[],
  },
  {
    number: "02",
    category: "Infrastructre Works",
    name: "Air Traffic Control Tower",
    scope: "Cabin Glass Installation, Vitracore G2 Cladding, Aluminium Windows & Doors",
    location: "Mt. Hagen Airport",
    period: "March 2021 - August 2021",
    images: [] as string[],
  },
  {
    number: "03",
    category: "Commercial Works",
    name: "S&J Hotel Renovation",
    scope: "Construction of Shalome Restaurant, Renovation of Coffee Shop, Renovation of Reception Area, Installation of Security Mesh",
    location: "S&J Gordons",
    period: "March 2021 - August 2021",
    images: [] as string[],
  },
  {
    number: "04",
    category: "Residential Works",
    name: "Lahara Courts Apartments",
    scope: "Interior & Exterior Renovations, 14x 3-Bedroom Apartments",
    location: "Downtown Port Moresby",
    period: "March 2021 – March 2022",
    images: [] as string[],
  },
  {
    number: "05",
    category: "General Construction",
    name: "Monian Tower Lobby - Foyer Upgrade",
    scope: "Civil Works/Glass & Aluminium Works, Carpentry/Plumbing, Ceiling/Electrical Works, Painting and Finishing",
    location: "Downtown Port Moresby",
    period: "August 2018 - December 2018",
    images: [] as string[],
  },
  {
    number: "06",
    category: "Major Renovations",
    name: "Monian Tower Major Renovation Works",
    scope: "Glass & Aluminium Works, Carpeting and Floor Polishing, Carpentry/Plumbing, Suspended Ceiling/Electrical Works, Painting and Finishing, Elevator Cladding.",
    location: "Downtown Port Moresby",
    period: "January 2018 - December 2018",
    images: [] as string[],
  },
];

const serviceSlides = [
  {
    number: "01",
    title: "General Construction, Renovations & Fit-Outs",
    intro: "From civil works and new builds to repairs, upgrades and finished interiors.",
    services: constructionServices,
  },
  ...serviceCategories,
];

export default function Home() {
  const [activePurpose, setActivePurpose] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [activePartner, setActivePartner] = useState(0);
  const [activeWork, setActiveWork] = useState(0);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const serviceSwipeStart = useRef<number | null>(null);
  const partnerSwipeStart = useRef<number | null>(null);
  const workSwipeStart = useRef<number | null>(null);
  const purpose = purposeStatements[activePurpose];
  const selectedProject = selectedWork === null ? null : completedProjects[selectedWork];

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 16);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (selectedWork === null) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedWork(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedWork]);

  function moveService(direction: number) {
    setActiveService((current) => (current + direction + serviceSlides.length) % serviceSlides.length);
  }

  function movePartner(direction: number) {
    setActivePartner((current) => (current + direction + partnerCapabilities.length) % partnerCapabilities.length);
  }

  function moveWork(direction: number) {
    setActiveWork((current) => (current + direction + completedProjects.length) % completedProjects.length);
  }

  function moveProject(direction: number) {
    setActivePurpose((current) => (current + direction + purposeStatements.length) % purposeStatements.length);
  }

  return (
    <>
    <main className="site-shell">
      <header className={`topbar${hasScrolled ? " is-scrolled" : ""}`}>
        <a className="brand-logo-link" href="#home" aria-label="Larkin Enterprises home">
          <Image
            className="brand-logo"
            src="/images/Larkin%20Company%20Profile.png"
            alt="Larkin Enterprises"
            width={64}
            height={64}
            unoptimized
            priority
          />
        </a>
        <nav id="main-navigation" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>About us</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Our work</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a>
        </nav>
        <div className="header-actions">
          <a className="contact-link" href="mailto:info@larkinpng.com">Let’s talk <span className="arrow-icon" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M4.5 11.5 11.5 4.5M5 4.5h6.5V11" /></svg></span></a>
          <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span />
          </button>
        </div>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Built on good ground <span>—</span>2017</p>
          <h1 id="hero-title"><span className="brand-light">LARKIN</span><br /><span className="brand-accent">ENTERPRISES LIMITED</span></h1>
          <p className="hero-intro">We believe in treating our customers with respect and faith.<br className="desktop-break" /> We grow through creativity, invention and innovation.</p>
          <a className="primary-link" href="#services">Explore our services <span className="arrow-icon" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M4.5 11.5 11.5 4.5M5 4.5h6.5V11" /></svg></span></a>
        </div>

        <aside className="project-card purpose-card" id="purpose" aria-label="Our mission and vision">
          <div className="purpose-content" key={purpose.name}>
            <span className="project-kicker">Larkin Enterprises Limited</span>
            <h2>{purpose.name}</h2>
            <p>{purpose.text}</p>
          </div>
          <div className="project-caption">
            <span className="purpose-label">Our purpose</span>
            <div className="project-controls">
              <span className="project-count">0{activePurpose + 1} <i /> 0{purposeStatements.length}</span>
              <div className="arrow-group">
                <button onClick={() => moveProject(-1)} aria-label="Previous statement">‹</button>
                <button onClick={() => moveProject(1)} aria-label="Next statement">›</button>
              </div>
            </div>
          </div>
        </aside>

        <div className="hero-footer">
          <span>Building a better tomorrow</span>
          <a href="#about">Scroll to discover <span aria-hidden="true">↓</span></a>
          <span className="footer-location">Port Moresby, Papua New Guinea</span>
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="services-wrap">
          <header className="services-heading">
            <div>
              <p className="services-eyebrow"><span /> Our services</p>
              <h2 id="services-title">Built around<br /><em>what you need.</em></h2>
            </div>
            <p className="services-lede">
              Integrated supply, construction and fit-out services for government-funded projects and private clients across commercial, industrial and residential settings in Papua New Guinea.
            </p>
          </header>

          <div className="service-carousel" role="region" aria-roledescription="carousel" aria-label="Our services">
            <div className="service-carousel-toolbar">
              <p className="carousel-count"><span>0{activeService + 1}</span> / 0{serviceSlides.length}</p>
            </div>

            <div
              className="service-track"
              aria-live="polite"
              onPointerDown={(event) => {
                serviceSwipeStart.current = event.clientX;
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerUp={(event) => {
                if (serviceSwipeStart.current === null) return;
                const distance = event.clientX - serviceSwipeStart.current;
                if (Math.abs(distance) > 45) moveService(distance < 0 ? 1 : -1);
                serviceSwipeStart.current = null;
              }}
              onPointerCancel={() => { serviceSwipeStart.current = null; }}
            >
              {(() => {
                const service = serviceSlides[activeService];
                return (
                  <article className="service-card service-slide" key={service.number} aria-roledescription="slide" aria-label={`${activeService + 1} of ${serviceSlides.length}`}>
                    <div className="service-slide-heading">
                      <span className="service-number">{service.number} <i /></span>
                      <h3>{service.title}</h3>
                      <p>{service.intro}</p>
                    </div>
                    {"services" in service && (
                      <ul className="service-list service-slide-list">
                        {service.services.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    )}
                    <div className="carousel-controls service-side-controls">
                      <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => moveService(-1)} aria-label="Previous service">‹</button>
                      <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => moveService(1)} aria-label="Next service">›</button>
                    </div>
                  </article>
                );
              })()}
            </div>

            <div className="service-carousel-footer">
              <div className="service-dots" aria-label="Choose a service category">
                {serviceSlides.map((service, index) => (
                  <button
                    className={activeService === index ? "is-active" : ""}
                    key={service.number}
                    type="button"
                    aria-label={`Show ${service.title}`}
                    aria-current={activeService === index ? "true" : undefined}
                    onClick={() => setActiveService(index)}
                  />
                ))}
              </div>
              <span className="swipe-hint">Swipe or use arrows</span>
            </div>
          </div>



          <section className="partner-section" aria-labelledby="partners-title">
            <div className="partner-heading">
              <p className="services-eyebrow"><span /> Our Partners</p>
              <h3 id="partners-title">More expertise,<br /><em>working together.</em></h3>
            </div>
            <div className="partner-carousel" role="region" aria-roledescription="carousel" aria-label="Our partners">
              <div className="service-carousel-toolbar">
                <p className="carousel-count"><span>0{activePartner + 1}</span> / 0{partnerCapabilities.length}</p>
              </div>
              <div
                className="partner-track"
                aria-live="polite"
                onPointerDown={(event) => {
                  partnerSwipeStart.current = event.clientX;
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerUp={(event) => {
                  if (partnerSwipeStart.current === null) return;
                  const distance = event.clientX - partnerSwipeStart.current;
                  if (Math.abs(distance) > 45) movePartner(distance < 0 ? 1 : -1);
                  partnerSwipeStart.current = null;
                }}
                onPointerCancel={() => { partnerSwipeStart.current = null; }}
              >
                {(() => {
                  const partner = partnerCapabilities[activePartner];
                  return (
                    <article className="partner-slide-card" key={partner.name} aria-roledescription="slide" aria-label={String(activePartner + 1) + " of " + partnerCapabilities.length}>
                      <div className="partner-logo-panel">
                        <Image src={partner.image} alt="" width={240} height={160} unoptimized />
                      </div>
                      <div className="partner-slide-copy">
                        <span className="partner-kicker">Partner / 0{activePartner + 1}</span>
                        <h4>{partner.name}</h4>
                        <p>{partner.detail}</p>
                      </div>
                      <div className="carousel-controls partner-side-controls">
                        <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => movePartner(-1)} aria-label="Previous partner">&#8249;</button>
                        <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => movePartner(1)} aria-label="Next partner">&#8250;</button>
                      </div>
                    </article>
                  );
                })()}
              </div>
              <div className="service-carousel-footer">
                <div className="service-dots" aria-label="Choose a partner">
                  {partnerCapabilities.map((partner, index) => (
                    <button
                      className={activePartner === index ? "is-active" : ""}
                      key={partner.name}
                      type="button"
                      aria-label={"Show " + partner.name}
                      aria-current={activePartner === index ? "true" : undefined}
                      onClick={() => setActivePartner(index)}
                    />
                  ))}
                </div>
                <span className="swipe-hint">Swipe or use arrows</span>
              </div>
            </div>
          </section>

          <div className="service-promise" aria-label="Our service commitments">
            <p>Quality materials</p>
            <span aria-hidden="true">/</span>
            <p>Practical execution</p>
            <span aria-hidden="true">/</span>
            <p>Aftersales support</p>
          </div>
        </div>
      </section>

      <section className="works-section" id="work" aria-labelledby="works-title">
        <div className="works-wrap">
          <header className="works-heading">
            <div>
              <p className="services-eyebrow"><span /> Our works</p>
              <h2 id="works-title">Completed<br /><em>projects.</em></h2>
            </div>
          </header>
          <div className="work-carousel" role="region" aria-roledescription="carousel" aria-label="Completed projects">
            <div className="service-carousel-toolbar">
              <p className="carousel-count"><span>0{activeWork + 1}</span> / 0{completedProjects.length}</p>
            </div>
            <div
              className="work-track"
              aria-live="polite"
              onPointerDown={(event) => {
                workSwipeStart.current = event.clientX;
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerUp={(event) => {
                if (workSwipeStart.current === null) return;
                const distance = event.clientX - workSwipeStart.current;
                if (Math.abs(distance) > 45) moveWork(distance < 0 ? 1 : -1);
                workSwipeStart.current = null;
              }}
              onPointerCancel={() => { workSwipeStart.current = null; }}
            >
              {(() => {
                const project = completedProjects[activeWork];
                return (
                  <article
                    className="work-slide"
                    key={project.number}
                    aria-roledescription="slide"
                    aria-label={String(activeWork + 1) + " of " + completedProjects.length}
                  >
                    <div className="work-image-caption">
                      <p className="work-category">{project.category}</p>
                      <h3>{project.name}</h3>
                      <p className="work-scope">{project.scope}</p>
                      <p className="work-meta"><span>{project.location}</span><i />{project.period}</p>
                      <button className="view-gallery-button" type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => setSelectedWork(activeWork)}>
                        View Project Gallery <span className="arrow-icon" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M4.5 11.5 11.5 4.5M5 4.5h6.5V11" /></svg></span>
                      </button>
                    </div>
                    <div className="carousel-controls work-side-controls">
                      <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => moveWork(-1)} aria-label="Previous project">&#8249;</button>
                      <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => moveWork(1)} aria-label="Next project">&#8250;</button>
                    </div>
                  </article>
                );
              })()}
            </div>
            <div className="service-carousel-footer">
              <div className="service-dots" aria-label="Choose a project">
                {completedProjects.map((project, index) => (
                  <button
                    className={activeWork === index ? "is-active" : ""}
                    key={project.number}
                    type="button"
                    aria-label={"Show " + project.name}
                    aria-current={activeWork === index ? "true" : undefined}
                    onClick={() => setActiveWork(index)}
                  />
                ))}
              </div>
              <span className="swipe-hint">Swipe or use arrows</span>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="gallery-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedWork(null);
        }}>
          <section className="project-gallery-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
            <header className="gallery-header">
              <div>
                <p className="services-eyebrow"><span /> {selectedProject.category}</p>
                <h2 id="gallery-title">{selectedProject.name}</h2>
                <p className="gallery-summary">{selectedProject.scope} <i /> {selectedProject.location} <i /> {selectedProject.period}</p>
              </div>
              <button className="gallery-close" type="button" onClick={() => setSelectedWork(null)} aria-label="Close project gallery">&#215;</button>
            </header>
            {selectedProject.images.length > 0 ? <div className="project-gallery-grid">
              {selectedProject.images.map((photo, index) => (
                <div className="project-gallery-image" key={photo + index} style={{ backgroundImage: "linear-gradient(0deg, rgba(8,17,30,.5), transparent 50%), url(" + photo + ")" }}>
                  <span>Project photo {String(index + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div> : <p className="gallery-empty">Project photos will be added here.</p>}
          </section>
        </div>
      )}
    </main>
    <footer className="site-footer" id="contact">
      <div className="site-footer-inner">
        <div className="footer-item">
          <span className="footer-label">Address</span>
          <address>Portion 3205C, Fungi Street Taurama RD<br />Port Moresby,<br />Papua New Guinea</address>
        </div>
        <div className="footer-item">
          <span className="footer-label">Email</span>
          <a href="mailto:info@larkinpng.com">info@larkinpng.com</a>
        </div>
        <div className="footer-item">
          <span className="footer-label">Phone</span>
          <a href="tel:+6753202777">+675 320 2777</a>
        </div>
      </div>
    </footer>
    </>
  );
}
