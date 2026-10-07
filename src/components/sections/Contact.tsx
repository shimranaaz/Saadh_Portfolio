import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '@/lib/data'

/** Splits text into per-letter spans so each one can hop on hover. */
function HopWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, wi) => (
        <span className="hw" key={wi}>
          {word.split('').map((ch, ci) => (
            <span className="ch" key={ci} aria-hidden="true">
              {ch}
            </span>
          ))}
          {'\u00A0'}
        </span>
      ))}
    </>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = PROFILE.email
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="contact section">
      <style>{`
        .contact{position:relative;overflow:hidden;}
        .ct-h{font-weight:700;letter-spacing:-.05em;line-height:.95;
          font-size:clamp(44px,10.5vw,160px);margin-top:20px;}
        .ct-h em{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--mute);}
        .ct-h .line{display:block;}
        .hw{display:inline-block;white-space:nowrap;}
        .ch{display:inline-block;will-change:transform;}
        .ch:hover{animation:hop .6s var(--ease);}
        @keyframes hop{0%{transform:translateY(0)}35%{transform:translateY(-.14em)}70%{transform:translateY(.03em)}100%{transform:translateY(0)}}

        .ct-row{display:flex;align-items:flex-end;justify-content:space-between;
          gap:40px;flex-wrap:wrap;margin-top:72px;}
        .ct-main{display:grid;gap:28px;min-width:0;flex:1 1 420px;}
        .ct-mail{display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
        .ct-email{font-weight:600;letter-spacing:-.035em;line-height:1.1;
          font-size:clamp(22px,4.2vw,56px);overflow-wrap:anywhere;
          text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:.18em;
          text-decoration-color:var(--faint);
          transition:text-decoration-color .4s var(--ease);}
        .ct-email:hover{text-decoration-color:var(--ink);}
        .copy{height:36px;padding:0 16px;border-radius:999px;font-size:13px;font-weight:500;
          box-shadow:inset 0 0 0 1px var(--line);
          transition:background .4s var(--ease),color .4s var(--ease);}
        .copy:hover,.copy.done{background:var(--ink);color:#fff;}

        .ct-links{display:flex;flex-wrap:wrap;gap:10px;}
        .ct-link{display:inline-flex;align-items:center;gap:8px;height:46px;padding:0 22px;
          border-radius:999px;font-size:15px;font-weight:500;
          box-shadow:inset 0 0 0 1px var(--line);
          transition:background .4s var(--ease),color .4s var(--ease),transform .4s var(--ease);}
        .ct-link:hover{background:var(--ink);color:#fff;transform:translateY(-2px);}

        .badge{position:relative;width:150px;height:150px;flex:none;display:grid;place-items:center;
          border-radius:50%;color:var(--ink);}
        .badge svg{position:absolute;inset:0;width:100%;height:100%;animation:spin 18s linear infinite;}
        .badge text{font-family:var(--font-mono);font-size:15px;fill:currentColor;letter-spacing:.1em;}
        .badge-c{width:56px;height:56px;border-radius:50%;background:var(--ink);color:#fff;
          display:grid;place-items:center;font-size:22px;
          transition:transform .5s var(--ease);}
        .badge:hover .badge-c{transform:scale(1.12) rotate(-45deg);}
        @keyframes spin{to{transform:rotate(360deg);}}
        @media (max-width:700px){.ct-row{margin-top:48px;}.badge{width:120px;height:120px;}}
      `}</style>

      <div className="wrap">
        <p className="tag rv">07 — Contact</p>

        <h2 className="ct-h" aria-label="Let's build something together.">
          <span className="line">
            <HopWords text="Let's build" />
          </span>
          <span className="line">
            <em>
              <HopWords text="something" />
            </em>
            <HopWords text="together." />
          </span>
        </h2>

        <div className="ct-row">
          <div className="ct-main">
            <div className="ct-mail rv">
              <a className="ct-email" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
              <button
                type="button"
                className={`copy ${copied ? 'done' : ''}`}
                onClick={copy}
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
              <span
                aria-live="polite"
                style={{
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  overflow: 'hidden',
                  clip: 'rect(0 0 0 0)',
                }}
              >
                {copied ? 'Email copied to clipboard' : ''}
              </span>
            </div>

            <div className="ct-links rv" style={{ ['--i' as string]: 1 }}>
              {PROFILE.phone && (
                <a className="ct-link" href={PROFILE.phoneHref}>
                  {PROFILE.phone}
                </a>
              )}
              {PROFILE.github && (
                <a className="ct-link" href={PROFILE.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              )}
              {PROFILE.linkedin && (
                <a className="ct-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          <a
            className="badge rv"
            href={`mailto:${PROFILE.email}`}
            aria-label="Say hello by email"
            style={{ ['--i' as string]: 2 }}
          >
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path
                  id="badge-circle"
                  d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                />
              </defs>
              <text>
                <textPath
                  href="#badge-circle"
                  textLength="486"
                  lengthAdjust="spacing"
                >
                  SAY HELLO • SAY HELLO • SAY HELLO • SAY HELLO •{' '}
                </textPath>
              </text>
            </svg>
            <span className="badge-c" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}