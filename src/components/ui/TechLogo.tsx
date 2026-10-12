import { useState } from 'react'
import type { ReactNode } from 'react'

const norm = (n: string) => n.toLowerCase().replace(/[^a-z0-9+#]/g, '')

// skill name (normalised) -> file in /public/logos (without .svg)
const BRAND: Record<string, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  java: 'java',
  c: 'c',
  'c++': 'cplusplus',
  dart: 'dart',
  kotlin: 'kotlin',
  swift: 'swift',
  flutter: 'flutter',
  android: 'android',
  androidsdk: 'android',
  nativeandroid: 'android',
  ios: 'apple',
  iossdk: 'apple',
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
  graphql: 'graphql',
  firebase: 'firebase',
  mongodb: 'mongodb',
  mysql: 'mysql',
  postgresql: 'postgresql',
  sqlite: 'sqlite',
  aws: 'amazonwebservices',
  azure: 'azure',
  gcp: 'googlecloud',
  googlecloud: 'googlecloud',
  git: 'git',
  github: 'github',
  bitbucket: 'bitbucket',
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

// thin line icons for concepts and tools without an official logo (48 x 48)
const CONCEPT: Record<string, ReactNode> = {
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
  // state management: events in, states out
  bloc: (
    <g {...stroke}>
      <rect x="16" y="12" width="16" height="24" rx="3" />
      <path d="M4 24h12M11 19l5 5-5 5M32 24h12M39 19l5 5-5 5" />
    </g>
  ),
  getx: (
    <g {...stroke}>
      <path d="M27 4 10 27h13l-2 17 17-23H25z" />
    </g>
  ),
  provider: (
    <g {...stroke}>
      <circle cx="24" cy="10" r="5" />
      <path d="M24 15v8M10 23h28M10 23v8M24 23v8M38 23v8" />
      <rect x="5" y="31" width="10" height="10" rx="2" />
      <rect x="19" y="31" width="10" height="10" rx="2" />
      <rect x="33" y="31" width="10" height="10" rx="2" />
    </g>
  ),
  // architecture
  mvvm: (
    <g {...stroke}>
      <rect x="8" y="5" width="32" height="10" rx="2" />
      <rect x="8" y="19" width="32" height="10" rx="2" />
      <rect x="8" y="33" width="32" height="10" rx="2" />
      <path d="M24 15v4M24 29v4" />
    </g>
  ),
  mvc: (
    <g {...stroke}>
      <circle cx="24" cy="9" r="5" />
      <circle cx="9" cy="37" r="5" />
      <circle cx="39" cy="37" r="5" />
      <path d="M21 13.5 12 32.5M27 13.5l9 19M14 37h20" />
    </g>
  ),
  // practices
  unittesting: (
    <g {...stroke}>
      <path d="M18 5h12M20 5v13L9 38a3 3 0 0 0 3 5h24a3 3 0 0 0 3-5L28 18V5" />
      <path d="M18 31l4 4 8-8" />
    </g>
  ),
  integrationtesting: (
    <g {...stroke}>
      <rect x="5" y="12" width="22" height="22" rx="4" />
      <rect x="21" y="16" width="22" height="22" rx="4" />
      <path d="M17 28l4 4 8-8" />
    </g>
  ),
  agile: (
    <g {...stroke}>
      <path d="M38 20a15 15 0 0 0-27-6M10 8v7h7" />
      <path d="M10 28a15 15 0 0 0 27 6M38 40v-7h-7" />
    </g>
  ),
  // version control (SVN has no official logo in the icon set)
  vcs: (
    <g {...stroke}>
      <circle cx="14" cy="10" r="4" />
      <circle cx="14" cy="38" r="4" />
      <circle cx="34" cy="20" r="4" />
      <path d="M14 14v20M34 24c0 6-6 8-20 8" />
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
  bloc: 'bloc',
  getx: 'getx',
  provider: 'provider',
  mvvm: 'mvvm',
  mvc: 'mvc',
  unittesting: 'unittesting',
  integrationtesting: 'integrationtesting',
  agile: 'agile',
  svn: 'vcs',
  subversion: 'vcs',
}

export default function TechLogo({ name, size = 40 }: { name: string; size?: number }) {
  const [failed, setFailed] = useState(false)
  const key = norm(name)

  if (key in BRAND && !failed) {
    return (
      <img
        src={`/logos/${BRAND[key]}.svg`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
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