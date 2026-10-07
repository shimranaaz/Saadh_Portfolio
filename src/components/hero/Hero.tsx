import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '@/lib/data'
import { scrollToTarget } from '@/lib/scroll'

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [hasVideo, setHasVideo] = useState(true)
  const [soundOn, setSoundOn] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const visibleRef = useRef(true)

  // Try to play with sound on load; fall back to muted
  useEffect(() => {
    const v = videoRef.current
    if (!v || !hasVideo) return
    v.muted = false
    v.play()
      .then(() => {
        setSoundOn(true)
        setBlocked(false)
      })
      .catch(() => {
        v.muted = true
        v.play().catch(() => {})
        setSoundOn(false)
        setBlocked(true)
      })
  }, [hasVideo])

  // Unlock sound on first user interaction
  useEffect(() => {
    if (!blocked) return
    const unlock = () => {
      const v = videoRef.current
      if (!v) return
      v.muted = false
      v.play()
        .then(() => {
          setSoundOn(true)
          setBlocked(false)
        })
        .catch(() => {})
    }
    const events = ['pointerdown', 'keydown', 'touchend'] as const
    events.forEach((e) => window.addEventListener(e, unlock, { once: true }))
    return () => events.forEach((e) => window.removeEventListener(e, unlock))
  }, [blocked])

  // Pause when less than 35% of the hero is visible
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        const visible = entry.intersectionRatio >= 0.35
        visibleRef.current = visible
        if (!v) return
        if (visible) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: [0, 0.35, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    if (v.muted || v.paused) {
      v.muted = false
      v.play().catch(() => {})
      setSoundOn(true)
      setBlocked(false)
    } else {
      v.muted = true
      setSoundOn(false)
    }
  }

  const name = PROFILE.firstName
  const mid = Math.ceil(name.length / 2)

  return (
    <section ref={sectionRef} id="top" className="hero">
      <style>{`
        .hero{position:relative;min-height:100svh;overflow:hidden;
          --stage-h:min(calc(100svh - 130px),1040px);
          --cut:calc(var(--stage-h) * .26);
          --nudge:calc(var(--stage-h) * .02);
          display:flex;flex-direction:column;align-items:center;justify-content:flex-end;
          padding:110px var(--gutter) 40px;}

        /* Ghost word (desktop): two halves pinned to the centre line,
           so the gap is always centred on Sara */
        .hero-ghost{position:absolute;left:0;right:0;top:42%;height:0;z-index:0;
          font-weight:800;line-height:.8;white-space:nowrap;text-transform:uppercase;
          letter-spacing:.08em;
          font-size:clamp(70px,min(13vw,30svh),300px);
          color:transparent;-webkit-text-stroke:1.5px rgba(13,13,13,.14);
          user-select:none;pointer-events:none;}
        .hero-ghost > span{position:absolute;top:0;transform:translateY(-50%);}
        .hero-ghost .gl{right:calc(50% + var(--cut) / 2 + var(--nudge));margin-right:-.08em;}
        .hero-ghost .gr{left:calc(50% + var(--cut) / 2 - var(--nudge));}

        .hero-stage{position:relative;z-index:1;
          height:var(--stage-h);aspect-ratio:768/960;
          max-width:100%;margin-top:-40px;
          mix-blend-mode:multiply;}

        .hero-video,.hero-ph{width:100%;height:100%;object-fit:contain;display:block;}
        .hero-ph{display:grid;place-items:center;
          font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;
          text-transform:uppercase;color:var(--faint);}
        .hero-ph-body{width:46%;height:86%;border-radius:200px 200px 24px 24px;
          background:linear-gradient(#e9e6e0,#dcd8d1);
          display:grid;place-items:center;}

        .hero-copy{position:absolute;z-index:3;left:var(--gutter);bottom:48px;
          max-width:min(460px,42vw);}
        .hero-h{font-weight:700;letter-spacing:-.045em;line-height:1;
          font-size:clamp(34px,5vw,72px);}
        .hero-cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px;}

        .hero-sound{position:absolute;z-index:4;right:var(--gutter);bottom:48px;
          width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;
          display:grid;place-items:center;
          transition:transform .4s var(--ease);}
        .hero-sound:hover{transform:scale(1.08);}
        .hero-sound.ping::after{content:"";position:absolute;inset:0;border-radius:50%;
          box-shadow:0 0 0 0 rgba(13,13,13,.35);animation:ping 1.8s var(--ease) infinite;}
        @keyframes ping{to{box-shadow:0 0 0 18px rgba(13,13,13,0);}}

        /* Tablet */
        @media (max-width:900px){
          .hero{padding-bottom:28px;}
          .hero-ghost{top:40%;font-size:min(15vw,22svh);letter-spacing:.06em;}
          .hero-copy{position:relative;left:auto;bottom:auto;max-width:100%;
            text-align:center;margin-top:8px;}
          .hero-cta{justify-content:center;}
          .hero-sound{bottom:auto;top:84px;}
        }

        /* Phone: one big unsplit word above the video, no overlap */
        @media (max-width:700px){
          .hero{--stage-h:56svh;padding-top:calc(150px + 20vw);}
          .hero-stage{margin-top:0;}
          .hero-ghost{top:136px;height:auto;display:flex;justify-content:center;
            font-size:20vw;letter-spacing:.06em;padding-left:.06em;
            -webkit-text-stroke:1.5px rgba(13,13,13,.2);}
          .hero-ghost > span{position:static;transform:none;margin:0;}
        }
      `}</style>

      <div className="hero-ghost" aria-hidden="true">
        <span className="gl">{name.slice(0, mid)}</span>
        <span className="gr">{name.slice(mid)}</span>
      </div>

      <div className="hero-stage">
        {hasVideo ? (
          <video
            ref={videoRef}
            className="hero-video"
            loop
            playsInline
            preload="auto"
            poster=""
            aria-label={`${PROFILE.name} introducing themselves`}
            onError={() => setHasVideo(false)}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source
              src="/hero/hero.mp4"
              type="video/mp4"
              onError={() => setHasVideo(false)}
            />
          </video>
        ) : (
          <div className="hero-ph" role="img" aria-label="Video placeholder">
            <div className="hero-ph-body">Video placeholder</div>
          </div>
        )}
      </div>

      <div className="hero-copy">
        <h1 className="hero-h">
          <span className="rv-mask">
            <span>{PROFILE.role}.</span>
          </span>
        </h1>
        <div className="hero-cta rv" style={{ ['--i' as string]: 2 }}>
          <button className="btn btn-primary" onClick={() => scrollToTarget('#work')}>
            Explore work
          </button>
          <button className="btn btn-secondary" onClick={() => scrollToTarget('#contact')}>
            Let's talk
          </button>
          <a className="btn btn-secondary" href={PROFILE.resume} download>
            Résumé ↓
          </a>
        </div>
      </div>

      {hasVideo && (
        <button
          className={`hero-sound ${blocked ? 'ping' : ''}`}
          onClick={toggleSound}
          aria-label={soundOn ? 'Mute intro voice' : 'Play intro voice'}
          aria-pressed={soundOn}
        >
          {soundOn ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 2.5v11a.8.8 0 0 0 1.2.7l9-5.5a.8.8 0 0 0 0-1.4l-9-5.5A.8.8 0 0 0 4 2.5z" />
            </svg>
          )}
        </button>
      )}
    </section>
  )
}