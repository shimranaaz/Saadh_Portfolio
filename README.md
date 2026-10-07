# Talking-Video Portfolio

A personal portfolio built with React, TypeScript, Tailwind CSS 4 and Vite.
Smooth scrolling is handled by Lenis (the only animation dependency).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Requires Node 20.19+ or 22.12+.

## Where the content lives

All text comes from one file: `src/lib/data.ts`
(PROFILE, NAV, SKILL_GROUPS, EXPERIENCE, EDUCATION, PROJECTS, CERTIFICATIONS, ACHIEVEMENTS).
Components only read from it.

Replace `public/resume.pdf` and `public/id.png` (ID card photo) with your own files.

## Sections

| # | Section | File |
|---|---------|------|
| 00 | Hero (talking video) | `src/components/hero/Hero.tsx` |
| 01 | About (lanyard ID card) | `src/components/sections/About.tsx` |
| 02 | Skills (periodic table) | `src/components/sections/Skills.tsx` |
| 03 | Work (accordion gallery) | `src/components/sections/Work.tsx` |
| 04 | Certifications | `src/components/sections/Certifications.tsx` |
| 05 | Education & experience | `src/components/sections/Experience.tsx` |
| 06 | Achievements (pinned gallery) | `src/components/sections/Achievements.tsx` |
| 07 | Contact + footer | `src/components/sections/Contact.tsx`, `src/components/Footer.tsx` |

## Rebuild the hero video

Keep the original clip at `video-source/intro-original.mp4` (16:9, about 10 s, person centred
on a plain white or light background). With ffmpeg installed, run the filter from Step 16:
it crops to a portrait, whitens the backdrop, cross-fades the last 0.5 s into the first 0.5 s
(picture and sound), and exports `public/hero/hero.mp4` and `public/hero/hero.webm`.
The values 9.5 and 10 in that filter assume a 10 s source. Adjust them for a different length.

## Credits and licences

- Technology logos: [devicon](https://github.com/devicons/devicon) (MIT).
- Platform logos (LeetCode, CodeChef, GeeksforGeeks, HackerRank): [simple-icons](https://github.com/simple-icons/simple-icons) (CC0).
- Licence files are copied to `public/logos/`.
- Fonts (Inter Tight, Instrument Serif, JetBrains Mono) are self-hosted through `@fontsource` (SIL OFL).
