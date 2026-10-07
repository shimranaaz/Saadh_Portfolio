const norm = (n: string) => n.toLowerCase().replace(/[^a-z0-9+#]/g, '')

// skill name (normalised) -> file in /public/logos (without .svg)
const BRAND: Record<string, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  java: 'java',
  c: 'c',
  'c++': 'cplusplus',
  react: 'react',
  reactjs: 'react',
  html: 'html5',
  html5: 'html5',
  css: 'css3',
  css3: 'css3',
  tailwindcss: 'tailwindcss',
  tailwind: 'tailwindcss',
  bootstrap: 'bootstrap',
  nextjs: 'nextjs',
  redux: 'redux',
  vite: 'vitejs',
  nodejs: 'nodejs',
  node: 'nodejs',
  expressjs: 'express',
  express: 'express',
  mongodb: 'mongodb',
  mysql: 'mysql',
  postgresql: 'postgresql',
  firebase: 'firebase',
  git: 'git',
  github: 'github',
  vscode: 'vscode',
  docker: 'docker',
  figma: 'figma',
  postman: 'postman',
  npm: 'npm',
}

export const isBrand = (name: string) => norm(name) in BRAND

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

// thin line icons for concept skills (48 x 48)
const CONCEPT: Record<string, React.ReactNode> = {
  dsa: (
    <g {...stroke}>
      <circle cx="24" cy="9" r="4" />
      <circle cx="12" cy="26" r="4" />
      <circle cx="36" cy="26" r="4" />
      <circle cx="6" cy="41" r="3" />
      <circle cx="18" cy="41" r="3" />
      <path d="M21.5 12.5 14 22.5M26.5 12.5 34 22.5M10 29.5 7 38M14 29.5 17 38" />
    </g>
  ),
  oop: (
    <g {...stroke}>
      <path d="M24 5 41 14v20L24 43 7 34V14z" />
      <path d="M7 14l17 9 17-9M24 23v20" />
    </g>
  ),
  restapis: (
    <g {...stroke}>
      <path d="M14 8c-5 0-6 2-6 6v5c0 3-2 5-4 5 2 0 4 2 4 5v5c0 4 1 6 6 6" />
      <path d="M34 8c5 0 6 2 6 6v5c0 3 2 5 4 5-2 0-4 2-4 5v5c0 4-1 6-6 6" />
      <path d="M18 20h12M26 16l4 4-4 4M30 30H18M22 26l-4 4 4 4" />
    </g>
  ),
  systemdesign: (
    <g {...stroke}>
      <rect x="17" y="5" width="14" height="10" rx="2" />
      <rect x="4" y="33" width="14" height="10" rx="2" />
      <rect x="30" y="33" width="14" height="10" rx="2" />
      <path d="M24 15v9M11 33v-9h26v9" />
    </g>
  ),
  ai: (
    <g {...stroke}>
      <rect x="12" y="12" width="24" height="24" rx="4" />
      <rect x="19" y="19" width="10" height="10" rx="2" />
      <path d="M18 6v6M24 6v6M30 6v6M18 36v6M24 36v6M30 36v6M6 18h6M6 24h6M6 30h6M36 18h6M36 24h6M36 30h6" />
    </g>
  ),
  ml: (
    <g {...stroke}>
      <path d="M6 6v36h36" />
      <circle cx="14" cy="32" r="2" />
      <circle cx="21" cy="24" r="2" />
      <circle cx="29" cy="27" r="2" />
      <circle cx="37" cy="14" r="2" />
      <path d="M10 36 40 11" />
    </g>
  ),
}

const ALIAS: Record<string, string> = {
  dsa: 'dsa',
  datastructures: 'dsa',
  datastructuresandalgorithms: 'dsa',
  oop: 'oop',
  oops: 'oop',
  objectorientedprogramming: 'oop',
  restapis: 'restapis',
  restapi: 'restapis',
  rest: 'restapis',
  systemdesign: 'systemdesign',
  ai: 'ai',
  artificialintelligence: 'ai',
  ml: 'ml',
  machinelearning: 'ml',
}

export default function TechLogo({ name, size = 40 }: { name: string; size?: number }) {
  const key = norm(name)

  if (key in BRAND) {
    return (
      <img
        src={`/logos/${BRAND[key]}.svg`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    )
  }

  const concept = CONCEPT[ALIAS[key]]
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      {concept ?? (
        <g {...stroke}>
          <circle cx="24" cy="24" r="16" />
          <circle cx="24" cy="24" r="3" />
        </g>
      )}
    </svg>
  )
}