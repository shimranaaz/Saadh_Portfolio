import { useEffect, useRef, useState } from 'react'
import {
  PROFILE,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  ACHIEVEMENTS,
  CERTIFICATIONS,
} from '@/lib/data'
import { prefersReducedMotion } from '@/lib/hooks'

const lastYear = (p: string) => {
  const y = p.match(/\d{4}/g)
  return y ? parseInt(y[y.length - 1], 10) : 0
}

type BackItem = { t: string; s: string }

export default function About() {
  const [flipped, setFlipped] = useState(false)
  const swingRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Damped pendulum: pointer velocity -> angle, spring back, idle sway
  useEffect(() => {
    const el = swingRef.current
    const section = sectionRef.current
    if (!el || !section) return
    const reduce = prefersReducedMotion()

    let angle = 0
    let vel = 0
    let lastX = 0
    let lastT = performance.now()
    let raf = 0
    let visible = false

    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      const dt = Math.max(1, now - lastT)
      const dx = e.clientX - lastX
      if (lastX !== 0) vel += (dx / dt) * 0.9
      lastX = e.clientX
      lastT = now
    }

    const loop = (t: number) => {
      if (visible) {
        const idle = reduce ? 0 : Math.sin(t / 1400) * 1.4
        vel += (idle - angle) * 0.02
        vel *= 0.965
        angle += vel
        angle = Math.max(-18, Math.min(18, angle))
        el.style.transform = `rotate(${angle}deg)`
      }
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(
      ([e]) => (visible = e.isIntersecting),
      { threshold: 0.1 },
    )
    io.observe(section)

    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  const toggle = () => setFlipped((f) => !f)

  // The degree = the education entry that ends latest
  const degree = [...EDUCATION].sort((a, b) => lastYear(b.period) - lastYear(a.period))[0]
  const validTill = degree ? String(lastYear(degree.period) || '') : ''
  const dept = degree?.title.split(',')[1]?.trim() ?? ''
  const solved = ACHIEVEMENTS.filter((a) => /solved/i.test(a.label)).reduce(
    (sum, a) => sum + a.value,
    0,
  )

  const backItems = [
    {
      t: PROFILE.role,
      s: PROJECTS.slice(0, 3).map((p) => p.title).join(' · '),
    },
    degree && { t: degree.title, s: degree.detail },
    EXPERIENCE[0] && { t: EXPERIENCE[0].title, s: EXPERIENCE[0].place },
    solved > 0 && { t: 'Problem solver', s: `${solved.toLocaleString()} problems solved` },
    CERTIFICATIONS.length > 0 && {
      t: 'Always learning',
      s: `${CERTIFICATIONS.length} certifications`,
    },
  ].filter((x): x is BackItem => Boolean(x))

  const facts = [
    { k: 'Based in', v: PROFILE.location },
    { k: 'Studying', v: degree?.title },
    { k: 'Batch', v: degree?.period },
    { k: 'Experience', v: EXPERIENCE[0]?.place },
    { k: 'Focus', v: PROFILE.role },
  ].filter((f) => f.v)

  return (
    <section ref={sectionRef} id="about" className="about section">
      <style>{`
        .about{position:relative;overflow:hidden;padding-top:clamp(70px,10vh,120px);}
        .about-grid{display:grid;gap:48px;align-items:stretch;
          grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);}
        @media (max-width:1000px){
          .about-grid{grid-template-columns:1fr;justify-items:center;}
          .about-left,.about-right{width:100%;}
          .about-mid{order:-1;}
        }
        .about-left{display:flex;flex-direction:column;justify-content:center;gap:20px;}
        .about-left h2{font-size:clamp(34px,4.4vw,60px);}
        .about-sum{color:var(--ink-2);font-size:17px;line-height:1.6;max-width:46ch;}
        .about-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;}

        .about-mid{position:relative;display:flex;justify-content:center;min-height:580px;}
        .swing{position:relative;transform-origin:50% -80px;width:300px;
          display:flex;flex-direction:column;align-items:center;
          margin-top:-clamp(70px,10vh,120px);will-change:transform;}
        .strap{width:30px;height:calc(clamp(70px,10vh,120px) + 56px);
          background:var(--ink);border-radius:0 0 3px 3px;position:relative;overflow:hidden;
          display:flex;align-items:center;justify-content:center;}
        .strap span{writing-mode:vertical-rl;font-family:var(--font-mono);font-size:9px;
          letter-spacing:.2em;color:#cfcfcf;text-transform:uppercase;white-space:nowrap;
          animation:strapMove 9s linear infinite;}
        @keyframes strapMove{from{transform:translateY(40%)}to{transform:translateY(-40%)}}
        .clip{width:26px;height:30px;border-radius:5px 5px 9px 9px;
          background:linear-gradient(#d8d8d8,#8d8d8d);margin-top:-4px;position:relative;z-index:2;
          box-shadow:inset 0 0 0 1px rgba(0,0,0,.25);}
        .clip::after{content:"";display:block;width:10px;height:10px;margin:8px auto 0;
          border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 1px rgba(0,0,0,.3);}

        /* ---------- ID card ---------- */
        .flipper{width:300px;height:420px;perspective:1200px;margin-top:-10px;
          background:none;display:block;text-align:left;}
        .flip-in{position:relative;width:100%;height:100%;transform-style:preserve-3d;
          transition:transform .9s var(--ease);}
        .flipper:hover .flip-in,.flipper.on .flip-in{transform:rotateY(180deg);}
        .face{position:absolute;inset:0;border-radius:22px;background:var(--card);
          backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;
          box-shadow:inset 0 0 0 1px var(--line),0 30px 80px -24px rgba(13,13,13,.35);}
        .slot{position:absolute;top:9px;left:50%;transform:translateX(-50%);z-index:3;
          width:44px;height:7px;border-radius:99px;background:var(--paper);
          box-shadow:inset 0 1px 2px rgba(0,0,0,.35);}

        /* front */
        .band{background:var(--ink);color:#fff;display:flex;align-items:center;gap:11px;
          padding:26px 20px 14px;}
        .band-mark{width:32px;height:32px;border-radius:50%;flex:none;display:grid;
          place-items:center;font-family:var(--font-mono);font-size:10px;font-weight:600;
          box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.85);}
        .band-t{font-family:var(--font-mono);font-size:11px;letter-spacing:.22em;line-height:1.2;}
        .band-s{font-family:var(--font-mono);font-size:9px;letter-spacing:.08em;
          color:#b5b5b5;margin-top:3px;}

        .photo-wrap{display:grid;place-items:center;margin-top:20px;}
        .ring{padding:5px;border-radius:20px;background:#fff;
          box-shadow:inset 0 0 0 1.5px var(--ink),0 14px 30px -14px rgba(13,13,13,.4);}
        .photo{width:122px;height:150px;border-radius:15px;overflow:hidden;background:var(--soft);}
        .photo img{width:100%;height:100%;object-fit:cover;object-position:top;
          transition:transform .8s var(--ease);}
        .flipper:hover .photo img{transform:scale(1.06);}

        .id-name{text-align:center;font-weight:700;font-size:15px;letter-spacing:.08em;
          text-transform:uppercase;margin-top:16px;padding:0 16px;}
        .id-role{text-align:center;color:var(--mute);font-size:12px;margin-top:3px;}
        .id-cols{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:6px;
          margin:16px 20px 0;padding-top:12px;border-top:1px dashed var(--line);}
        .id-col{display:grid;gap:3px;min-width:0;}
        .id-col span:first-child{font-family:var(--font-mono);font-size:8px;
          letter-spacing:.12em;text-transform:uppercase;color:var(--mute);}
        .id-col span:last-child{font-family:var(--font-mono);font-size:10.5px;font-weight:600;
          overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
        .id-foot{position:absolute;left:20px;right:20px;bottom:16px;}
        .barcode{height:28px;width:100%;
          background:repeating-linear-gradient(90deg,var(--ink) 0 2px,transparent 2px 4px,
          var(--ink) 4px 5px,transparent 5px 8px,var(--ink) 8px 11px,transparent 11px 13px);}

        /* back */
        .back{transform:rotateY(180deg);padding:30px 22px 20px;display:flex;
          flex-direction:column;gap:14px;}
        .back h3{font-weight:700;font-size:17px;letter-spacing:-.02em;margin-top:6px;}
        .back ul{display:grid;gap:11px;list-style:none;padding:0;margin:0;}
        .back li{display:grid;grid-template-columns:18px minmax(0,1fr);gap:10px;align-items:start;}
        .back li svg{margin-top:1px;}
        .back li b{display:block;font-size:12.5px;font-weight:600;line-height:1.25;}
        .back li small{display:block;font-size:10px;color:var(--mute);line-height:1.35;margin-top:1px;}
        .back .sign{margin-top:auto;font-family:var(--font-serif);font-style:italic;font-size:28px;line-height:1;}
        .back .found{font-family:var(--font-mono);font-size:9px;color:var(--mute);
          letter-spacing:.02em;overflow-wrap:anywhere;}

        /* right column */
        .about-right{display:flex;flex-direction:column;justify-content:center;gap:16px;}
        .facts{display:grid;}
        .fact{display:flex;justify-content:space-between;gap:16px;padding:14px 0;
          border-bottom:1px solid var(--line);font-size:15px;}
        .fact span:first-child{color:var(--mute);font-family:var(--font-mono);
          font-size:12px;text-transform:uppercase;letter-spacing:.06em;padding-top:2px;}
        .fact span:last-child{text-align:right;}
        .quote{font-family:var(--font-serif);font-style:italic;font-size:24px;
          line-height:1.25;color:var(--ink-2);margin-top:8px;}
      `}</style>

      <div className="wrap">
        <p className="tag rv">01 — About</p>
        <div className="about-grid mt-8">
          {/* LEFT */}
          <div className="about-left">
            <h2 className="h-display rv">
              Hi, I'm <em>{PROFILE.firstName}.</em>
            </h2>
            <p className="about-sum rv" style={{ ['--i' as string]: 1 }}>
              {PROFILE.resumeSummary}
            </p>
            <div className="about-btns rv" style={{ ['--i' as string]: 2 }}>
              <a className="btn btn-primary" href={PROFILE.resume} download>
                Résumé ↓
              </a>
              {PROFILE.github && (
                <a className="btn btn-secondary" href={PROFILE.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              )}
              {PROFILE.linkedin && (
                <a className="btn btn-secondary" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* CENTRE: lanyard card */}
          <div className="about-mid">
            <div ref={swingRef} className="swing">
              <div className="strap" aria-hidden="true">
                <span>
                  {PROFILE.name} · {PROFILE.role} · {PROFILE.name} · {PROFILE.role}
                </span>
              </div>
              <div className="clip" aria-hidden="true" />
              <button
                type="button"
                className={`flipper ${flipped ? 'on' : ''}`}
                onClick={toggle}
                aria-pressed={flipped}
                aria-label="Developer ID card. Press to flip."
              >
                <div className="flip-in">
                  {/* FRONT */}
                  <div className="face">
                    <span className="slot" aria-hidden="true" />
                    <div className="band">
                      <span className="band-mark">{PROFILE.initials}</span>
                      <div>
                        <div className="band-t">DEVELOPER ID</div>
                        <div className="band-s">Portfolio · {new Date().getFullYear()}</div>
                      </div>
                    </div>

                    <div className="photo-wrap">
                      <div className="ring">
                        <div className="photo">
                          <img src="/id.png" alt={`Portrait of ${PROFILE.name}`} />
                        </div>
                      </div>
                    </div>

                    <p className="id-name">{PROFILE.name}</p>
                    <p className="id-role">{PROFILE.role}</p>

                    <div className="id-cols">
                      <div className="id-col"><span>ID No.</span><span>DEV-001</span></div>
                      {dept && <div className="id-col"><span>Dept.</span><span>{dept}</span></div>}
                      {validTill && (
                        <div className="id-col"><span>Valid till</span><span>{validTill}</span></div>
                      )}
                    </div>

                    <div className="id-foot" aria-hidden="true">
                      <div className="barcode" />
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="face back">
                    <span className="slot" aria-hidden="true" />
                    <h3>What I am</h3>
                    <ul>
                      {backItems.map((it) => (
                        <li key={it.t}>
                          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                            <circle cx="9" cy="9" r="9" fill="currentColor" />
                            <path
                              d="M5.2 9.2l2.6 2.6 5-5.4"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>
                            <b>{it.t}</b>
                            {it.s && <small>{it.s}</small>}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="sign">{PROFILE.name}</p>
                    <p className="found">If found, say hello · {PROFILE.email}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="about-right">
            <h3 className="tag rv">Quick facts</h3>
            <div className="facts rv" style={{ ['--i' as string]: 1 }}>
              {facts.map((f) => (
                <div className="fact" key={f.k}>
                  <span>{f.k}</span>
                  <span>{f.v}</span>
                </div>
              ))}
            </div>
            <p className="quote rv" style={{ ['--i' as string]: 2 }}>
              “Placeholder quote. Will be a paraphrase of the résumé.”
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}