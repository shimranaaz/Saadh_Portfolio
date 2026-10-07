import { useState } from 'react'
import { PROJECTS } from '@/lib/data'
import TechLogo from '@/components/ui/TechLogo'

const canHover = () =>
  window.matchMedia('(hover: hover) and (min-width: 801px)').matches

/** Grayscale mini interface, built from plain divs. Not a real screenshot. */
function MiniUI({ variant }: { variant: number }) {
  const v = variant % 3
  return (
    <div className="mu" aria-hidden="true">
      <div className="mu-bar">
        <i />
        <i />
        <i />
      </div>

      {v === 0 && (
        <>
          <div className="mu-stats">
            <div />
            <div />
            <div />
          </div>
          <div className="mu-chart">
            {[40, 65, 50, 80, 58, 90, 72].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mu-rows">
            <div />
            <div />
            <div />
          </div>
        </>
      )}

      {v === 1 && (
        <>
          <div className="mu-b l" />
          <div className="mu-b r" />
          <div className="mu-b l tall" />
          <div className="mu-b r short" />
          <div className="mu-input" />
        </>
      )}

      {v === 2 && (
        <>
          <div className="mu-hero">
            <div />
            <div />
            <span />
          </div>
          <div className="mu-cards">
            <div />
            <div />
            <div />
          </div>
        </>
      )}
    </div>
  )
}

export default function Work() {
  const [active, setActive] = useState(0)
  if (PROJECTS.length === 0) return null

  return (
    <section id="work" className="work section">
      <style>{`
        .work-head{display:flex;flex-direction:column;gap:16px;}
        .work-acc{display:flex;gap:12px;height:min(78svh,600px);margin-top:48px;}

        .pan{position:relative;flex:1 1 0;min-width:0;border-radius:28px;
          background:var(--card);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;
          transition:flex .9s var(--ease),box-shadow .9s var(--ease);}
        .pan.open{flex:8;
          box-shadow:inset 0 0 0 1px var(--line),0 30px 80px -24px rgba(13,13,13,.25);}

        /* Folded spine */
        .spine{position:absolute;inset:0;width:100%;display:flex;flex-direction:column;
          align-items:center;justify-content:space-between;padding:24px 0;
          transition:opacity .4s var(--ease);}
        .pan.open .spine{opacity:0;pointer-events:none;}
        .spine-n{font-family:var(--font-mono);font-size:12px;color:var(--mute);letter-spacing:.06em;}
        .spine-t{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:600;
          font-size:18px;letter-spacing:-.02em;white-space:nowrap;}
        .plus{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;
          font-size:20px;line-height:1;box-shadow:inset 0 0 0 1px var(--line);
          transition:transform .5s var(--ease),background .4s var(--ease),color .4s var(--ease);}
        .spine:hover .plus{transform:rotate(90deg);background:var(--ink);color:#fff;}

        /* Open content */
        .body{position:absolute;inset:0;visibility:hidden;opacity:0;
          transition:opacity .4s var(--ease),visibility 0s .4s;}
        .pan.open .body{visibility:visible;opacity:1;
          transition:opacity .6s var(--ease) .3s,visibility 0s 0s;}
        .body-in{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:28px;
          height:100%;min-width:640px;padding:36px;}

        .w-copy{display:flex;flex-direction:column;gap:14px;min-height:0;}
        .w-kick{font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;
          text-transform:uppercase;color:var(--mute);}
        .w-title{font-weight:700;letter-spacing:-.04em;line-height:1;
          font-size:clamp(28px,3.4vw,46px);}
        .w-desc{color:var(--ink-2);font-size:15px;line-height:1.55;}
        .w-feat{list-style:none;padding:0;margin:0;display:grid;
          grid-template-columns:1fr 1fr;gap:6px 16px;font-size:13px;}
        .w-feat li::before{content:"+ ";color:var(--faint);}
        .w-tech{display:flex;flex-wrap:wrap;gap:6px;}
        .tc{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px 0 8px;
          border-radius:999px;font-size:12px;box-shadow:inset 0 0 0 1px var(--line);}
        .w-act{margin-top:auto;}

        /* Illustrative UI */
        .w-ui{position:relative;border-radius:20px;background:#efede8;padding:16px;
          clip-path:inset(0 100% 0 0 round 20px);
          transition:clip-path 1.1s var(--ease);}
        .pan.open .w-ui{clip-path:inset(0 0 0 0 round 20px);transition-delay:.45s;}
        .ui-tag{position:absolute;right:16px;bottom:10px;font-family:var(--font-mono);
          font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);}

        .mu{height:calc(100% - 22px);background:#fff;border-radius:14px;padding:14px;
          box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;
          gap:12px;overflow:hidden;}
        .mu-bar{display:flex;gap:5px;}
        .mu-bar i{width:8px;height:8px;border-radius:50%;background:var(--soft);}
        .mu-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
        .mu-stats div{height:54px;border-radius:10px;background:var(--soft);}
        .mu-stats div:first-child{background:var(--ink);}
        .mu-chart{flex:1;min-height:80px;display:flex;align-items:flex-end;gap:8px;}
        .mu-chart span{flex:1;border-radius:6px 6px 2px 2px;background:#d8d5cf;
          transform-origin:bottom;}
        .mu-chart span:nth-child(6){background:var(--ink);}
        .pan.open .mu-chart span{animation:grow .9s var(--ease) .8s both;}
        @keyframes grow{from{transform:scaleY(0);}to{transform:scaleY(1);}}
        .mu-rows{display:grid;gap:8px;}
        .mu-rows div{height:14px;border-radius:7px;background:var(--soft);}
        .mu-rows div:nth-child(2){width:80%;}
        .mu-rows div:nth-child(3){width:55%;}

        .mu-b{height:34px;border-radius:14px;background:var(--soft);width:62%;}
        .mu-b.r{align-self:flex-end;background:var(--ink);width:48%;}
        .mu-b.tall{height:56px;width:72%;}
        .mu-b.short{width:34%;}
        .mu-input{margin-top:auto;height:38px;border-radius:999px;
          box-shadow:inset 0 0 0 1px var(--line);}

        .mu-hero{height:38%;border-radius:12px;background:var(--soft);padding:16px;
          display:flex;flex-direction:column;gap:8px;justify-content:center;}
        .mu-hero div{height:14px;border-radius:7px;background:#cfccc6;width:70%;}
        .mu-hero div:nth-child(2){width:45%;}
        .mu-hero span{width:90px;height:26px;border-radius:999px;background:var(--ink);}
        .mu-cards{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
        .mu-cards div{border-radius:10px;background:var(--soft);}
        .mu-cards div:nth-child(2){background:#d8d5cf;}

        /* Mobile: vertical accordion */
        @media (max-width:800px){
          .work-acc{flex-direction:column;height:auto;gap:10px;}
          .pan{display:grid;grid-template-rows:auto 0fr;flex:none;
            transition:grid-template-rows .8s var(--ease),box-shadow .8s var(--ease);}
          .pan.open{grid-template-rows:auto 1fr;}
          .spine{position:static;flex-direction:row;justify-content:flex-start;
            height:72px;padding:0 20px;gap:14px;}
          .pan.open .spine{opacity:1;pointer-events:auto;}
          .spine-t{writing-mode:horizontal-tb;transform:none;font-size:20px;}
          .plus{margin-left:auto;}
          .pan.open .plus{transform:rotate(45deg);}
          .body{position:static;min-height:0;overflow:hidden;}
          .body-in{display:flex;flex-direction:column;min-width:0;height:auto;
            padding:4px 20px 24px;gap:20px;}
          .w-ui{height:220px;}
          .w-feat{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="wrap">
        <div className="work-head">
          <p className="tag rv">03 — Selected work</p>
          <h2 className="h-display rv" style={{ ['--i' as string]: 1 }}>
            Things I've <em>built.</em>
          </h2>
        </div>

        <div className="work-acc rv" style={{ ['--i' as string]: 2 }}>
          {PROJECTS.map((p, i) => {
            const open = i === active
            return (
              <article
                key={p.id}
                className={`pan ${open ? 'open' : ''}`}
                onMouseEnter={() => canHover() && setActive(i)}
              >
                <button
                  type="button"
                  className="spine"
                  aria-expanded={open}
                  aria-controls={`work-body-${p.id}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="spine-n">{p.index}</span>
                  <span className="spine-t">{p.title}</span>
                  <span className="plus" aria-hidden="true">+</span>
                </button>

                <div className="body" id={`work-body-${p.id}`}>
                  <div className="body-in">
                    <div className="w-copy">
                      <p className="w-kick">
                        {p.index} · {p.kicker}
                      </p>
                      <h3 className="w-title">{p.title}</h3>
                      <p className="w-desc">{p.description}</p>
                      <ul className="w-feat">
                        {p.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <div className="w-tech">
                        {p.tech.map((t) => (
                          <span className="tc" key={t}>
                            <TechLogo name={t} size={16} />
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.github && (
                        <div className="w-act">
                          <a
                            className="btn btn-primary"
                            href={p.github}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View on GitHub ↗
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="w-ui">
                      <MiniUI variant={i} />
                      <span className="ui-tag">Illustrative UI</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}