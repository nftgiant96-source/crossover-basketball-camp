import { useState, useEffect, useRef } from 'react'
import './App.css'
import {
  Menu, X, ChevronRight, MapPin, Phone, Mail,
  Star, ArrowRight, Users, Calendar, Target,
  CheckCircle, ChevronDown, Trophy
} from 'lucide-react'

/* ─── Brand SVG icons ─── */
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)
const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
)
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

/* ─── Scroll-triggered animation hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ─── Animated number counter ─── */
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView(0.3)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─── Section fade-up on scroll ─── */
function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Instagram embed ─── */
function InstagramEmbed({ postId }) {
  const ref = useRef(null)
  useEffect(() => {
    if (window.instgrm) window.instgrm.Embeds.process()
  }, [postId])
  return (
    <div ref={ref} className="w-full flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={`https://www.instagram.com/p/${postId}/`}
        data-instgrm-version="14"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', maxWidth: '100%', width: '100%' }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Home', 'About', 'Programs', 'Gallery', 'Register', 'Contact']

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(5,172,174,0.2)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src=""
            alt="Crossover Basketball Camp"
            className="h-10 w-auto object-contain"
            style={{ display: 'none' }}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          {/* Fallback logo */}
          <div style={{ display: 'flex' }} className="items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#05acae] to-[#049496] flex items-center justify-center font-bold text-white text-sm">
              CB
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl text-white tracking-wider leading-none">CROSSOVER</div>
              <div className="text-[10px] font-semibold tracking-[0.25em] text-[#05acae] uppercase leading-none mt-0.5">Basketball Camp</div>
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {l}
            </a>
          ))}
        </div>

        <a href="#register" className="hidden md:block btn-primary text-sm py-2.5 px-5">
          Register 2026
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '400px' : '0', background: 'rgba(10,10,10,0.98)' }}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-white/5">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-[#05acae] font-medium py-1.5 border-b border-white/5 transition-colors">
              {l}
            </a>
          ))}
          <a href="#register" onClick={() => setOpen(false)} className="btn-primary text-center text-sm mt-2">
            Register 2026
          </a>
        </div>
      </div>
    </header>
  )
}

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/crossover-basketball-camp/hero.png"
          alt="Crossover Basketball Camp"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#05acae]/8 blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pt-24 pb-20">
        <div className="max-w-3xl">
          <AnimatedSection delay={0}>
            <div className="section-label mb-4 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[#05acae]" />
              Est. 2004 · Celebrating 22 Years in London, ON
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-none tracking-wide text-white mb-2">
              DEVELOP
            </h1>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-none tracking-wide mb-6">
              <span className="text-gradient">YOUR GAME.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-gray-300 text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
              London's longest-running basketball camp returns for another summer. Elite coaching, real development, and a community built over 22 years.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#register" className="btn-primary text-center">
                Register for 2026
              </a>
              <a href="#programs" className="btn-outline text-center">
                View Programs
              </a>
            </div>
          </AnimatedSection>

          {/* Camp details strip */}
          <AnimatedSection delay={450}>
            <div className="flex flex-wrap gap-6 sm:gap-10 mt-14 pt-10 border-t border-white/10">
              {[
                { value: 'July 6–10', label: '2026 Dates' },
                { value: '$325', label: 'Per Camper' },
                { value: 'London, ON', label: 'Location' },
                { value: '22nd', label: 'Year Running' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl sm:text-3xl text-[#05acae] tracking-wide">{s.value}</div>
                  <div className="text-xs text-gray-400 font-medium tracking-widest uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-[#05acae] transition-colors">
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════ */
function About() {
  const pillars = [
    { icon: <Target size={20} />, title: 'Skill Development', desc: 'Position-specific drills and fundamentals coached by experienced, proven staff.' },
    { icon: <Users size={20} />, title: 'Community First', desc: 'Brotherhood built over two decades on the courts of London, Ontario.' },
    { icon: <Trophy size={20} />, title: 'Winning Mindset', desc: 'Mental toughness and competitive habits that carry beyond basketball.' },
    { icon: <Calendar size={20} />, title: '22 Years Strong', desc: 'One of Ontario\'s most trusted and longest-running youth basketball programs.' },
  ]

  return (
    <section id="about" className="relative bg-black basketball-pattern py-24 sm:py-32">
      <div className="divider-line mb-0" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                <img
                  src="/crossover-basketball-camp/coaches.png"
                  alt="Coach Graham and Coach Umar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:right-0 bg-[#05acae] text-white rounded-lg p-5 shadow-xl">
                <div className="font-display text-5xl leading-none">22</div>
                <div className="text-xs font-bold tracking-widest uppercase mt-1">Years Strong</div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#05acae]/40 rounded-tl-lg" />
            </div>
          </AnimatedSection>

          {/* Copy */}
          <div>
            <AnimatedSection delay={100}>
              <div className="section-label mb-3">Who We Are</div>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide leading-tight mb-6">
                LONDON'S CAMP.<br />
                <span className="text-gradient">22 YEARS RUNNING.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Crossover Basketball Camp has been developing athletes in London, Ontario since 2004. What started as a passion project has grown into one of the city's most respected summer basketball programs — running strong for 22 consecutive years.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Led by directors <span className="text-white font-semibold">Umar Chaudry</span> and <span className="text-white font-semibold">Graham Buchanan</span>, our coaching staff brings championship-level experience to every session. Graham led the Banting Secondary School Senior Boys to back-to-back city and WOSSA championships.
              </p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {pillars.map((p, i) => (
                <AnimatedSection key={p.title} delay={150 + i * 80}>
                  <div className="flex gap-4 p-4 rounded-lg bg-white/3 border border-white/6 hover:border-[#05acae]/30 transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-[#05acae]/10 text-[#05acae] flex items-center justify-center shrink-0 transition-all group-hover:bg-[#05acae] group-hover:text-white">
                      {p.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">{p.title}</div>
                      <div className="text-gray-500 text-xs leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   STATS BANNER
═══════════════════════════════════════════════════ */
function StatsBanner() {
  const stats = [
    { value: 22, suffix: '', label: 'Years in London' },
    { value: 2004, suffix: '', label: 'Founded' },
    { value: 5, suffix: ' Days', label: 'Camp Duration' },
    { value: 325, suffix: '$', label: 'Per Camper', prefix: '$' },
  ]

  return (
    <div className="relative bg-[#05acae] py-16 overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 basketball-pattern opacity-20" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-4">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 100}>
              <div className="text-center">
                <div className="font-display text-5xl sm:text-6xl text-white leading-none mb-2">
                  {s.prefix && s.prefix}
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-white/80 text-xs sm:text-sm font-semibold tracking-widest uppercase">{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   PROGRAMS
═══════════════════════════════════════════════════ */
function Programs() {
  const programs = [
    {
      tag: 'Junior Program',
      title: 'JR Camp',
      subtitle: 'Foundation & Fun',
      desc: 'Built for younger players learning the game. Focus on fundamentals, proper technique, and a love for basketball in a positive, encouraging environment.',
      features: [
        'Dribbling & ball-handling basics',
        'Shooting form & mechanics',
        'Teamwork & sportsmanship',
        'Fun scrimmages & competitions',
      ],
      price: '$325',
      color: '#05acae',
      accent: '#07cdd0',
    },
    {
      tag: 'Senior Program',
      title: 'SR Camp',
      subtitle: 'Compete & Develop',
      desc: 'Designed for more advanced players ready to push their game. Intense drills, competitive scenarios, and coaching focused on taking your skills to the next level.',
      features: [
        'Advanced skill development',
        'Competitive game situations',
        'Individual coaching feedback',
        'High-level scrimmages',
      ],
      price: '$325',
      color: '#049496',
      accent: '#05acae',
      featured: true,
    },
  ]

  return (
    <section id="programs" className="relative bg-[#0D0D0D] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="section-label mb-3">2026 Programs</div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
              FIND YOUR <span className="text-gradient">PROGRAM</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Two distinct tracks, one camp. Both run <strong className="text-white">July 6–10, 2026</strong> at Banting Secondary School, London, ON. Each is $325 per camper.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {programs.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 120}>
              <div className={`program-card relative h-full flex flex-col ${p.featured ? 'ring-1 ring-[#05acae]/50' : ''}`}>
                {p.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#05acae] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
                <div className="p-7 flex flex-col flex-1">
                  <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: p.accent }}>{p.tag}</div>
                  <h3 className="font-display text-3xl text-white tracking-wide mb-0.5">{p.title}</h3>
                  <div className="text-sm text-gray-500 mb-4">{p.subtitle}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.desc}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <CheckCircle size={14} style={{ color: p.accent, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/6 pt-6 flex items-center justify-between">
                    <div>
                      <div className="font-display text-3xl text-white">{p.price}</div>
                      <div className="text-xs text-gray-500">per camper · July 6–10</div>
                    </div>
                    <a href="#register" className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider transition-all hover:gap-3" style={{ color: p.accent }}>
                      Enroll <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Location card */}
        <AnimatedSection delay={250}>
          <div className="mt-8 max-w-3xl mx-auto rounded-xl border border-[#05acae]/20 bg-[#05acae]/5 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#05acae]/15 text-[#05acae] flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <div className="text-white font-semibold mb-0.5">Banting Secondary School — London, ON</div>
              <div className="text-gray-400 text-sm">Venue details for individual sessions confirmed closer to camp. Check back or follow <a href="https://www.instagram.com/crossover_camp" target="_blank" rel="noopener noreferrer" className="text-[#05acae] hover:underline">@crossover_camp</a> for updates.</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   GALLERY / INSTAGRAM
═══════════════════════════════════════════════════ */
function Gallery() {
  const posts = [
    { id: 'DL-Ecznu3hq', year: '2025' },
    { id: 'C77OvuAOUg9', year: '2024' },
    { id: 'Cu3ELjztXWi', year: '2023' },
  ]

  return (
    <section id="gallery" className="bg-black py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <AnimatedSection>
          <div className="text-center mb-6">
            <div className="section-label mb-3">Life at Camp</div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
              INSIDE <span className="text-gradient">CROSSOVER</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-2">
              Real moments from real campers. Follow us on Instagram for the latest from every session.
            </p>
            <a
              href="https://www.instagram.com/crossover_camp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#05acae] text-sm font-semibold hover:underline"
            >
              <InstagramIcon size={16} /> @crossover_camp
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {posts.map((p) => (
              <div key={p.id} className="w-full">
                <InstagramEmbed postId={p.id} />
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="text-center mt-10">
            <a
              href="https://www.instagram.com/crossover_camp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              <InstagramIcon size={18} /> View All on Instagram
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   DIRECTORS
═══════════════════════════════════════════════════ */
function Directors() {
  const staff = [
    {
      name: 'Umar Chaudry',
      role: 'Camp Director',
      desc: 'Co-founder of Crossover Basketball Camp and a driving force behind 22 years of community-focused player development in London, Ontario.',
      initial: 'U',
    },
    {
      name: 'Graham Buchanan',
      role: 'Camp Director & Head Coach',
      desc: 'Led the Banting Secondary School Senior Boys to back-to-back city and WOSSA championships. Brings proven championship experience to every camp session.',
      initial: 'G',
    },
  ]

  return (
    <section className="bg-[#0D0D0D] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="section-label mb-3">Leadership</div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
              MEET THE <span className="text-gradient">DIRECTORS</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {staff.map((s, i) => (
            <AnimatedSection key={s.name} delay={i * 120}>
              <div className="bg-[#141414] border border-white/6 rounded-xl p-8 hover:border-[#05acae]/30 transition-all group h-full">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#05acae] to-[#049496] flex items-center justify-center font-display text-3xl text-white mb-5 group-hover:scale-105 transition-transform">
                  {s.initial}
                </div>
                <h3 className="font-display text-2xl text-white tracking-wide mb-1">{s.name}</h3>
                <div className="text-[#05acae] text-xs font-bold tracking-widest uppercase mb-4">{s.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   REGISTRATION
═══════════════════════════════════════════════════ */
function Registration() {
  const [form, setForm] = useState({ name: '', age: '', email: '', program: '', level: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <section id="register" className="relative bg-black py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#05acae]/6 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Info */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <div className="section-label mb-3">Join Us</div>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide leading-tight mb-6">
                REGISTER FOR<br />
                <span className="text-gradient">CAMP 2026</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-10">
                Spots are limited. Register early to secure your place at London's premier basketball camp. Questions? Email or call us directly.
              </p>

              <div className="space-y-5">
                {[
                  { icon: <Calendar size={18} />, title: 'Dates', desc: 'July 6–10, 2026' },
                  { icon: <MapPin size={18} />, title: 'Location', desc: 'Banting Secondary School area, London, ON' },
                  { icon: <Users size={18} />, title: 'Programs', desc: 'JR Camp & SR Camp — $325 each' },
                  { icon: <Phone size={18} />, title: 'Phone', desc: '519.319.9034', href: 'tel:5193199034' },
                  { icon: <Mail size={18} />, title: 'Email', desc: 'crossovercamp@hotmail.com', href: 'mailto:crossovercamp@hotmail.com' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-[#05acae]/10 text-[#05acae] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm mb-0.5">{item.title}</div>
                      {item.href
                        ? <a href={item.href} className="text-gray-400 text-sm hover:text-[#05acae] transition-colors">{item.desc}</a>
                        : <div className="text-gray-400 text-sm">{item.desc}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-lg border border-[#05acae]/20 bg-[#05acae]/5">
                <p className="text-gray-400 text-sm">
                  You can also register directly at{' '}
                  <a href="https://crossoverbasketballcamp.com/registration/" target="_blank" rel="noopener noreferrer" className="text-[#05acae] hover:underline font-medium">
                    crossoverbasketballcamp.com/registration
                  </a>
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Form */}
          <AnimatedSection delay={150} className="lg:col-span-3">
            <div className="bg-[#111] border border-white/8 rounded-2xl p-8 sm:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#05acae]/15 border border-[#05acae]/40 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-[#05acae]" />
                  </div>
                  <h3 className="font-display text-3xl text-white tracking-wide mb-3">YOU'RE IN!</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">
                    Thanks, {form.name.split(' ')[0]}! We'll be in touch at{' '}
                    <span className="text-white">{form.email}</span> within 48 hours with next steps.
                  </p>
                  <p className="text-gray-500 text-sm mt-3">
                    Questions? Call <a href="tel:5193199034" className="text-[#05acae]">519.319.9034</a> or email{' '}
                    <a href="mailto:crossovercamp@hotmail.com" className="text-[#05acae]">crossovercamp@hotmail.com</a>
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', age: '', email: '', program: '', level: '', notes: '' }) }}
                    className="mt-8 text-[#05acae] text-sm font-medium hover:underline"
                  >
                    Register another athlete
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-display text-2xl text-white tracking-wide mb-1">Athlete Registration</h3>
                    <p className="text-gray-500 text-sm">Fill out the form and we'll follow up within 48 hours.</p>
                  </div>
                  <div className="divider-line" />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Jordan Smith" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Age *</label>
                      <input name="age" value={form.age} onChange={handleChange} required type="number" min="7" max="20" placeholder="e.g. 14" className="input-field" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Email Address *</label>
                    <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="parent@email.com" className="input-field" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Program *</label>
                      <select name="program" value={form.program} onChange={handleChange} required className="input-field" style={{ appearance: 'none' }}>
                        <option value="" disabled>Select program</option>
                        <option>JR Camp (Junior)</option>
                        <option>SR Camp (Senior)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Skill Level *</label>
                      <select name="level" value={form.level} onChange={handleChange} required className="input-field" style={{ appearance: 'none' }}>
                        <option value="" disabled>Select level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                      Anything we should know? <span className="text-gray-600">(optional)</span>
                    </label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Positions played, goals, prior experience..." className="input-field resize-none" />
                  </div>

                  <button type="submit" className="btn-primary w-full text-center text-base py-4">
                    Submit Registration — $325
                  </button>
                  <p className="text-center text-xs text-gray-600">
                    No payment required now. We'll send payment details on confirmation.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════ */
function Contact() {
  const [msg, setMsg] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="bg-[#0D0D0D] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="section-label mb-3">Get In Touch</div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
              LET'S <span className="text-gradient">TALK BALL</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Questions about registration, programs, or anything else? We're always happy to help.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: <Mail size={18} />, label: 'Email', value: 'crossovercamp@hotmail.com', href: 'mailto:crossovercamp@hotmail.com' },
              { icon: <Phone size={18} />, label: 'Phone', value: '519.319.9034', href: 'tel:5193199034' },
              { icon: <MapPin size={18} />, label: 'Mailing Address', value: '119 Salem Place, London, ON  N6K 1T8', href: 'https://maps.google.com/?q=119+Salem+Place+London+ON' },
            ].map((c) => (
              <AnimatedSection key={c.label}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="flex gap-4 items-start p-5 rounded-xl bg-[#141414] border border-white/6 hover:border-[#05acae]/30 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-[#05acae]/10 text-[#05acae] flex items-center justify-center group-hover:bg-[#05acae] group-hover:text-white transition-all shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">{c.label}</div>
                    <div className="text-white text-sm font-medium">{c.value}</div>
                  </div>
                </a>
              </AnimatedSection>
            ))}

            {/* Socials */}
            <AnimatedSection delay={200}>
              <div className="p-5 rounded-xl bg-[#141414] border border-white/6">
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">Follow Us</div>
                <div className="flex gap-3">
                  {[
                    { icon: <InstagramIcon size={18} />, label: 'Instagram', href: 'https://www.instagram.com/crossover_camp' },
                    { icon: <FacebookIcon size={18} />, label: 'Facebook', href: 'http://www.facebook.com' },
                    { icon: <YoutubeIcon size={18} />, label: 'YouTube', href: 'http://www.youtube.com' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 text-gray-400 hover:text-[#05acae] hover:border-[#05acae]/40 flex items-center justify-center transition-all">
                      {s.icon}
                    </a>
                  ))}
                </div>
                <div className="mt-3 text-gray-500 text-xs">@crossover_camp on Instagram</div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact form */}
          <AnimatedSection delay={150} className="lg:col-span-2">
            <div className="bg-[#111] border border-white/8 rounded-2xl p-8">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#05acae]/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={24} className="text-[#05acae]" />
                  </div>
                  <h3 className="font-display text-2xl text-white tracking-wide mb-2">MESSAGE SENT!</h3>
                  <p className="text-gray-400 text-sm">We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setMsg({ name: '', email: '', message: '' }) }}
                    className="mt-6 text-[#05acae] text-sm hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Name</label>
                      <input name="name" value={msg.name} onChange={(e) => setMsg(m => ({ ...m, name: e.target.value }))} required placeholder="Your name" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Email</label>
                      <input name="email" value={msg.email} onChange={(e) => setMsg(m => ({ ...m, email: e.target.value }))} required type="email" placeholder="your@email.com" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                    <textarea name="message" value={msg.message} onChange={(e) => setMsg(m => ({ ...m, message: e.target.value }))} required rows={5} placeholder="Ask us anything about camp..." className="input-field resize-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full text-center py-4">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-black border-t border-white/6">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://crossoverbasketballcamp.com/files/crossoverbasketballcamp/crossover_logo.png"
                alt="Crossover Basketball Camp"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <div style={{ display: 'none' }}>
                <div className="font-display text-2xl text-white tracking-wider leading-none">CROSSOVER</div>
                <div className="text-[10px] font-semibold tracking-[0.25em] text-[#05acae] uppercase mt-0.5">Basketball Camp</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              Celebrating 22 years of elite basketball development in London, Ontario.
            </p>
            <p className="text-gray-500 text-sm mb-5">
              119 Salem Place, London, ON  N6K 1T8
            </p>
            <div className="flex gap-3">
              {[
                { icon: <InstagramIcon size={16} />, href: 'https://www.instagram.com/crossover_camp', label: 'Instagram' },
                { icon: <FacebookIcon size={16} />, href: 'http://www.facebook.com', label: 'Facebook' },
                { icon: <YoutubeIcon size={16} />, href: 'http://www.youtube.com', label: 'YouTube' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 text-gray-500 hover:text-[#05acae] hover:border-[#05acae]/30 flex items-center justify-center transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5">Camp</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Programs', 'Gallery', 'Register', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-500 text-sm hover:text-[#05acae] transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#05acae]" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5">Contact</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="mailto:crossovercamp@hotmail.com" className="hover:text-[#05acae] transition-colors">crossovercamp@hotmail.com</a></li>
              <li><a href="tel:5193199034" className="hover:text-[#05acae] transition-colors">519.319.9034</a></li>
              <li>London, Ontario</li>
              <li>
                <a href="https://crossoverbasketballcamp.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#05acae] transition-colors">
                  crossoverbasketballcamp.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-line mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© 2026 Crossover Basketball Camp. All rights reserved.</span>
          <span>London, Ontario · Est. 2004</span>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="font-sans bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      <StatsBanner />
      <Programs />
      <Gallery />
      <Directors />
      <Registration />
      <Contact />
      <Footer />
    </div>
  )
}
