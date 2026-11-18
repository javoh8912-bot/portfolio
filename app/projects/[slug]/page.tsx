import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { getProject, projects } from '@/lib/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const index = projects.findIndex((item) => item.slug === project.slug)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <main className={`case-page case-${project.slug}`}>
      <header className="case-header"><Link href="/#home" className="brand" data-loader-target>JAVOH<span>®</span></Link><Link href="/#projects" className="back-projects"><ArrowLeft size={15}/> BARCHA LOYIHALAR</Link><span>LOYIHA / 0{index + 1}</span></header>
      <section className="case-intro section-pad"><p className="section-kicker">{project.category}</p><h1>{project.name}<span>.</span></h1><p className="case-summary">{project.summary}</p></section>
      <section className="case-live section-pad" aria-labelledby="case-live-title"><div className="case-live-heading"><div><span className="case-live-label">JONLI SAYT KO‘RINISHI</span><h2 id="case-live-title">Loyihaning o‘zini ko‘ring.</h2></div><a href={project.url} target="_blank" rel="noreferrer" className="button button-light">TO‘LIQ KO‘RISH <ArrowUpRight size={16}/></a></div><div className="case-browser"><div className="case-browser-bar"><span className="case-browser-dots" aria-hidden="true"><i/><i/><i/></span><span className="case-browser-address">{new URL(project.url).host}</span></div><div className="case-browser-frame"><iframe src={project.url} title={`${project.name} jonli sayt ko‘rinishi`} loading="eager" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" referrerPolicy="no-referrer" /></div></div></section>
      <section className="case-details section-pad"><div className="case-block"><span>01 / LOYIHA HAQIDA</span><p>{project.overview}</p></div><div className="case-block"><span>02 / DIZAYN YO‘NALISHI</span><p>{project.direction}</p></div><div className="case-block"><span>03 / KO‘RINADIGAN IMKONIYATLAR</span><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div className="case-block"><span>04 / FOYDALANILGAN TEXNOLOGIYALAR</span><div className="tag-list">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.note && <p className="case-note">{project.note}</p>}</div></section>
      <nav className="case-pagination section-pad" aria-label="Loyihalar bo‘ylab navigatsiya"><Link href={`/projects/${previous.slug}`}><span><ArrowLeft size={15}/> AVVALGI</span><strong>{previous.name}</strong></Link><Link href="/#projects" className="case-all">BARCHA LOYIHALARGA</Link><Link href={`/projects/${next.slug}`} className="next-case"><span>KEYINGI <ArrowRight size={15}/></span><strong>{next.name}</strong></Link></nav>
      <footer className="case-footer section-pad"><Link href="/#home" className="brand">JAVOH<span>®</span></Link><span>© {new Date().getFullYear()} JAVOH</span><Link href="/#contact">BOG&apos;LANISH <ArrowUpRight size={14}/></Link></footer>
    </main>
  )
}
