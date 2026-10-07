// ---------- Types ----------
export interface Profile {
  name: string
  firstName: string
  initials: string
  role: string
  email: string
  phone: string
  phoneHref: string
  location: string
  resumeSummary: string
  github?: string
  linkedin?: string
  resume: string // path inside /public, e.g. "/resume.pdf"
}

export interface NavItem {
  label: string
  href: string
}

export interface Skill {
  name: string
  family: string
}

export interface SkillGroup {
  family: string
  skills: string[]
}

export interface ExperienceItem {
  period: string
  title: string
  place: string
  detail: string
   tech?: string[]
}

export interface EducationItem {
  period: string
  title: string
  place: string
  detail: string
}

export interface Project {
  id: string
  index: string // "01", "02"...
  title: string
  kicker: string
  description: string
  features: string[]
  tech: string[]
  github?: string
}

export interface Certification {
  title: string
  issuer: string
  link?: string
}

export interface Achievement {
  platform: string // "LeetCode", "CodeChef"...
  label: string
  caption: string
  detail: string
  value: number // number that counts up
  suffix?: string // "+", "th"...
}

// ---------- Data (PLACEHOLDER: replace with résumé content) ----------
export const PROFILE: Profile = {
   name: 'Shimra',
  firstName: 'Shimra',
  initials: 'SH',
  role: 'Full Stack Developer',
  email: 'you@example.com',
  phone: '+00 00000 00000',
  phoneHref: 'tel:+0000000000',
  location: 'City, Country',
  resumeSummary:
    'Placeholder summary. This will be replaced with the exact summary from the résumé.',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  resume: '/resume.pdf',
}
export const NAV: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]
export const SKILL_GROUPS: SkillGroup[] = [
  { family: 'Languages', skills: ['JavaScript', 'TypeScript', 'Python'] },
  { family: 'Frontend', skills: ['React', 'HTML', 'CSS', 'Tailwind CSS'] },
  { family: 'Backend', skills: ['Node.js', 'Express.js'] },
  { family: 'Databases', skills: ['MongoDB', 'MySQL'] },
  { family: 'Tools', skills: ['Git', 'GitHub', 'VS Code'] },
    { family: 'Concepts', skills: ['DSA', 'OOP', 'REST APIs', 'System Design'] },
]
export const EXPERIENCE: ExperienceItem[] = [
  {
    period: 'May – June 2026',
    title: 'Full Stack Development Intern',
    place: 'Company Name',
    detail: 'Placeholder bullet one.\nPlaceholder bullet two.',
    tech: ['React', 'Node.js', 'MongoDB'],
  },
]

export const EDUCATION: EducationItem[] = [
  {
    period: '2018 – 2020',
    title: 'Intermediate',
    place: 'College Name',
    detail: 'Placeholder detail.',
  },
  {
    period: '2022 – 2026',
    title: 'B.Tech, Computer Science',
    place: 'University Name',
    detail: 'CGPA: 0.0',
  },
]


export const PROJECTS: Project[] = [
  {
    id: 'project-one',
    index: '01',
    title: 'Project One',
    kicker: 'Web app',
    description: 'Placeholder description of the first project.',
    features: ['Feature one', 'Feature two', 'Feature three', 'Feature four'],
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/',
  },
  {
    id: 'project-two',
    index: '02',
    title: 'Project Two',
    kicker: 'Website',
    description: 'Placeholder description of the second project.',
    features: ['Feature one', 'Feature two', 'Feature three', 'Feature four'],
    tech: ['React', 'Tailwind CSS'],
    github: 'https://github.com/',
  },
  {
    id: 'project-three',
    index: '03',
    title: 'Project Three',
    kicker: 'AI platform',
    description: 'Placeholder description of the third project.',
    features: ['Feature one', 'Feature two', 'Feature three', 'Feature four'],
    tech: ['Python', 'TypeScript'],
  },
]

export const CERTIFICATIONS: Certification[] = [
  { title: 'Placeholder Certification One', issuer: 'Issuer Name' },
  { title: 'Placeholder Certification Two', issuer: 'Issuer Name' },
  { title: 'Placeholder Certification Three', issuer: 'Issuer Name' },
]
export const ACHIEVEMENTS: Achievement[] = [
  {
    platform: 'LeetCode',
    label: 'Problems solved',
    caption: 'Placeholder caption',
    detail: 'Placeholder detail',
    value: 100,
    suffix: '+',
  },
  {
    platform: 'CodeChef',
    label: 'Problems solved',
    caption: 'Placeholder caption',
    detail: 'Placeholder detail',
    value: 50,
    suffix: '+',
  },
  {
    platform: 'GeeksforGeeks',
    label: 'Problems solved',
    caption: 'Placeholder caption',
    detail: 'Placeholder detail',
    value: 80,
    suffix: '+',
  },
  {
    platform: 'HackerRank',
    label: 'Badges earned',
    caption: 'Placeholder caption',
    detail: 'Placeholder detail',
    value: 5,
  },
  {
    platform: 'Codeforces',
    label: 'Contests joined',
    caption: 'Placeholder caption',
    detail: 'Placeholder detail',
    value: 12,
  },
  {
    platform: 'Hackathon',
    label: 'Events attended',
    caption: 'Placeholder caption',
    detail: 'Placeholder detail',
    value: 3,
  },
]