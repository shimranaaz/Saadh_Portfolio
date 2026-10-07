import { useEffect, useRef, useState } from 'react'
import { ACHIEVEMENTS } from '@/lib/data'
import { useInView } from '@/lib/hooks'

const BRAND: Record<string, { file: string; color: string }> = {
  leetcode: { file: 'leetcode', color: '255,161,22' },
  codechef: { file: 'codechef', color: '91,70,56' },
  geeksforgeeks: { file: 'geeksforgeeks', color: '47,141,70' },
  gfg: { file: 'geeksforgeeks', color: '47,141,70' },
  hackerrank: { file: 'hackerrank', color: '0,179,90' },
}
const key = (n: string) => n.toLowerCase().replace(/[^a-z]/g, '')

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400)
      setN(Math.round(easeOutQuart(t) * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const barRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [center, setCenter] = useState(0)

  useEffect(() => {
    let travel = 0
    let raf = 0

    const measure = () => {
      const track = trackRef.current
      if (!track) return
      travel = Math.max(0, track.scrollWidth - window.innerWidth)
      setHeight(window.innerHeight + travel)
      update()
    }

    const update = () => {
      const sec = sectionRef.current
      const track = trackRef.current
      if (!sec || !track) return
      const top = sec.getBoundingClientRect().top
      const p = travel > 0 ? Math.min(1, Math.max(0, -top / travel)) : 0
      track.style.transform = `translate3d(${-p * travel}px,0,0)`
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`

      const mid = window.innerWidth / 2
      let best = 0
      let bestD = Infinity
      cardRefs.current.forEach((c, i) => {
        if (!c) return
        const r = c.getBoundingClientRect()
        const d = Math.abs(r.left + r.width / 2 - mid)
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      setCenter(best)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [])

  if (ACHIEVEMENTS.length === 0) return null
  const total = String(ACHIEVEMENTS.length).padStart(2, '0')

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="ach"
      style={{ height }}
    >
      <style>{`
        .ach{position:relative;}
        .ach-pin{position:sticky;top:0;height:100svh;overflow:hidden;
          display:flex;flex-direction:column;justify-content:center;gap:40px;}
        .ach-head{display:flex;align-items:flex-end;justify-content:space-between;
          gap:24px;flex-wrap:wrap;}
        .ach-bar{height:2px;background:var(--line);border-radius:2px;margin-top:28px;overflow:hidden;}
        .ach-bar > div{height:100%;background:var(--ink);transform-origin:left;transform:scaleX(0);}

        .ach-track{display:flex;gap:24px;width:max-content;
          padding:20px var(--gutter) 40px var(--gutter);will-change:transform;}

        .ach-card{position:relative;flex:none;
          width:clamp(340px,40vw,540px);height:clamp(260px,36vh,310px);
          border-radius:28px;background:var(--card);padding:26px;
          box-shadow:inset 0 0 0 1px var(--line),0 10px 30px -18px rgba(13,13,13,.18);
          display:flex;flex-direction:column;justify-content:space-between;
          transition:transform .8s var(--ease),box-shadow .8s var(--ease);}
        .ach-card.mid{transform:translateY(-12px);
          box-shadow:inset 0 0 0 1px var(--line),0 40px 70px -24px rgba(13,13,13,.32);}

        .ach-top{display:flex;justify-content:space-between;align-items:flex-start;}
        .ach-logo{width:72px;height:72px;border-radius:20px;display:grid;place-items:center;
          background:radial-gradient(circle at 50% 50%,rgba(var(--g),.14),transparent 72%),var(--paper);
          transition:background .8s var(--ease);}
        .ach-card.mid .ach-logo{
          background:radial-gradient(circle at 50% 50%,rgba(var(--g),.32),transparent 74%),var(--paper);}
        .ach-logo img{width:36px;height:36px;object-fit:contain;}
        .ach-logo b{font-size:26px;font-weight:700;}
        .ach-i{font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;color:var(--mute);}

        .ach-bot{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;}
        .ach-txt{min-width:0;display:grid;gap:4px;}
        .ach-label{font-weight:700;font-size:20px;letter-spacing:-.03em;}
        .ach-cap{font-size:14px;color:var(--ink-2);}
        .ach-det{font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;
          text-transform:uppercase;color:var(--mute);margin-top:4px;}
        .ach-num{font-weight:800;letter-spacing:-.06em;line-height:.85;
          font-size:clamp(56px,8vw,110px);font-variant-numeric:tabular-nums;}

        .ach-end{flex:none;display:grid;place-items:center;padding:0 80px 0 24px;}
        .ach-end span{font-family:var(--font-serif);font-style:italic;
          font-size:clamp(32px,4vw,56px);color:var(--mute);white-space:nowrap;}
      `}</style>

      <div className="ach-pin">
        <div className="wrap" style={{ width: '100%' }}>
          <div className="ach-head">
            <div style={{ display: 'grid', gap: 16 }}>
              <p className="tag rv">06 — Achievements</p>
              <h2 className="h-display rv" style={{ ['--i' as string]: 1 }}>
                Numbers that <em>count.</em>
              </h2>
            </div>
          </div>
          <div className="ach-bar" aria-hidden="true">
            <div ref={barRef} />
          </div>
        </div>

        <div className="ach-track" ref={trackRef}>
          {ACHIEVEMENTS.map((a, i) => {
            const b = BRAND[key(a.platform)]
            return (
              <article
                key={a.platform}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className={`ach-card ${i === center ? 'mid' : ''}`}
                style={{ ['--g' as string]: b?.color ?? '13,13,13' }}
              >
                <div className="ach-top">
                  <div className="ach-logo">
                    {b ? (
                      <img src={`/logos/${b.file}.svg`} alt={a.platform} />
                    ) : (
                      <b aria-label={a.platform}>{a.platform[0]}</b>
                    )}
                  </div>
                  <span className="ach-i">
                    {String(i + 1).padStart(2, '0')} / {total}
                  </span>
                </div>

                <div className="ach-bot">
                  <div className="ach-txt">
                    <p className="ach-label">{a.label}</p>
                    <p className="ach-cap">{a.caption}</p>
                    <p className="ach-det">{a.detail}</p>
                  </div>
                  <p className="ach-num">
                    <CountUp to={a.value} suffix={a.suffix} />
                  </p>
                </div>
              </article>
            )
          })}
          <div className="ach-end">
            <span>and counting →</span>
          </div>
        </div>
      </div>
    </section>
  )
}