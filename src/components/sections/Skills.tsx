import { useEffect, useMemo, useState } from 'react'
import { PROJECTS, SKILL_GROUPS } from '@/lib/data'
import { useInView } from '@/lib/hooks'
import TechLogo from '@/components/ui/TechLogo'

const norm = (n: string) => n.toLowerCase().replace(/[^a-z0-9+#]/g, '')

function makeSymbols(names: string[]) {
  const used = new Set<string>()
  return names.map((n) => {
    const letters = n.replace(/[^a-zA-Z]/g, '')
    const first = (letters[0] ?? '?').toUpperCase()
    let sym = first + (letters[1] ?? '').toLowerCase()
    for (let i = 2; used.has(sym) && i < letters.length; i++) {
      sym = first + letters[i].toLowerCase()
    }
    used.add(sym)
    return sym
  })
}

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 })
  const [filter, setFilter] = useState('All')
  const [cols, setCols] = useState(8)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width:700px)')
    const set = () => setCols(mq.matches ? 4 : 8)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  const items = useMemo(() => {
    const flat = SKILL_GROUPS.flatMap((g) =>
      g.skills.map((name) => ({ name, family: g.family })),
    )
    const symbols = makeSymbols(flat.map((s) => s.name))
    return flat.map((s, i) => ({ ...s, symbol: symbols[i], number: i + 1 }))
  }, [])

  const families = ['All', ...SKILL_GROUPS.map((g) => g.family)]
  const active = items[activeIdx] ?? items[0]
  const usedIn = active
    ? PROJECTS.filter((p) => p.tech.some((t) => norm(t) === norm(active.name)))
    : []

  return (
    <section id="skills" className="skills section">
      <style>{`
        .skills-head{display:flex;flex-direction:column;gap:16px;margin-bottom:40px;}
        .chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;}
        .chip{height:38px;padding:0 16px;border-radius:999px;font-size:13px;font-weight:500;
          box-shadow:inset 0 0 0 1px var(--line);
          transition:background .4s var(--ease),color .4s var(--ease);}
        .chip:hover{background:var(--soft);}
        .chip.on{background:var(--ink);color:#fff;box-shadow:none;}

        .sk-layout{display:grid;gap:32px;align-items:start;
          grid-template-columns:minmax(0,1fr) 320px;}
        @media (max-width:1000px){.sk-layout{grid-template-columns:1fr;}}

        .sk-grid{display:grid;gap:10px;grid-template-columns:repeat(8,minmax(0,1fr));}
        @media (max-width:700px){.sk-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;}}

        .tile-w{opacity:0;transform:translateY(16px) scale(.94);
          transition:opacity .7s var(--ease),transform .7s var(--ease);
          transition-delay:calc(var(--d,0) * 40ms);}
        .sk-grid.in .tile-w{opacity:1;transform:none;}

        .tile{position:relative;width:100%;aspect-ratio:1/1.08;border-radius:16px;
          background:var(--card);box-shadow:inset 0 0 0 1px var(--line);
          padding:8px 9px;text-align:left;display:flex;flex-direction:column;
          justify-content:space-between;
          transition:opacity .4s var(--ease),transform .4s var(--ease),
            background .4s var(--ease),color .4s var(--ease),box-shadow .4s var(--ease);}
        .tile.dim{opacity:.22;}
        .tile:hover,.tile.sel{background:var(--ink);color:#fff;transform:translateY(-4px);
          box-shadow:0 18px 36px -14px rgba(13,13,13,.45);}
        .tile .n{font-family:var(--font-mono);font-size:10px;color:var(--mute);}
        .tile:hover .n,.tile.sel .n{color:#bdbdbd;}
        .tile .sym{font-weight:700;font-size:clamp(20px,2.6vw,32px);letter-spacing:-.04em;line-height:1;}
        .tile .nm{font-size:11px;font-weight:500;line-height:1.15;overflow:hidden;
          text-overflow:ellipsis;white-space:nowrap;}
        .tile .fm{font-family:var(--font-mono);font-size:8px;letter-spacing:.06em;
          text-transform:uppercase;color:var(--mute);overflow:hidden;
          text-overflow:ellipsis;white-space:nowrap;}
        .tile:hover .fm,.tile.sel .fm{color:#bdbdbd;}
        @media (max-width:700px){.tile .fm{display:none;}.tile .nm{font-size:10px;}}

        .inspect{position:sticky;top:110px;border-radius:26px;padding:28px;min-height:380px;
          display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;}
        @media (max-width:1000px){.inspect{position:static;min-height:0;}}
        .insp-logo{width:190px;height:190px;display:grid;place-items:center;border-radius:50%;
          background:radial-gradient(circle,rgba(13,13,13,.06),transparent 68%);
          color:var(--ink);}
        .insp-logo > *{animation:pop .7s var(--ease);}
        @keyframes pop{from{opacity:0;transform:scale(.6) rotate(-8deg);}to{opacity:1;transform:none;}}
        .insp-name{font-weight:700;font-size:28px;letter-spacing:-.035em;margin-top:6px;}
        .insp-fam{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;
          text-transform:uppercase;color:var(--mute);}
        .insp-used{margin-top:14px;width:100%;border-top:1px solid var(--line);padding-top:14px;
          font-size:13px;color:var(--ink-2);}
        .insp-used b{display:block;font-family:var(--font-mono);font-weight:500;font-size:10px;
          letter-spacing:.1em;text-transform:uppercase;color:var(--mute);margin-bottom:6px;}
      `}</style>

      <div className="wrap" ref={ref}>
        <div className="skills-head">
          <p className="tag rv">02 — Skills</p>
          <h2 className="h-display rv" style={{ ['--i' as string]: 1 }}>
            The periodic table of <em>my stack.</em>
          </h2>
        </div>

        <div className="chips rv" role="group" aria-label="Filter skills by family">
          {families.map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? 'on' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="sk-layout">
          <div className={`sk-grid ${inView ? 'in' : ''}`} role="list">
            {items.map((s, i) => {
              const row = Math.floor(i / cols)
              const col = i % cols
              const dim = filter !== 'All' && s.family !== filter
              return (
                <div
                  key={s.name}
                  role="listitem"
                  className="tile-w"
                  style={{ ['--d' as string]: row + col }}
                >
                  <button
                    className={`tile ${dim ? 'dim' : ''} ${i === activeIdx ? 'sel' : ''}`}
                    onMouseEnter={() => setActiveIdx(i)}
                    onFocus={() => setActiveIdx(i)}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`${s.name}, ${s.family}`}
                  >
                    <span className="n">{String(s.number).padStart(2, '0')}</span>
                    <span className="sym">{s.symbol}</span>
                    <span>
                      <span className="nm" style={{ display: 'block' }}>{s.name}</span>
                      <span className="fm" style={{ display: 'block' }}>{s.family}</span>
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          {active && (
            <aside className="inspect card rv" aria-live="polite">
              <div className="insp-logo" key={active.name}>
                <TechLogo name={active.name} size={150} />
              </div>
              <p className="insp-name">{active.name}</p>
              <p className="insp-fam">{active.family}</p>
              <div className="insp-used">
                <b>Used in</b>
                {usedIn.length
                  ? usedIn.map((p) => p.title).join(' · ')
                  : 'Not linked to a project yet'}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}