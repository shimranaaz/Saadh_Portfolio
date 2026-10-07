import { PROFILE } from '@/lib/data'
import { scrollToTarget } from '@/lib/scroll'

export default function Footer() {
  return (
    <footer className="foot">
      <style>{`
        .foot{border-top:1px solid var(--line);padding:28px 0 36px;}
        .foot-in{display:flex;align-items:center;justify-content:space-between;
          gap:16px;flex-wrap:wrap;font-size:13px;color:var(--mute);}
        .foot-in a,.foot-in button{color:var(--ink);font-weight:500;
          transition:opacity .3s var(--ease);}
        .foot-in a:hover,.foot-in button:hover{opacity:.6;}
        .foot-m{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;
          text-transform:uppercase;}
      `}</style>
      <div className="wrap">
        <div className="foot-in">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <button
            type="button"
            onClick={() => scrollToTarget('#top')}
          >
            Back to top ↑
          </button>
          <span className="foot-m">Built with React + Vite</span>
        </div>
      </div>
    </footer>
  )
}