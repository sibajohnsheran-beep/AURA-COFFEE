
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import CoffeeCollection from '../components/CoffeeCollection'
import CoffeeStory from '../components/CoffeeStory'
import OurStory from '../components/OurStory'
import Footer from '../components/Footer'

import './Home.css'

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        {
          y: 65,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.18,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <main>
      {/* =========================
          CINEMATIC HERO SECTION
      ========================= */}
      <section
        className="hero"
        id="home"
        ref={heroRef}
      >
        <div className="hero-background">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/coffee-hero.jpg"
            aria-hidden="true"
          >
            <source
              src="/videos/coffee-pouring.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="hero-eyebrow hero-reveal">
            THE ART OF EXCEPTIONAL COFFEE
          </p>

          <h1 className="hero-title hero-reveal">
            EVERY SIP,
            <br />
            <em>A STORY.</em>
          </h1>

          <p className="hero-description hero-reveal">
            Crafted with passion. Brewed with precision.
            Experience coffee beyond the ordinary.
          </p>

          <a
            href="#collection"
            className="hero-button hero-reveal"
          >
            EXPLORE OUR COFFEE
            <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="hero-bottom">
          <span>EST. 2026 — AURA COFFEE</span>

          <a href="#collection">
            SCROLL TO EXPLORE
            <ArrowDown size={17} />
          </a>

          <span>CRAFTED WITH PASSION</span>
        </div>
      </section>

      {/* =========================
          EXPERIENCE INTRODUCTION
      ========================= */}
      <section
        className="intro-section"
        id="menu"
      >
        <p className="section-label">
          01 / THE EXPERIENCE
        </p>

        <h2>
          MORE THAN COFFEE.
          <br />
          <em>IT'S A FEELING.</em>
        </h2>

        <p>
          Every cup tells a story of carefully selected beans,
          thoughtful roasting, and unforgettable moments.
        </p>
      </section>

      {/* =========================
          PREMIUM COFFEE COLLECTION
      ========================= */}
      <CoffeeCollection />

      {/* =========================
          CINEMATIC SCROLL STORY
      ========================= */}
      <CoffeeStory />

      {/* =========================
          PREMIUM OUR STORY
      ========================= */}
      <OurStory />

      {/* =========================
          PREMIUM FOOTER
      ========================= */}
      <Footer />
    </main>
  )
}
