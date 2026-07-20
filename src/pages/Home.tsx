import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Features from '../components/Features'
import Showcase from '../components/Showcase'
import Terminal from '../components/Terminal'
import Download from '../components/Download'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    // Small delay lets the page render before scrolling
    const timer = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => clearTimeout(timer)
  }, [hash])

  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Showcase />
      <Terminal />
      <Download />
    </>
  )
}
