import fs from 'node:fs'
import path from 'node:path'

const src = 'node_modules/simple-icons/icons'
const out = 'public/logos'

// file name in simple-icons -> [our file name, official brand colour]
const icons = {
  leetcode: ['leetcode', '#FFA116'],
  codechef: ['codechef', '#5B4638'],
  geeksforgeeks: ['geeksforgeeks', '#2F8D46'],
  hackerrank: ['hackerrank', '#00B35A'],
}

fs.mkdirSync(out, { recursive: true })

for (const [name, [file, color]] of Object.entries(icons)) {
  const p = path.join(src, `${name}.svg`)
  if (!fs.existsSync(p)) {
    console.warn('missing:', name)
    continue
  }
  let svg = fs.readFileSync(p, 'utf8')
  svg = svg.replace('<svg', `<svg fill="${color}"`)
  fs.writeFileSync(path.join(out, `${file}.svg`), svg)
  console.log('copied', file)
}

const lic = 'node_modules/simple-icons/LICENSE.md'
if (fs.existsSync(lic)) fs.copyFileSync(lic, path.join(out, 'LICENSE-simple-icons.txt'))