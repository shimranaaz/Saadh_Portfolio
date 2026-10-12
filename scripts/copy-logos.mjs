import fs from 'node:fs'
import path from 'node:path'

const src = 'node_modules/devicon/icons'
const out = 'public/logos'

// devicon folder names (the file keeps the same name in public/logos)
const icons = [
  'javascript', 'typescript', 'python', 'java', 'c', 'cplusplus',
  'react', 'html5', 'css3', 'tailwindcss', 'bootstrap', 'nextjs',
  'redux', 'vitejs', 'nodejs', 'express', 'mongodb', 'mysql',
  'postgresql', 'firebase', 'git', 'github', 'vscode', 'docker',
  'figma', 'postman', 'npm',
  'dart', 'flutter', 'kotlin', 'swift', 'android', 'apple',
  'graphql', 'sqlite', 'amazonwebservices', 'azure', 'googlecloud', 'bitbucket',
]

// try the colourful "original" first, then fall back to other variants
const variants = ['original', 'plain', 'original-wordmark', 'plain-wordmark']

fs.mkdirSync(out, { recursive: true })

let copied = 0
for (const name of icons) {
  const found = variants
    .map((v) => path.join(src, name, `${name}-${v}.svg`))
    .find((f) => fs.existsSync(f))
  if (found) {
    fs.copyFileSync(found, path.join(out, `${name}.svg`))
    copied++
  } else {
    console.warn('missing:', name)
  }
}

const lic = 'node_modules/devicon/LICENSE'
if (fs.existsSync(lic)) fs.copyFileSync(lic, path.join(out, 'LICENSE-devicon.txt'))

console.log(`Copied ${copied} logos to ${out}`)