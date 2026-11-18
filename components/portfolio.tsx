'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Menu, X } from 'lucide-react'
import { projects } from '@/lib/projects'

const navItems = [
  { id: 'home', label: 'Bosh sahifa' },
  { id: 'about', label: 'Men haqimda' },
  { id: 'skills', label: "Ko'nikmalar" },
  { id: 'projects', label: 'Loyihalar' },
  { id: 'journey', label: 'Jarayon' },
  { id: 'contact', label: 'Bog‘lanish' },
]
const skills = [
  { title: 'Veb dasturlash va Telegram', description: 'Zamonaviy veb-sahifalar, backend xizmatlari, deploy va Telegram ekotizimi uchun yechimlar yarataman.', items: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Django', 'Node.js', 'Render', 'Vercel', 'aiogram 3.x', 'pyTelegramBotAPI', 'Telegram Mini Apps'] },
  { title: 'Dizayn va 3D modellashtirish', description: 'Veb-interfeys, vektor grafika va logotiplardan tortib 3D veb-dizayn hamda generativ 3D modellargacha ishlayman.', items: ['UI/UX', 'Figma', 'Inkscape', 'Canva', 'Three.js', 'WebGL', 'Spline', 'Meshy AI', 'Trellis 2', 'Luma AI', 'Rodin 3D'] },
  { title: 'Sun’iy intellekt va avtomatlashtirish', description: 'AI kontent yaratish, takrorlanuvchi ishlarni avtomatlashtirish, dizaynni kodga o‘tkazish va mahalliy AI tizimlarini sozlash bilan shug‘ullanaman.', items: ['ElevenLabs', 'Firecrawl', 'Perplexity', 'AI skriptlar', 'Locofy.ai', 'Builder.io Visual Copilot', 'MCP', 'LibreChat', 'OmniRoute'] },
  { title: 'Tizimlar va ish muhiti', description: 'Dasturlash vositalari, buyruqlar satri, virtual mashinalar va Linux muhitlarida ishlayman.', items: ['VS Code', 'PowerShell', 'Git Bash', 'CMD', 'VirtualBox', 'Linux', 'Kali Linux'] },
  { title: 'Fanlar, muhandislik va tillar', description: '5–11-sinflar darajasida algebra, geometriya, fizika va kimyo; A4 formatida 1:1 masshtabli detal proyeksiyalari. O‘zbek, rus va ingliz tillari.', items: ['Algebra', 'Geometriya', 'Fizika', 'Kimyo', 'Muhandislik grafikasi', 'O‘zbek', 'Русский', 'English'] },
]

const tickerItems = ['HTML5', 'CSS3', 'JAVASCRIPT', 'PYTHON', 'DJANGO', 'NODE.JS', 'TELEGRAM BOTLAR', 'MINI APPS', 'UI/UX', '3D DIZAYN', 'AI VOSITALARI']

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const current = sections.filter((section): section is HTMLElement => !!section)
        .find((section) => section.getBoundingClientRect().top <= 160 && section.getBoundingClientRect().bottom > 160)
      if (current) setActive(current.id)
    }
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    updateActiveSection()
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        currentObserver.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })

    reveals.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <Link className="brand" href="/#home" aria-label="JAVOH home" data-loader-target>JAVOH<span>®</span></Link>
        <nav className="desktop-nav" aria-label="Asosiy menyu">
          {navItems.map((item) => <a key={item.id} className={active === item.id ? 'nav-link active' : 'nav-link'} href={`#${item.id}`}><span>{item.label}</span><span aria-hidden="true">{item.label}</span></a>)}
        </nav>
        <a className="header-contact" href="#contact">BOG&apos;LANISH <ArrowUpRight size={14} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        {navItems.map((item, index) => <a key={item.id} tabIndex={menuOpen ? 0 : -1} href={`#${item.id}`} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{item.label}<ArrowUpRight size={18} /></a>)}
      </div>

      <section id="home" className="hero section-pad">
        <div className="hero-ticker" role="group" aria-label="Texnologiyalar va loyiha yo‘nalishlari" tabIndex={0}>
          <span className="sr-only">{tickerItems.join(', ')}</span>
          <div className="ticker-track" aria-hidden="true">{[0, 1].map((copy) => <ul key={copy} className="ticker-group">{tickerItems.map((item) => <li key={item}>{item}</li>)}</ul>)}</div>
        </div>
        <div className="hero-meta"><span><i className="status-dot" /> MUSTAQIL DASTURCHI VA DIZAYNER</span><span>WEB · TELEGRAM · AI · 3D <ArrowUpRight size={12} /></span></div>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow"><i className="status-dot" /> SALOM, MEN JAVOHIR DILMURODOVMAN</p>
            <h1 className="hero-name">JAVOHIR<br /><em>DILMURODOV</em></h1>
            <div className="hero-bottom"><p>Veb-saytlar, Telegram botlari va AI vositalari orqali g&apos;oyalarni ishlaydigan tajribaga aylantiraman.</p><div className="hero-actions"><a href="#projects" className="button button-light">Loyihalarni ko&apos;rish <ArrowDownRight size={16} /></a><a href="#about" className="text-link">Men haqimda <ArrowDown size={14} /></a></div></div>
          </div>
          <div className="hero-object" aria-label="Raqamli g‘oyani ifodalovchi vizual kompozitsiya"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="orb-core"><Asterisk size={70} strokeWidth={0.65}/></div><span className="orb-label">IDEAS INTO<br/>INTERFACES</span><span className="orb-index">01 — 06</span></div>
        </div>
        <div className="hero-foot"><span>PASTGA TUSHIB KO&apos;RING</span><a href="#about" aria-label="Men haqimda bo‘limiga o‘tish"><ArrowDown size={17}/></a><span>6 TA TANLANGAN LOYIHA</span></div>
      </section>

      <section id="about" className="about section-pad">
        <Reveal className="about-heading"><span className="about-index" aria-hidden="true">01</span><div className="about-title"><span className="section-kicker">ABOUT / MEN HAQIMDA</span><h2>MEN <mark>KIMMAN?</mark></h2></div><span className="about-sticker" aria-hidden="true">hello!</span></Reveal>
        <Reveal className="about-content"><figure className="about-portrait"><Image src="/javohir-portrait.png" alt="Javohir Dilmurodovning portret surati" fill sizes="(max-width: 640px) 100vw, 42vw" className="portrait-image" /><span className="portrait-tape portrait-tape-left" aria-hidden="true"/><span className="portrait-tape portrait-tape-right" aria-hidden="true"/><figcaption>PORTRET / JAVOHIR<span>2026</span></figcaption></figure><div className="about-details"><span className="about-kicker">SALOM, MEN JAVOHIRMAN</span><p className="lead">Men Javohir Dilmurodovman — g‘oyani foydalanuvchiga qulay, ishlaydigan raqamli yechimga aylantiraman.</p><p>Veb-sayt va ilovalar, Telegram botlari va Mini Apps, UI/UX dizayn, 3D sahnalar hamda sun’iy intellekt asosidagi yechimlar ustida ishlay olaman.</p><p className="about-nickname">Menga Javoh deb murojaat qiling.</p><ul className="about-facts" aria-label="Asosiy yo‘nalishlar"><li><strong>HTML · CSS · JavaScript</strong><span>FRONTEND</span></li><li><strong>Python · Django · Node.js</strong><span>BACKEND</span></li><li><strong>Botlar · Mini Apps</strong><span>TELEGRAM</span></li><li><strong>AI · 3D · UI/UX</strong><span>IJODIY VOSITALAR</span></li></ul><a href="#projects" className="text-link">Loyihalarimni ko&apos;rish <ArrowDownRight size={15}/></a></div></Reveal>
        <Reveal><div className="about-strip"><span>DOIM IZLANISHDA</span><span>MAQSAD BILAN YARATILGAN <Asterisk size={15}/></span><span>RIVOJLANISHDA DAVOM ETADI</span></div></Reveal>
      </section>

      <section id="skills" className="skills section-pad">
        <Reveal><div className="section-heading"><span className="section-kicker">02 / KO&apos;NIKMALAR</span><span className="section-side">TEXNOLOGIYALAR VA QIZIQISHLAR</span></div><div className="skills-title"><h2>Men nimalar<br/><em>qila olaman?</em></h2><span>G‘OYADAN ISHLAYDIGAN YECHIMGACHA</span></div></Reveal>
        <div className="skills-grid" aria-label="Barcha ko‘nikmalar va bilimlarim">{skills.map((skill, index) => <Reveal key={skill.title}><article className="skill-card"><div className="skill-card-heading"><span>0{index + 1}</span><ArrowUpRight size={17}/></div><h3>{skill.title}</h3><p>{skill.description}</p><ul className="skill-tags">{skill.items.map((item) => <li key={item}>{item}</li>)}</ul></article></Reveal>)}</div>
      </section>

      <section id="projects" className="projects section-pad">
        <Reveal><div className="section-heading"><span className="section-kicker">03 / LOYIHALAR</span><span className="section-side">TANLANGAN ISHLAR</span></div><div className="projects-title"><h2>G&apos;oyalar<br/><em>amalda.</em></h2><span className="projects-count">06<br/><i>LOYIHA</i></span></div></Reveal>
        <div className="project-grid">{projects.map((project, index) => <Reveal key={project.slug} className={`project-card project-card-${index + 1}`}><Link href={`/projects/${project.slug}`} className="project-image-link" aria-label={`${project.name} loyihasi haqida ko‘rish`}><div className="project-image"><Image src={project.image} alt={`${project.name} loyihasi veb-saytining tasviri`} fill sizes="(max-width: 700px) 100vw, 50vw" className="project-shot" priority={index < 2}/><span className="image-overlay"><span>LOYIHANI KO‘RISH <ArrowUpRight size={17}/></span></span><span className="project-number">0{index + 1} / 06</span></div></Link><div className="project-info"><div><span>{project.category}</span><h3>{project.name}</h3></div><div className="project-links"><a href={project.url} target="_blank" rel="noreferrer" aria-label={`${project.name} saytini to‘liq ko‘rish`}>TO‘LIQ KO‘RISH <ArrowUpRight size={14}/></a><Link href={`/projects/${project.slug}`} aria-label={`${project.name} loyihasi haqida`}>BATAFSIL <ArrowRight size={14}/></Link></div></div><p className="project-summary">{project.summary}</p><ul className="project-tech" aria-label={`${project.name} loyihasida ishlatilgan texnologiyalar`}>{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul></Reveal>)}</div>
      </section>

      <section id="journey" className="journey section-pad">
        <Reveal><div className="section-heading"><span className="section-kicker">04 / ISH JARAYONI</span><span className="section-side">G&apos;OYADAN TAYYOR MAHSULOTGACHA</span></div><h2>G&apos;oyadan<br/><em>ishga tushirishgacha.</em></h2></Reveal>
        <div className="journey-list">{[
          ['01', 'Tushunish', 'Vazifa, foydalanuvchi va mahsulot maqsadini aniqlab olaman.'],
          ['02', 'Rejalash', 'Tuzilma, texnologiya va ishlash yo‘lini tanlayman.'],
          ['03', 'Dizayn', 'Interfeysning vizual tilini va qulay foydalanish yo‘lini ishlab chiqaman.'],
          ['04', 'Dasturlash', 'Frontend, backend yoki bot qismlarini yaratib, sinovdan o‘tkazaman.'],
          ['05', 'Joylashtirish', 'Tayyor mahsulotni Vercel yoki Render platformasiga chiqaraman.'],
        ].map(([n, title, body]) => <Reveal key={n} className="journey-row"><span className="journey-num">{n}</span><h3>{title}</h3><p>{body}</p><ArrowUpRight size={16}/></Reveal>)}</div>
      </section>

      <section id="contact" className="contact section-pad">
        <Reveal><div className="section-heading"><span className="section-kicker">05 / BOG‘LANISH</span><span className="section-side">YANGI G‘OYALARGA OCHIQMAN</span></div><div className="contact-grid"><div><p className="eyebrow"><i className="status-dot"/> LOYIHA USTIDA BIRGA ISHLAYMIZMI?</p><h2>Biror g&apos;oya<br/><em>bormi?</em></h2><p className="contact-note">Loyiha, hamkorlik yoki savolingiz bo‘lsa, menga to‘g‘ridan-to‘g‘ri yozing yoki qo‘ng‘iroq qiling.</p></div><div className="contact-methods"><a href="mailto:javoh8912@gmail.com"><span>EMAIL</span><strong>javoh8912@gmail.com</strong><ArrowUpRight size={18}/></a><a href="tel:+9980097643"><span>TELEFON</span><strong>+9980097643</strong><ArrowUpRight size={18}/></a></div></div></Reveal>
      </section>

      <footer className="site-footer section-pad"><div className="footer-top"><Link className="brand" href="#home">JAVOH<span>®</span></Link><p>Javohir tomonidan<br/>yaratilgan raqamli tajribalar.</p><a href="#home" className="back-top">YUQORIGA <ArrowRight size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} JAVOH</span><nav aria-label="Pastki menyu">{navItems.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav><span>DOIM IZLANISHDA <Asterisk size={13}/></span></div></footer>
    </main>
  )
}
