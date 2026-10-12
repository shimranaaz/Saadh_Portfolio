# Portfolio Animated — Buyer Guide

Thank you for buying! This guide assumes you have **never coded before**.
Follow the sections in order. Estimated time: 30–45 minutes.

If you get stuck, check Section 6 (Troubleshooting) first, then contact support (Section 7).

---

## 1. Quick start

You need two free programs:

1. **Node.js (LTS version):** https://nodejs.org — download, install, click Next through everything.
2. **VS Code:** https://code.visualstudio.com — download and install.

Then:

3. Unzip the template folder you downloaded.
4. Open VS Code → **File → Open Folder** → choose the unzipped folder.
5. Open the terminal: **Terminal → New Terminal**.
6. Type this and press Enter (wait until it finishes, 1–3 minutes):
   ```
   npm install
   ```
7. Type this and press Enter:
   ```
   npm run dev
   ```
8. The terminal shows a link, usually `http://localhost:5173`. Hold Ctrl (Cmd on Mac) and click it. Your site opens in the browser.

> [ADD A SCREENSHOT FOR EACH STEP. Do this yourself in a clean folder; you will catch missing steps.]

To stop the site, click in the terminal and press `Ctrl + C`.

---

## 2. What to replace

### Files

| File | What it is | How to replace |
|---|---|---|
| `src/lib/data.ts` | All your text, links, skills, projects | Edit the values (see below) |
| `public/resume.pdf` | Your resume (the Resume button opens this) | Put your PDF here, named exactly `resume.pdf` |
| `public/id.png` | Photo on the ID card | Same file name. The included image is 186×161 px; use the same proportions (larger is fine) |
| `public/portrait-bust.png` | [WHERE IT APPEARS] | Same file name |
| `public/hero/hero.mp4` | Hero video | See Sections 3 and 4 |
| `public/favicon.svg` | Small icon in the browser tab | Same file name |
| `index.html` | Page title and description shown on Google and when sharing your link | Change the text in `<title>` and the `description` line |

Do not delete `public/logos/`. It holds the technology logos and their licence files.

### Your content: `src/lib/data.ts`

Open `src/lib/data.ts`. Rules:

- Only change the text **inside the quotes**. Do not change the word before the colon.
- Keep every comma, bracket `[ ]` and brace `{ }`.
- If your text contains an apostrophe (for example `I'm`), wrap that text in double quotes `"I'm"` instead of single quotes.
- Fields marked *optional* can be deleted completely (the whole line) if you don't need them.

#### Profile (`PROFILE`)

| Field | What it is | Example |
|---|---|---|
| `name` | Your full name | `'Priya Raman'` |
| `firstName` | Your first name | `'Priya'` |
| `initials` | Your initials (2 letters) | `'PR'` |
| `role` | Your job title | `'Full Stack Developer'` |
| `email` | Your email | `'priya@example.com'` |
| `phone` | Phone number as people should read it | `'+91 98765 43210'` |
| `phoneHref` | Same number for the call link: `tel:` + number, no spaces | `'tel:+919876543210'` |
| `location` | City and country | `'Chennai, India'` |
| `resumeSummary` | A short paragraph about you | `'Final-year CS student who builds...'` |
| `github` *(optional)* | Your GitHub link | `'https://github.com/yourname'` |
| `linkedin` *(optional)* | Your LinkedIn link | `'https://linkedin.com/in/yourname'` |
| `resume` | Path of your resume inside `public` | `'/resume.pdf'` |

#### Lists

Each list below is made of blocks `{ ... }`. To **add** an item, copy a whole block (including its comma) and edit it. To **remove** one, delete the whole block.

| List | Fields in each item |
|---|---|
| `NAV` | `label` (menu text), `href` (section link). Only change if you remove a section |
| `SKILL_GROUPS` | `family` (group title), `skills` (list of names) |
| `EXPERIENCE` | `period`, `title`, `place`, `detail` (use `\n` between lines), `tech` *(optional, list)* |
| `EDUCATION` | `period`, `title`, `place`, `detail` |
| `PROJECTS` | `id` (unique, lowercase, no spaces), `index` (`'01'`, `'02'`...), `title`, `kicker` (short label like `'Web app'`), `description`, `features` (list), `tech` (list), `github` *(optional)* |
| `CERTIFICATIONS` | `title`, `issuer`, `link` *(optional)* |
| `ACHIEVEMENTS` | `platform`, `label`, `caption`, `detail`, `value` (a number that counts up), `suffix` *(optional, like `'+'`)* |

Example project:

```ts
{
  id: 'my-chat-app',
  index: '01',
  title: 'Chat App',
  kicker: 'Web app',
  description: 'Real-time chat with rooms and typing indicators.',
  features: ['Rooms', 'Typing indicator', 'Dark mode', 'Image sharing'],
  tech: ['React', 'Node.js', 'MongoDB'],
  github: 'https://github.com/yourname/chat-app',
},
```

After saving, the browser updates automatically.

---

## 3. Making your intro video

> [WRITE THIS SECTION IN YOUR OWN WORDS, from your own process:
> which tool you used, your steps, your prompts, how long it takes, what to avoid.
> Do not copy another guide.]

Suggested outline:
1. Which tool to use and whether it is free
2. How to write your character/scene prompt (include 1–2 example prompts)
3. Video length, shape and format needed
4. Where to save the finished file
5. A reminder to check the tool's terms for commercial use

---

## 4. Building the hero video

The hero video is the short video at the top of your site. The site plays `public/hero/hero.mp4`.

1. Save your finished video somewhere easy to find, for example your Desktop.
2. In the VS Code terminal, run (put your own file path inside the quotes):
   ```
   npm run build-hero -- "path/to/your-video.mp4"
   ```
3. The converted video is saved to `public/hero/hero.mp4`, replacing the old one. Refresh the browser to see it.

> [TO DO BEFORE SELLING: the build-hero script does not exist yet. Delete this line once it works on Windows and Mac.]

---

## 5. Deploying your site (making it live)

First, check that your site builds without errors. In the terminal run:
```
npm run build
```
This creates a folder called `dist`. That folder is your finished website.

### Option A: Netlify (easiest)

1. Create a free account at https://netlify.com
2. Go to **Add new site → Deploy manually**.
3. Drag the `dist` folder into the box.
4. Your site is live. Rename it under **Site settings → Change site name**.

To update later: run `npm run build` again and drag the new `dist` folder in.

### Option B: GitHub + Vercel (updates automatically)

1. Create a free account at https://github.com and create a new repository.
2. Upload your project (not the `node_modules` or `dist` folders).
3. Create a free account at https://vercel.com → **Add New → Project** → choose your repository.
4. Click **Deploy**. Vercel detects the settings automatically.

> [ADD SCREENSHOTS. Test both options yourself before selling.]

---

## 6. Troubleshooting

**`npm` is not recognised**
Cause: Node.js is not installed, or VS Code was open during installation.
Fix: Install Node.js, close VS Code completely, reopen it.

**Red errors after editing `data.ts`**
Cause: usually a missing quote `'` or comma `,`, or an apostrophe inside single quotes.
Fix: Compare with the original line. Every value needs both quotes, and every line in a block needs a comma at the end. For text with an apostrophe, use double quotes.

**The Resume button shows "not found"**
Cause: there is no `resume.pdf` in the `public` folder.
Fix: Put your PDF in `public` and name it exactly `resume.pdf`.

**Strange characters like `Ã©` or `â€“` in your text**
Cause: the file was saved in the wrong text encoding.
Fix: In VS Code, click the encoding label at the bottom right → **Save with Encoding** → **UTF-8**.

**Favicon (tab icon) not updating**
Cause: your browser remembers the old one.
Fix: Hard refresh (`Ctrl + Shift + R` / `Cmd + Shift + R`), or open the site in a private window.

**`ffmpeg` is not recognised**
Cause: [YOUR CAUSE]
Fix: [YOUR FIX, for both Windows and Mac]

**Site works locally but looks wrong after deploying**
Cause: [YOUR CAUSE]
Fix: [YOUR FIX]

> [ADD EVERY ERROR YOU HIT YOURSELF: what you saw, why, the fix.]

---

## 7. Licence and support

**Licence:** One site per buyer. No resale or redistribution. Full terms are in `LICENSE.txt`.

**Support:** [YOUR EMAIL/CHANNEL]. Included for 30 days after purchase. Covers: setup problems, questions about the guide and bugs in the template. Does not cover: custom design changes, third-party tool problems, hosting account issues. Typical reply time: within 48 hours.

**Footer credit:** The template footer has a "Built with" line. You may remove it.

**Credits and third-party licences:**
- Technology logos: devicon (MIT licence). Licence file: `public/logos/LICENSE-devicon.txt`.
- Platform logos (LeetCode, CodeChef, HackerRank, GeeksforGeeks): simple-icons (CC0). Licence file: `public/logos/LICENSE-simple-icons.txt`. Brand logos remain trademarks of their respective owners.
- Fonts: Inter Tight, JetBrains Mono and Instrument Serif, installed through the Fontsource packages, licensed under the SIL Open Font License. They may not be sold on their own.
- Generated media: if you create your own video or images with AI tools, check that tool's terms for commercial use.