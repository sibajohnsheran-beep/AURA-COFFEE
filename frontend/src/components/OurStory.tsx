
import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './OurStory.css'

gsap.registerPlugin(ScrollTrigger)

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.our-story-reveal',
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.our-story-image',
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="our-story" id="story" ref={sectionRef}>
      <div className="our-story-content">
        <p className="our-story-eyebrow our-story-reveal">
          04 / THE AURA PHILOSOPHY
        </p>

        <h2 className="our-story-title our-story-reveal">
          NOT JUST
          <br />
          COFFEE.
          <br />
          <em>A WAY OF LIFE.</em>
        </h2>

        <p className="our-story-description our-story-reveal">
          At AURA COFFEE, we believe every cup deserves
          intention. From carefully selected beans to
          the final pour, we celebrate the beauty of
          coffee craftsmanship.
        </p>

        <p className="our-story-description our-story-reveal">
          More than a place to drink coffee, AURA is
          a space to slow down, connect, and enjoy
          the little moments that make life extraordinary.
        </p>

        <a
          href="#contact"
          className="our-story-link our-story-reveal"
        >
          EXPERIENCE AURA
          <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="our-story-visual">
        <img
          src="/images/cafe-interior.png"
          alt="Warm and welcoming AURA coffee shop interior"
          className="our-story-image"
          loading="lazy"
        />

        <div className="our-story-image-overlay" />

        <div className="our-story-image-caption">
          <span>THE AURA EXPERIENCE</span>
          <span>CRAFTED FOR EVERY MOMENT</span>
        </div>
      </div>
    </section>
  )
}
