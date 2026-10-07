import { useEffect, useMemo, useRef, useState } from 'react'
import { EDUCATION, EXPERIENCE } from '@/lib/data'
import { scrollToTarget } from '@/lib/scroll'

type Stop = {
  kind: 'Education' | 'Experience'
  period: string
  title: string
  place: string
  lines: string[]
  tech: string[]
  start: number
  year: string
}

const years = (p: string) => p.match(/\d{4}/g) ?? []

export default function Experience() {
  const stops = useMemo<Stop[]>(() => {
    const mk = (
      list: {
        period: string
        title: string
        place: string
        detail: string
        tech?: string[]
      }[],
      kind: Stop['kind'],
    ): Stop[] =>
      list.map((e) => {
        const y = years(e.period)
        return {
          kind,
          period: e.period,
          title: e.title,
          place: e.place,
          lines: e.detail.split('\n').map((l) => l.trim()).filter(Boolean),
          tech: e.tech ?? [],
          start: parseInt(y[0] ?? '0', 10),
          year: y[y.length - 1] ?? '',
        }
      })
    return [...mk(EDUCATION, 'Education'), ...mk(EXPERIENCE, 'Experience')].sort(
      (a, b) => a.start - b.start,
    )
  }, [])

  const trackRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [progress, setProgress] = useState(0)
  const [lit, setLit] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const reached = window.innerHeight * 0.6 - rect.top
      setProgress(Math.min(1, Math.max(0, reached / rect.height)))
      let count = 0
      itemRefs.current.forEach((li) => {
        if (li && reached >= li.offsetTop + 24) count++
      })
      setLit(count)
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

  if (stops.length === 0) return null
  const nextLit = lit >= stops.length

  return (
    <section id="experience" className="exp section">
      <style>{`
        .exp-head{display:grid;gap:16px;justify-items:start;margin-bottom:72px;}
        .exp-sub{color:var(--ink-2);font-size:16px;line-height:1.6;max-width:44ch;text-align:left;}

        .track{position:relative;}
        .track ol{list-style:none;margin:0;padding:0;}

        /* centre line: dotted track + dotted ink fill (revealed with clip-path) */
        .t-bg,.t-fill{position:absolute;top:30px;bottom:30px;width:2px;left:calc(50% - 1px);}
        .t-bg{background:repeating-linear-gradient(var(--faint) 0 4px,transparent 4px 9px);opacity:.6;}
        .t-fill{background:repeating-linear-gradient(var(--ink) 0 4px,transparent 4px 9px);}

        .row,.next-row{display:grid;align-items:start;
          grid-template-columns:minmax(0,1fr) 56px minmax(0,1fr);}
        .row{padding-bottom:64px;}

        .row-card{grid-column:1;grid-row:1;border-radius:34px;background:var(--card);
          padding:30px 32px;box-shadow:inset 0 0 0 1px var(--line);display:grid;gap:10px;
          opacity:.35;transform:translateX(-24px);
          transition:opacity .8s var(--ease),transform .8s var(--ease),box-shadow .8s var(--ease);}
        .row.alt .row-card{grid-column:3;transform:translateX(24px);}
        .row.lit .row-card{opacity:1;transform:none;
          box-shadow:inset 0 0 0 1px var(--line),0 30px 60px -28px rgba(13,13,13,.25);}

        .row-mid{grid-column:2;grid-row:1;position:relative;height:100%;}
        .row-dot{position:absolute;left:19px;top:26px;width:18px;height:18px;border-radius:50%;
          background:var(--paper);box-shadow:inset 0 0 0 2px var(--faint);
          transition:background .5s var(--ease),box-shadow .5s var(--ease),transform .5s var(--ease);}
        .row.lit .row-dot,.next-row.lit .row-dot{background:var(--ink);
          box-shadow:inset 0 0 0 2px var(--ink);transform:scale(1.2);}

        .row-year{grid-column:3;grid-row:1;padding-left:28px;text-align:left;
          font-weight:800;letter-spacing:-.06em;line-height:.9;
          font-size:clamp(56px,8vw,120px);font-variant-numeric:tabular-nums;
          color:var(--faint);transform:translateX(12px);
          transition:color .7s var(--ease),transform .7s var(--ease);}
        .row.alt .row-year{grid-column:1;padding-left:0;padding-right:28px;text-align:right;
          transform:translateX(-12px);}
        .row.lit .row-year{color:var(--ink);transform:none;}

        .row-top{display:flex;justify-content:space-between;align-items:center;gap:12px;}
        .pill{padding:4px 12px;border-radius:999px;background:var(--ink);color:#fff;
          font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;}
        .row-date{font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;color:var(--mute);}
        .row-t{font-weight:700;letter-spacing:-.035em;line-height:1.1;
          font-size:clamp(22px,2.6vw,32px);}
        .row-p{font-size:15px;color:var(--ink-2);}
        .row-d{font-size:14px;color:var(--mute);line-height:1.55;margin:0;}
        .row-ul{list-style:none;padding:0;margin:4px 0 0;display:grid;gap:6px;
          font-size:14px;color:var(--ink-2);line-height:1.5;}
        .row-ul li{padding-left:16px;position:relative;}
        .row-ul li::before{content:"";position:absolute;left:0;top:.62em;width:5px;height:5px;
          border-radius:50%;background:var(--faint);}
        .row-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}
        .row-chips span{height:28px;display:inline-flex;align-items:center;padding:0 12px;
          border-radius:999px;font-size:12px;box-shadow:inset 0 0 0 1px var(--line);}

        /* Final "Next - Your team?" row */
        .nx-l{grid-column:1;grid-row:1;text-align:right;padding-right:28px;
          font-family:var(--font-serif);font-style:italic;
          font-size:clamp(40px,6vw,88px);line-height:.9;color:var(--faint);
          transition:color .7s var(--ease);}
        .next-row.lit .nx-l{color:var(--mute);}
        .nx-r{grid-column:3;grid-row:1;display:grid;gap:8px;justify-items:start;
          padding:4px 0 0 28px;}
        .nx-r b{font-weight:700;font-size:clamp(22px,2.6vw,34px);letter-spacing:-.035em;}
        .nx-tag{font-family:var(--font-mono);font-size:10px;letter-spacing:.16em;
          text-transform:uppercase;color:var(--mute);}
        .nx-sub{font-size:14px;color:var(--mute);line-height:1.5;margin:0;max-width:34ch;}
        .nx-r .btn{margin-top:8px;}

        /* Mobile: single column, line on the left */
        @media (max-width:800px){
          .t-bg,.t-fill{left:9px;}
          .row,.next-row{grid-template-columns:28px minmax(0,1fr);}
          .row{padding-bottom:44px;row-gap:12px;}
          .row-mid,.next-row .row-mid{grid-column:1;grid-row:1 / span 2;}
          .row-dot{left:0;top:10px;}
          .row-year,.row.alt .row-year{grid-column:2;grid-row:1;padding:0;text-align:left;
            font-size:56px;transform:translateX(12px);}
          .row.lit .row-year{transform:none;}
          .row-card,.row.alt .row-card{grid-column:2;grid-row:2;transform:translateY(10px);}
          .row.lit .row-card{transform:none;}
          .nx-l{grid-column:2;grid-row:1;text-align:left;padding:0;font-size:44px;}
          .nx-r{grid-column:2;grid-row:2;padding:0;}
        }
      `}</style>

      <div className="wrap">
        <div className="exp-head">
          <p className="tag rv">05 — Education & experience</p>
          <h2 className="h-display rv" style={{ ['--i' as string]: 1 }}>
            Education & <em>experience.</em>
          </h2>
          <p className="exp-sub rv" style={{ ['--i' as string]: 2 }}>
            Where I studied and where I've worked, in the order it happened.
          </p>
        </div>

        <div className="track" ref={trackRef}>
          <span className="t-bg" aria-hidden="true" />
          <span
            className="t-fill"
            aria-hidden="true"
            style={{ clipPath: `inset(0 0 ${(1 - progress) * 100}% 0)` }}
          />

          <ol>
            {stops.map((s, i) => (
              <li
                key={`${s.title}-${i}`}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className={`row ${i % 2 === 1 ? 'alt' : ''} ${i < lit ? 'lit' : ''}`}
              >
                <div className="row-card">
                  <div className="row-top">
                    <span className="pill">{s.kind}</span>
                    <span className="row-date">{s.period}</span>
                  </div>
                  <h3 className="row-t">{s.title}</h3>
                  <p className="row-p">{s.place}</p>
                  {s.lines.length > 1 ? (
                    <ul className="row-ul">
                      {s.lines.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  ) : (
                    s.lines[0] && <p className="row-d">{s.lines[0]}</p>
                  )}
                  {s.tech.length > 0 && (
                    <div className="row-chips">
                      {s.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="row-mid">
                  <span className="row-dot" aria-hidden="true" />
                </div>
                <p className="row-year" aria-hidden="true">{s.year}</p>
              </li>
            ))}
          </ol>

          <div className={`next-row ${nextLit ? 'lit' : ''}`}>
            <p className="nx-l">Next</p>
            <div className="row-mid">
              <span className="row-dot" aria-hidden="true" />
            </div>
            <div className="nx-r">
              <span className="nx-tag">What's next</span>
              <b>Your team?</b>
              <p className="nx-sub">Let's build something together.</p>
              <button
                className="btn btn-primary"
                onClick={() => scrollToTarget('#contact')}
              >
                Let's talk →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}