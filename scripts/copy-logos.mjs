import fs from 'node:fs'
import path from 'node:path'

const src = 'node_modules/devicon/icons'
const out = 'public/logos'

const icons = [
  'javascript', 'typescript', 'python', 'java', 'c', 'cplusplus',
  'react', 'html5', 'css3', 'tailwindcss', 'bootstrap', 'nextjs',
  'redux', 'vitejs', 'nodejs', 'express', 'mongodb', 'mysql',
  'postgresql', 'firebase', 'git', 'github', 'vscode', 'docker',
  'figma', 'postman', 'npm',
]

fs.mkdirSync(out, { recursive: true })

let copied = 0
for (const name of icons) {
  const file = path.join(src, name, `${name}-original.svg`)
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(out, `${name}.svg`))
    copied++
  } else {
    console.warn('missing:', name)
  }
}

const lic = 'node_modules/devicon/LICENSE'
if (fs.existsSync(lic)) fs.copyFileSync(lic, path.join(out, 'LICENSE-devicon.txt'))

console.log(`Copied ${copied} logos to ${out}`)