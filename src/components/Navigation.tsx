import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NAV, PROFILE } from '@/lib/data'
import { scrollToTarget, startScroll, stopScroll } from '@/lib/scroll'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [indicator, setIndicator] = useState({ x: 0, w: 0, show: false })
  const [tick, setTick] = useState(0)

  const pillRef = useRef<HTMLDivElement | null>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  // Scroll state + progress bar
  useEffect(() => {
    let raf = 0
    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 40)
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Active section tracking (scroll position, not observers)
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    let raf = 0
    const update = () => {
      const line = window.innerHeight * 0.45
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (atBottom) current = ids[ids.length - 1]
      if (window.scrollY < 200) current = ''
      setActive(current)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Re-measure the indicator on resize and after fonts load
  useEffect(() => {
    const bump = () => setTick((t) => t + 1)
    window.addEventListener('resize', bump)
    document.fonts?.ready.then(bump)
    return () => window.removeEventListener('resize', bump)
  }, [])

  // Position the sliding indicator under the active link
  useLayoutEffect(() => {
    const pill = pillRef.current
    const link = linkRefs.current[active]
    if (!pill || !link) {
      setIndicator((i) => ({ ...i, show: false }))
      return
    }
    const p = pill.getBoundingClientRect()
    const l = link.getBoundingClientRect()
    setIndicator({ x: l.left - p.left, w: l.width, show: true })
  }, [active, scrolled, tick])

  // Mobile menu: lock scroll + Esc to close
  useEffect(() => {
    if (open) stopScroll()
    else startScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    // wait a tick so Lenis restarts before scrolling
    setTimeout(() => scrollToTarget(href), 50)
  }

  return (
    <>
      <style>{`
        .nav-progress{position:fixed;top:0;left:0;right:0;height:2px;z-index:70;
          background:var(--ink);transform-origin:0 50%;}
        .nav{position:fixed;top:0;left:0;right:0;z-index:60;
          display:flex;align-items:center;justify-content:space-between;
          padding:18px var(--gutter);pointer-events:none;}
        .nav > *{pointer-events:auto;}

        .nav-brand{display:flex;align-items:center;gap:12px;}
        .nav-mark{width:44px;height:44px;border-radius:50%;
          display:grid;place-items:center;
          font-family:var(--font-mono);font-size:13px;font-weight:600;letter-spacing:.02em;
          box-shadow:inset 0 0 0 1.5px var(--ink);color:var(--ink);background:transparent;
          transition:background .5s var(--ease),color .5s var(--ease),transform .9s var(--ease);}
        .nav-mark.solid{background:var(--ink);color:#fff;}
        .nav-brand:hover .nav-mark{transform:rotate(360deg);}
        .nav-name{font-weight:600;letter-spacing:-.02em;font-size:16px;
          transition:opacity .5s var(--ease),transform .5s var(--ease);}
        .nav-name.hide{opacity:0;transform:translateX(-8px);pointer-events:none;}

        .nav-pill{position:relative;display:none;align-items:center;gap:2px;
          padding:5px;border-radius:999px;
          transition:background .5s var(--ease),box-shadow .5s var(--ease),backdrop-filter .5s var(--ease);}
        .nav-pill.glass{background:rgba(255,255,255,.72);
          -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
          box-shadow:inset 0 0 0 1px var(--line),0 10px 40px -12px rgba(13,13,13,.18);}
        .nav-link{position:relative;z-index:1;padding:10px 18px;border-radius:999px;
          font-size:14px;font-weight:500;color:var(--ink);
          transition:color .4s var(--ease);}
        .nav-link.on{color:#fff;}
        .nav-ind{position:absolute;top:5px;bottom:5px;left:0;border-radius:999px;
          background:var(--ink);z-index:0;opacity:0;
          transition:transform .6s var(--ease),width .6s var(--ease),opacity .3s;}

        .nav-menu-btn{height:44px;padding:0 20px;border-radius:999px;
          font-size:14px;font-weight:500;
          background:rgba(255,255,255,.72);
          -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
          box-shadow:inset 0 0 0 1px var(--line);}

        @media (min-width:900px){
          .nav-pill{display:flex;}
          .nav-menu-btn{display:none;}
        }

        /* Mobile overlay */
        .menu{position:fixed;inset:0;z-index:80;background:var(--paper);
          clip-path:circle(0% at calc(100% - 60px) 40px);
          transition:clip-path .9s var(--ease);pointer-events:none;
          display:flex;flex-direction:column;justify-content:space-between;
          padding:18px var(--gutter) 40px;}
        .menu.open{clip-path:circle(150% at calc(100% - 60px) 40px);pointer-events:auto;}
        .menu-top{display:flex;justify-content:space-between;align-items:center;}
        .menu-list{display:flex;flex-direction:column;gap:6px;}
        .menu-link{display:flex;align-items:baseline;gap:14px;
          font-size:clamp(40px,12vw,64px);font-weight:700;letter-spacing:-.045em;line-height:1.1;
          opacity:0;transform:translateY(30px);
          transition:opacity .7s var(--ease),transform .7s var(--ease);}
        .menu.open .menu-link{opacity:1;transform:none;
          transition-delay:calc(.15s + var(--i) * 70ms);}
        .menu-link small{font-family:var(--font-mono);font-size:12px;font-weight:400;
          color:var(--mute);letter-spacing:.08em;}
        .menu-foot{font-family:var(--font-mono);font-size:12px;color:var(--mute);
          letter-spacing:.06em;text-transform:uppercase;}
      `}</style>

      <div
        className="nav-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <header className="nav">
        <a
          href="#top"
          className="nav-brand"
          aria-label={`${PROFILE.name} — back to top`}
          onClick={(e) => {
            e.preventDefault()
            scrollToTarget('#top')
          }}
        >
          <span className={`nav-mark ${scrolled ? 'solid' : ''}`}>
            {PROFILE.initials}
          </span>
          <span className={`nav-name ${scrolled ? 'hide' : ''}`}>
            {PROFILE.name}
          </span>
        </a>

        <nav aria-label="Primary">
          <div ref={pillRef} className={`nav-pill ${scrolled ? 'glass' : ''}`}>
            <span
              className="nav-ind"
              style={{
                width: indicator.w,
                transform: `translateX(${indicator.x}px)`,
                opacity: indicator.show ? 1 : 0,
              }}
              aria-hidden="true"
            />
            {NAV.map((n) => {
              const id = n.href.slice(1)
              return (
                <a
                  key={n.href}
                  href={n.href}
                  ref={(el) => {
                    linkRefs.current[id] = el
                  }}
                  className={`nav-link ${active === id ? 'on' : ''}`}
                  aria-current={active === id ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    go(n.href)
                  }}
                >
                  {n.label}
                </a>
              )
            })}
          </div>
        </nav>

        <button
          className="nav-menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        className={`menu ${open ? 'open' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Menu"
      >
        <div className="menu-top">
          <span className="nav-name">{PROFILE.name}</span>
          <button
            className="nav-menu-btn"
            style={{ display: 'block' }}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            Close
          </button>
        </div>

        <div className="menu-list">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              className="menu-link"
              style={{ ['--i' as string]: i }}
              tabIndex={open ? 0 : -1}
              onClick={(e) => {
                e.preventDefault()
                go(n.href)
              }}
            >
              <small>{String(i + 1).padStart(2, '0')}</small>
              {n.label}
            </a>
          ))}
        </div>

        <p className="menu-foot">{PROFILE.email}</p>
      </div>
    </>
  )
}