import { CERTIFICATIONS } from '@/lib/data'

export default function Certifications() {
  if (CERTIFICATIONS.length === 0) return null

  return (
    <section id="certifications" className="certs">
      <style>{`
        .certs{background:var(--card);
          border-top:1px solid var(--line);border-bottom:1px solid var(--line);
          padding-block:clamp(96px,14vh,160px);}
        .certs-grid{display:grid;gap:48px;align-items:start;
          grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);}
        @media (max-width:900px){.certs-grid{grid-template-columns:1fr;gap:32px;}}

        .certs-side{position:sticky;top:120px;display:flex;flex-direction:column;gap:16px;}
        @media (max-width:900px){.certs-side{position:static;}}
        .certs-count{font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;
          text-transform:uppercase;color:var(--mute);}

        .cert-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line);}
        .cert{border-bottom:1px solid var(--line);}
        .cert-row{position:relative;display:grid;align-items:center;gap:20px;
          grid-template-columns:48px minmax(0,1fr) auto 28px;
          padding:24px 20px;overflow:hidden;color:var(--ink);
          transition:color .5s var(--ease);}
        .cert-row::before{content:"";position:absolute;inset:0;background:var(--ink);
          transform:scaleX(0);transform-origin:left;
          transition:transform .7s var(--ease);z-index:0;}
        .cert-row > *{position:relative;z-index:1;}
        .cert-row:hover,.cert-row:focus-visible{color:#fff;}
        .cert-row:hover::before,.cert-row:focus-visible::before{transform:scaleX(1);}
        .cert-n{font-family:var(--font-mono);font-size:12px;color:var(--mute);
          transition:color .5s var(--ease);}
        .cert-t{font-weight:600;font-size:clamp(17px,1.8vw,22px);letter-spacing:-.02em;}
        .cert-i{font-size:13px;color:var(--mute);text-align:right;
          transition:color .5s var(--ease);}
        .cert-row:hover .cert-n,.cert-row:hover .cert-i,
        .cert-row:focus-visible .cert-n,.cert-row:focus-visible .cert-i{color:#bdbdbd;}
        .cert-a{opacity:0;transform:translate(-10px,6px);font-size:20px;
          transition:opacity .5s var(--ease),transform .5s var(--ease);}
        .cert-row:hover .cert-a,.cert-row:focus-visible .cert-a{opacity:1;transform:none;}
        @media (max-width:600px){
          .cert-row{grid-template-columns:36px minmax(0,1fr) 24px;padding:20px 14px;}
          .cert-i{grid-column:2;grid-row:2;text-align:left;}
        }
      `}</style>

      <div className="wrap">
        <div className="certs-grid">
          <div className="certs-side">
            <p className="tag rv">04 — Certifications</p>
            <h2 className="h-display rv" style={{ ['--i' as string]: 1 }}>
              Always <em>learning.</em>
            </h2>
            <p className="certs-count rv" style={{ ['--i' as string]: 2 }}>
              {String(CERTIFICATIONS.length).padStart(2, '0')} certifications
            </p>
          </div>

          <ul className="cert-list">
            {CERTIFICATIONS.map((c, i) => {
              const inner = (
                <>
                  <span className="cert-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cert-t">{c.title}</span>
                  <span className="cert-i">{c.issuer}</span>
                  <span className="cert-a" aria-hidden="true">↗</span>
                </>
              )
              return (
                <li
                  key={c.title}
                  className="cert rv"
                  style={{ ['--i' as string]: i }}
                >
                  {c.link ? (
                    <a
                      className="cert-row"
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="cert-row" tabIndex={0}>
                      {inner}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}