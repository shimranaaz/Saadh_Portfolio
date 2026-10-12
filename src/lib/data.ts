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
    quote?: string
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
  detail: string // use \n between lines to show them as bullets
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
    image?: string
}

export interface Certification {
  title: string
  issuer: string
  link?: string
}

export interface Achievement {
  platform: string
  label: string
  caption: string
  detail: string
  value: number // number that counts up
  suffix?: string // "+", "%"...
}

// ---------- Data (from the résumé) ----------
export const PROFILE: Profile = {
  name: 'Mohammed Saadh M',
  firstName: 'Saadh',
  initials: 'MS',
  role: 'Flutter Developer',
  email: 'mohammedsaadh22@gmail.com',
  phone: '+91 70101 41417',
  phoneHref: 'tel:+917010141417',
  location: 'Ambur, Tamil Nadu, India',
  resumeSummary:
    'Experienced Flutter and Android developer with 5 years of expertise in Dart, Kotlin, and state management (BLoC, GetX, Provider). Skilled in responsive UI/UX design, integrating APIs, and managing data storage. Strong focus on delivering high-quality, scalable mobile applications. Proficient in Android development using Kotlin, including MVVM architecture. Adept at collaborating with teams and continuously improving app performance.',
  resume: '/resume.pdf',
    quote: 'High-quality, scalable mobile apps, shipped to the App Store and Google Play.',
  // github and linkedin: add once the links are available
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
  { family: 'Languages', skills: ['Dart', 'Java', 'Kotlin', 'Swift'] },
  { family: 'Mobile', skills: ['Flutter', 'Android SDK', 'iOS SDK'] },
  { family: 'Backend', skills: ['REST APIs', 'GraphQL', 'Firebase'] },
  { family: 'Databases', skills: ['SQLite', 'MySQL', 'PostgreSQL'] },
  { family: 'Cloud', skills: ['AWS', 'Azure', 'GCP'] },
  { family: 'Tools', skills: ['Git', 'SVN', 'Bitbucket'] },
  {
    family: 'State & architecture',
    skills: ['BLoC', 'GetX', 'Provider', 'MVVM', 'MVC'],
  },
  {
    family: 'Practices',
    skills: ['Unit testing', 'Integration testing', 'Agile'],
  },
]
export const EXPERIENCE: ExperienceItem[] = [
  {
    period: 'Feb 2025 – Present',
    title: 'Senior Software Engineer',
    place: 'TCS',
    detail:
      'Developing high-performance mobile applications, ensuring timely delivery and adherence to project milestones.\n' +
      'Implementing state management using BLoC, GetX, and Provider, and utilizing MVC and MVVM architectures to optimize app performance, scalability, and code maintainability across projects.\n' +
      'Designing responsive UI/UX and improving app performance through efficient state management and code optimization.',
    tech: ['BLoC', 'GetX', 'Provider', 'MVC', 'MVVM'],
  },
  {
    period: 'Jan 2021 – Jan 2025',
    title: 'Senior Flutter Developer',
    place: 'Colan Infotech Private Limited',
    detail:
      'Led a cross-functional team in developing a high-performance mobile application, ensuring timely delivery and adherence to project milestones.\n' +
      'Implemented state management using BLoC, GetX, and Provider, and utilized MVC and MVVM architectures to optimize app performance, scalability, and code maintainability across multiple projects.\n' +
      'Achieved a 20% improvement in app performance through efficient state management and code optimization, and enhanced user experience by designing responsive UI/UX, leading to a 15% increase in user engagement.',
    tech: ['BLoC', 'GetX', 'Provider', 'MVC', 'MVVM'],
  },
  {
    period: 'Jan 2019 – Nov 2019',
    title: 'Process Consultant',
    place: 'Hinduja Global Solutions Limited',
    detail:
      'Created and maintained Flutter apps for iOS and Android, including social media, e-commerce, and gaming apps.\n' +
      'Worked with designers and developers to add new features and fix bugs, using BLoC, GetX, and Provider for state management.\n' +
      'Successfully deployed apps to the App Store and Google Play, ensuring high-quality and timely delivery.',
    tech: ['Flutter', 'BLoC', 'GetX', 'Provider'],
  },
]
export const EDUCATION: EducationItem[] = [
  {
    period: 'Jun 2014 – May 2017',
    title: 'Bachelor of Science in Computer Science',
    place: 'Thiruvalluvar University',
    detail:
      'Graduated with 71%, Major in Computer Science\nThesis on “Innovative Approaches in Modern Software Engineering”',
  },
  {
    period: 'Jun 2012 – May 2014',
    title: 'High School (XII)',
    place: 'Mazharul Uloom Higher Secondary School',
    detail: 'Graduated with 79% (State Board Exam)',
  },
  {
    period: 'Jun 2010 – May 2012',
    title: 'High School (X)',
    place: 'Mazharul Uloom Higher Secondary School',
    detail: 'Graduated with 69% (State Board Exam)',
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'world-tradex',
    index: '01',
    title: 'World TradeX Inc',
    kicker: 'Marketplace & shipping',
    description:
      'Developed a multifaceted application that connects sellers and buyers, enabling efficient product transactions and shipping processes.',
    features: [
      'Seller and buyer modules',
      'Logistic and PPD shipping options',
      'BLE (Bluetooth Low Energy) integration',
      'Live location tracker',
      'Real-time packaging temperature tracking',
      'State management with GetX',
    ],
    tech: ['Flutter', 'Node.js'],
      image: '/ecommerce.jpg',
  },
  {
    id: 'terraview-os',
    index: '02',
    title: 'Terraview OS',
    kicker: 'Agriculture software',
    description:
      'Developed innovative software solutions to meet the evolving needs of the agricultural sector, focusing on productivity and sustainability.',
    features: [
      'Agricultural and viticulture modules',
      'MVVM architecture',
      'State management with Provider',
      'Native Android method channel',
    ],
    tech: ['Flutter', 'Native Android', 'Python'],
      image: '/Terraview.jpg',
  },
  {
    id: 'we-swap-any-car',
    index: '03',
    title: 'We Swap Any Car',
    kicker: 'Used-car marketplace',
    description:
      'Engineered the “We Swap Any Car” mobile app using Flutter for cross-platform compatibility, a user-friendly marketplace for buying, selling, and swapping used cars.',
    features: [
      'Buy, sell and swap used cars',
      'High-level animations',
      'Secure payment system',
      'BLoC state management',
      'MVVM architecture',
    ],
    tech: ['Flutter', 'Node.js', 'Firebase'],
     image: '/car.jpg',
  },
  {
    id: 'singx',
    index: '04',
    title: 'SingX',
    kicker: 'Money transfer',
    description:
      'Led the end-to-end development of a global money transfer application using Flutter, serving Android, iOS, and web users.',
    features: [
      'Requirements gathered directly with clients',
      'Secure payment system',
      'Minimal plugin usage for enhanced security',
      'BLoC state management',
      'MVVM architecture',
    ],
    tech: ['Flutter', 'Node.js'],
      image: '/mobile.jpg',
  },
  {
    id: 'enrich-tv',
    index: '05',
    title: 'Enrich TV',
    kicker: 'Learning TV platform',
    description:
      'Designed and developed a TV-based platform with a built-in learning component, featuring renowned mentors, using Flutter for mobile, web, and Android TV.',
    features: [
      'Mobile, web and Android TV',
      'Consistent responsive UI across platforms',
      'Live TV feature with Socket.IO',
      'Provider state management',
      'MVVM architecture',
    ],
    tech: ['Flutter', 'Native Android', 'Python'],
    image: '/view-mobile.jpg',
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Core Java & J2EE Development',
    issuer: 'Jspider Training Institute, Chennai',
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  {
    platform: 'Apps',
    label: 'Mobile apps deployed',
    caption: 'To the App Store and Google Play',
    detail: 'Plus several web applications',
    value: 15,
    suffix: '+',
  },
  {
    platform: 'Years',
    label: 'Years of expertise',
    caption: 'Flutter and Android development',
    detail: 'Dart · Kotlin',
    value: 6,
  },
  {
    platform: 'Speed',
    label: 'App performance improvement',
    caption: 'Through state management and code optimization',
    detail: 'Senior Flutter Developer',
    value: 20,
    suffix: '%',
  },
  {
    platform: 'Users',
    label: 'Increase in user engagement',
    caption: 'Through responsive UI/UX design',
    detail: 'Senior Flutter Developer',
    value: 15,
    suffix: '%',
  },
]