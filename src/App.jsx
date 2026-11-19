import { Fragment, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Camera,
  Check,
  CirclePlay,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react'
import logoImage from './assets/svs-enterprises-logo.png'
import { WHATSAPP_NUMBER } from './config'
import './App.css'

const photos = {
  hero: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=88',
  about: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  aboutDetail: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=82',
  services: [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82',
  ],
  projects: [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=86',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=86',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=86',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=86',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=86',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=86',
  ],
  cta: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=86',
}

const navigation = [
  ['Home', '#home'],
  ['About Us', '#about'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Gallery', '#gallery'],
  ['Contact', '#contact'],
]

const services = [
  'Residential Interior Design',
  'Modular Kitchen Design',
  'Living Room Interiors',
  'Bedroom Interior Design',
  'Office & Commercial Interiors',
  'Complete Home Renovation',
  'False Ceiling & Lighting',
  'Custom Furniture & Wardrobes',
]

const projects = [
  { title: 'The quiet retreat', category: 'Living room', image: photos.projects[0], detail: 'A layered living space shaped by warm neutrals, tactile finishes and considered lighting.' },
  { title: 'The everyday ritual', category: 'Modular kitchen', image: photos.projects[1], detail: 'A light-filled kitchen concept that brings clear lines and everyday function together.' },
  { title: 'A softer morning', category: 'Master bedroom', image: photos.projects[2], detail: 'An inviting bedroom study in natural textures, soft light and understated contrast.' },
  { title: 'The considered office', category: 'Workplace', image: photos.projects[3], detail: 'A contemporary workspace concept balancing focus, comfort and a welcoming first impression.' },
  { title: 'A home in harmony', category: 'Apartment interiors', image: photos.projects[4], detail: 'A cohesive apartment palette where thoughtful details connect every room.' },
  { title: 'Less, made meaningful', category: 'Minimal home', image: photos.projects[5], detail: 'A restrained interior concept celebrating materiality, proportion and calm.' },
]

const principles = [
  'Creative design approach',
  'Carefully considered materials',
  'Attention to detail',
  'Functional space planning',
  'Modern design concepts',
  'Professional execution',
]

const process = [
  { number: '01', title: 'Consultation', text: 'We listen closely to your needs, routines and aspirations for the space.' },
  { number: '02', title: 'Concept & planning', text: 'We shape the direction, layout and priorities around the way you live.' },
  { number: '03', title: 'Design & selection', text: 'Materials, finishes and details come together into a considered design.' },
  { number: '04', title: 'Final execution', text: 'The design is brought to life with care, clarity and close attention.' },
]

const testimonials = [
  {
    quote: '“The final result feels considered, calm and completely personal. Every detail has a purpose.”',
    name: 'Demo client name',
    project: 'Residential interior · Placeholder review',
  },
  {
    quote: '“From the first conversation to the finishing touches, the whole process felt thoughtfully guided.”',
    name: 'Demo client name',
    project: 'Full-home design · Placeholder review',
  },
  {
    quote: '“Our space now feels more open, more functional and unmistakably ours.”',
    name: 'Demo client name',
    project: 'Living room design · Placeholder review',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const revealImage = {
  hidden: { opacity: 0, clipPath: 'inset(12% 0 0 0)', scale: 1.035 },
  visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)', scale: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

const heroWords = ['Transforming', 'Spaces', 'Into', 'Extraordinary', 'Experiences']
const heroTitleVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.42, staggerChildren: 0.095 } },
}
const heroWordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
}

function Reveal({ children, className = '', delay = 0, imageReveal = false }) {
  return (
    <motion.div
      className={className}
      variants={imageReveal ? revealImage : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function Brand({ inverse = false }) {
  return (
    <a className={`brand${inverse ? ' brand--inverse' : ''}`} href="#home" aria-label="SVS Enterprises home">
      <img src={logoImage} alt="SVS Enterprises" />
    </a>
  )
}

function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function MagneticLink({ children, className, ...props }) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.35 })

  const moveTowardPointer = (event) => {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.13)
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.16)
  }

  const returnToCenter = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      {...props}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={moveTowardPointer}
      onMouseLeave={returnToCenter}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  )
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24)
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header className={`site-header${isScrolled ? ' site-header--scrolled' : ''}${menuOpen ? ' site-header--menu-open' : ''}`}>
      <div className="nav-shell">
        <Brand inverse={!isScrolled && !menuOpen} />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' primary-nav--open' : ''}`} aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Get a free consultation <ArrowUpRight size={15} strokeWidth={1.7} />
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 85])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.035, 1.13])

  return (
    <section className="hero" id="home" ref={heroRef}>
      <motion.div
        className="hero__image"
        style={{ backgroundImage: `url("${photos.hero}")`, y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : imageScale }}
        initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="hero__shade" />
      <div className="hero__content">
        <motion.span
          className="eyebrow eyebrow--light"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Thoughtful interiors, made personal
        </motion.span>
        <motion.h1 aria-label="Transforming Spaces Into Extraordinary Experiences" variants={heroTitleVariants} initial="hidden" animate="visible">
          {heroWords.map((word, index) => (
            <Fragment key={word}>
              <span className="hero__word">
                <motion.span variants={heroWordVariants}>
                  {index === 3 ? <em>{word}</em> : word}
                </motion.span>
              </span>
              {index < heroWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          Thoughtfully Designed Interiors. Timeless Elegance. Exceptional Living.
        </motion.p>
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <MagneticLink className="button button--light" href="#projects">Explore Our Projects <ArrowUpRight size={16} /></MagneticLink>
          <MagneticLink className="button button--outline-light" href="#contact">Get a Free Consultation</MagneticLink>
        </motion.div>
      </div>
      <motion.div className="hero__seal" aria-hidden="true" animate={reduceMotion ? undefined : { y: [0, -9, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <span>Designed</span>
        <i />
        <span>around you</span>
      </motion.div>
      <a className="hero__scroll" href="#about"><span>Scroll to discover</span><ArrowDown size={16} /></a>
      <div className="hero__index">01 <span>/</span> 04</div>
    </section>
  )
}

function About() {
  const imageRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [18, -18])

  return (
    <section className="about section-pad" id="about">
      <div className="container about__grid">
        <Reveal className="about__image-wrap" imageReveal>
          <motion.img ref={imageRef} className="about__image" src={photos.about} alt="Warm, contemporary living room with thoughtful natural finishes" style={{ y: reduceMotion ? 0 : imageY }} />
          <div className="about__floating-image">
            <img src={photos.aboutDetail} alt="A calm, naturally lit interior detail" loading="lazy" />
            <span>Considered in every detail</span>
          </div>
          <div className="about__image-note"><span>01</span> Spaces shaped around living</div>
        </Reveal>
        <Reveal className="about__copy" delay={0.1}>
          <span className="eyebrow">A considered point of view</span>
          <h2>Designing Spaces.<br /><em>Creating Experiences.</em></h2>
          <p className="about__lead">A well-designed space should feel like it could only belong to you.</p>
          <p>SVS Enterprises is a modern interior design company focused on beautiful, functional and thoughtfully designed spaces. We bring together a clear design point of view and the details of everyday life to make interiors that feel effortless to live in.</p>
          <a className="text-link" href="#services">Discover our approach <ArrowUpRight size={16} /></a>
          <div className="about__signature"><span className="signature-rule" /> <span>Thoughtful by design</span></div>
        </Reveal>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="services section-pad" id="services">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title={<>Spaces for the way<br className="desktop-break" /> you want to live.</>}
            description="From a single room to a complete home, considered design for every kind of space."
          />
        </Reveal>
        <div className="service-grid">
          {services.map((service, index) => (
            <Reveal className="service-card" delay={(index % 4) * 0.06} imageReveal key={service}>
              <a className="service-card__link" href="#contact" aria-label={`Explore ${service}`}>
                <div className="service-card__image">
                  <img src={photos.services[index]} alt="" loading="lazy" />
                  <span className="service-card__number">0{index + 1}</span>
                  <span className="service-card__arrow"><ArrowUpRight size={19} /></span>
                </div>
                <div className="service-card__meta">
                  <h3>{service}</h3>
                  <span>Explore more</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects({ onSelectProject }) {
  return (
    <section className="projects section-pad" id="projects">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="A sense of place."
            description="Interior concepts that balance beautiful details with the way a space is lived in."
          />
        </Reveal>
        <div className="project-grid" id="gallery">
          {projects.map((project, index) => (
            <Reveal className={`project-card project-card--${index + 1}`} delay={(index % 3) * 0.06} imageReveal key={project.title}>
              <button type="button" className="project-card__button" onClick={() => onSelectProject(index)} aria-label={`View ${project.title}, ${project.category}`}>
                <img src={project.image} alt={`${project.category} interior concept`} loading="lazy" />
                <span className="project-card__veil" />
                <span className="project-card__info">
                  <span className="project-card__category">{project.category}</span>
                  <span className="project-card__title">{project.title}</span>
                </span>
                <span className="project-card__open"><ArrowUpRight size={20} /></span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="projects__foot"><span>Concept imagery · Illustrative portfolio</span><a className="text-link" href="#contact">Discuss your project <ArrowUpRight size={16} /></a></div>
      </div>
    </section>
  )
}

function WhyChoose() {
  return (
    <section className="approach section-pad">
      <div className="container approach__grid">
        <Reveal className="approach__intro">
          <span className="eyebrow eyebrow--light">The SVS difference</span>
          <h2>Thoughtful in every <em>detail.</em></h2>
          <p>Good design is more than how a room looks. It is the considered choices that make it work beautifully, day after day.</p>
          <MagneticLink className="button button--outline-light" href="#contact">Start a conversation <ArrowUpRight size={16} /></MagneticLink>
        </Reveal>
        <div className="approach__list">
          {principles.map((principle, index) => (
            <Reveal className="approach-item" delay={index * 0.04} key={principle}>
              <span className="approach-item__number">0{index + 1}</span>
              <h3>{principle}</h3>
              <Check size={17} strokeWidth={1.4} aria-hidden="true" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="process section-pad">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="From first thought to final detail"
            title="A clear path to a considered space."
            description="A collaborative process, shaped around your project from the very beginning."
          />
        </Reveal>
        <div className="process-grid">
          {process.map((step, index) => (
            <Reveal className="process-step" delay={index * 0.08} key={step.number}>
              <div className="process-step__top"><span>{step.number}</span><span className="process-step__line" /></div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const goTo = (direction) => setActive((current) => (current + direction + testimonials.length) % testimonials.length)
  const testimonial = testimonials[active]

  return (
    <section className="testimonials section-pad">
      <div className="container testimonials__container">
        <Reveal><span className="eyebrow">Words, in progress</span></Reveal>
        <div className="testimonials__layout">
          <Reveal className="testimonials__heading">
            <h2>Thoughtful spaces.<br /><em>Personal stories.</em></h2>
            <p>Placeholder testimonials shown for demo purposes only. Replace with approved client feedback before publishing.</p>
          </Reveal>
          <Reveal className="testimonial-card" delay={0.12}>
            <span className="testimonial-card__quote-mark">“</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="testimonial-card__content"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28 }}
              >
                <p className="testimonial-card__quote">{testimonial.quote}</p>
                <div className="testimonial-card__byline">
                  <span>{testimonial.name}</span>
                  <span>{testimonial.project}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="testimonial-card__controls">
              <span>0{active + 1} <span className="testimonial-card__total">/ 0{testimonials.length}</span></span>
              <div>
                <button type="button" onClick={() => goTo(-1)} aria-label="Previous testimonial"><ArrowLeft size={17} /></button>
                <button type="button" onClick={() => goTo(1)} aria-label="Next testimonial"><ArrowRight size={17} /></button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  const calloutRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: calloutRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [48, -48])

  return (
    <section className="callout" ref={calloutRef}>
      <motion.div className="callout__image" style={{ backgroundImage: `url("${photos.cta}")`, y: reduceMotion ? 0 : imageY }} />
      <div className="callout__shade" />
      <Reveal className="callout__content">
        <span className="eyebrow eyebrow--light">Your space, thoughtfully considered</span>
        <h2>Let’s Create a Space<br />You’ll <em>Love.</em></h2>
        <MagneticLink className="button button--light" href="#contact">Start your project <ArrowUpRight size={16} /></MagneticLink>
      </Reveal>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('Your details are valid. This demo form is not connected to an inbox yet.')
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="container contact__grid">
        <Reveal className="contact__intro">
          <span className="eyebrow">Let’s make room for better living</span>
          <h2>Tell us what<br /><em>you have in mind.</em></h2>
          <p>Share a little about your project and we’ll be in touch. Contact details can be added here when you’re ready to publish.</p>
          <div className="contact__details">
            <div><span>Email</span><p>[Add business email]</p></div>
            <div><span>Phone</span><p>[Add business phone]</p></div>
            <div><span>Location</span><p>[Add business address]</p></div>
          </div>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
              <label>Phone number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" onChange={(event) => event.currentTarget.setCustomValidity(!event.currentTarget.value || /^[+]?[0-9 ()-]{7,20}$/.test(event.currentTarget.value) ? '' : 'Enter a valid phone number.')} title="Enter a valid phone number" placeholder="Your phone number" required /></label>
            </div>
            <div className="form-row">
              <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
              <label>Project type
                <select name="projectType" defaultValue="" required>
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
              </label>
            </div>
            <label>Tell us about your project<textarea name="message" rows="4" placeholder="A few details about your space, ideas or timeline..." required /></label>
            <div className="contact-form__bottom">
              <button className="button button--burgundy" type="submit">Submit enquiry <ArrowUpRight size={16} /></button>
              <span>We’ll only use your details to respond to your enquiry.</span>
            </div>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand inverse />
            <p>Thoughtful interiors for more beautiful, functional ways to live.</p>
            <span className="footer-social-note">Social profiles to be added</span>
            <div className="social-icons" aria-label="Social profile placeholders">
              <span aria-label="Social photo profile to be added"><Camera size={17} /></span>
              <span aria-label="Social profile to be added"><AtSign size={17} /></span>
              <span aria-label="Video profile to be added"><CirclePlay size={18} /></span>
            </div>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            {navigation.slice(0, 5).map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </div>
          <div className="footer-column">
            <h3>Our services</h3>
            {services.slice(0, 5).map((service) => <a href="#services" key={service}>{service}</a>)}
          </div>
          <div className="footer-column footer-column--contact">
            <h3>Start a conversation</h3>
            <p>[Add business email]</p>
            <p>[Add business phone]</p>
            <a className="footer-contact-link" href="#contact">Get in touch <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SVS Enterprises. All rights reserved.</span>
          <span>Designed with intention.</span>
        </div>
      </div>
    </footer>
  )
}

function ProjectDialog({ activeIndex, onClose, onChange }) {
  const project = activeIndex === null ? null : projects[activeIndex]

  useEffect(() => {
    if (!project) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange(1)
      if (event.key === 'ArrowLeft') onChange(-1)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('dialog-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('dialog-open')
    }
  }, [project, onClose, onChange])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="project-dialog" role="dialog" aria-modal="true" aria-label={`${project.title} project`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button className="project-dialog__close" type="button" onClick={onClose} aria-label="Close project view"><X size={22} /></button>
          <button className="project-dialog__arrow project-dialog__arrow--prev" type="button" onClick={(event) => { event.stopPropagation(); onChange(-1) }} aria-label="Previous project"><ArrowLeft size={20} /></button>
          <motion.div className="project-dialog__panel" initial={{ y: 18, scale: 0.985 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, scale: 0.99 }} onClick={(event) => event.stopPropagation()}>
            <img src={project.image} alt={`${project.category} interior concept`} />
            <div className="project-dialog__caption"><span>{project.category}</span><h2>{project.title}</h2><p>{project.detail}</p><small>Illustrative concept imagery · Demo portfolio</small></div>
          </motion.div>
          <button className="project-dialog__arrow project-dialog__arrow--next" type="button" onClick={(event) => { event.stopPropagation(); onChange(1) }} aria-label="Next project"><ArrowRight size={20} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const changeProject = (direction) => setActiveProject((current) => (current + direction + projects.length) % projects.length)
  const whatsappUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent('Hello, I would like to enquire about an interior design project.')}`
    : '#contact'

  return (
    <MotionConfig reducedMotion="user">
      <>
      <Header />
      <motion.main className="min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.65, ease: 'easeOut' }}>
        <Hero />
        <About />
        <Services />
        <Projects onSelectProject={setActiveProject} />
        <WhyChoose />
        <Process />
        <Testimonials />
        <CallToAction />
        <Contact />
      </motion.main>
      <Footer />
      <a className="whatsapp-float" href={whatsappUrl} aria-label={WHATSAPP_NUMBER ? 'Chat with SVS Enterprises on WhatsApp' : 'Add a WhatsApp number to enquire'} target={WHATSAPP_NUMBER ? '_blank' : undefined} rel={WHATSAPP_NUMBER ? 'noreferrer' : undefined}>
        <MessageCircle size={21} />
        <span>{WHATSAPP_NUMBER ? 'WhatsApp us' : 'Enquire'}</span>
      </a>
      <ProjectDialog
        activeIndex={activeProject}
        onClose={() => setActiveProject(null)}
        onChange={changeProject}
      />
      </>
    </MotionConfig>
  )
}

export default App
