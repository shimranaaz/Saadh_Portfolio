import { SmoothScroll } from '@/lib/scroll'
import RevealObserver from '@/components/ui/RevealObserver'
import Navigation from '@/components/Navigation'
import Hero from '@/components/hero/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Work from '@/components/sections/Work'
import Certifications from '@/components/sections/Certifications'
import Experience from '@/components/sections/Experience'
import Achievements from '@/components/sections/Achievements'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <>
      <SmoothScroll />
      <RevealObserver />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Certifications />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </>
  )
}