
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CoffeeStory.css'

gsap.registerPlugin(ScrollTrigger)

type StoryScene = {
  number: string
  eyebrow: string
  title: string
  accent: string
  description: string
  image: string
  video?: string
  reveal?: boolean
}

const scenes: StoryScene[] = [
  {
    number: '01',
    eyebrow: 'FROM THE VERY BEGINNING',
    title: 'THE ORIGIN',
    accent: 'OF FLAVOUR.',
    description:
      'Every exceptional cup begins with carefully selected beans, grown with passion and chosen for their character.',
    image: '/images/story-beans.png',
    video: '/videos/story-beans.mp4',
  },
  {
    number: '02',
    eyebrow: 'THE ART OF PRECISION',
    title: 'THE CRAFT',
    accent: 'OF COFFEE.',
    description:
      'A perfect balance of temperature, timing and technique transforms every bean into something extraordinary.',
    image: '/images/story-brewing.png',
    video: '/videos/story-brewing.mp4',
  },
  {
    number: '03',
    eyebrow: 'MORE THAN JUST A DRINK',
    title: 'THE MOMENT',
    accent: 'IS YOURS.',
    description:
      'A quiet pause. A warm conversation. A beautiful cup. These are the moments worth remembering.',
    image: '/images/story-cup.png',
    video: '/videos/story-cup.mp4',
  },
  {
    number: '04',
    eyebrow: 'WELCOME TO YOUR HAPPY PLACE',
    title: 'STEP INTO',
    accent: 'AURA COFFEE.',
    description:
      'A warm space, familiar faces and unforgettable coffee. Come in, slow down and make yourself at home.',
    image: '/images/coffee-shop-interior.png',
    reveal: true,
  },
]

export default function CoffeeStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(
        '.coffee-story-panel'
      )

      panels.forEach((panel) => {
        const media = panel.querySelector<HTMLElement>(
          '.story-scene-image'
        )
        const content = panel.querySelector<HTMLElement>(
          '.story-scene-content'
        )

        const isReveal = panel.classList.contains(
          'coffee-story-reveal'
        )

        if (media && !reduceMotion) {
          gsap.fromTo(
            media,
            {
              scale: isReveal ? 1.65 : 1.18,
            },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: isReveal ? 'top top' : 'top bottom',
                end: isReveal ? 'bottom bottom' : 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          )
        }

        if (content && !reduceMotion) {
          gsap.fromTo(
            content,
            {
              y: 70,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: isReveal ? 'top 65%' : 'top 75%',
                once: true,
              },
            }
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="coffee-story"
      id="coffee-story"
      ref={sectionRef}
    >
      {scenes.map((scene) => (
        <div
          className={`coffee-story-panel ${
            scene.reveal ? 'coffee-story-reveal' : ''
          }`}
          key={scene.number}
        >
          <div className="story-scene-image-wrap">
            {scene.video ? (
              <video
                className="story-scene-image"
                src={scene.video}
                poster={scene.image}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                className="story-scene-image"
                src={scene.image}
                alt="AURA COFFEE luxury café interior"
                loading="lazy"
              />
            )}
          </div>

          <div className="story-scene-shade" />

          <div className="story-scene-content">
            <span className="story-scene-number">
              {scene.number} / 04
            </span>

            <p className="story-scene-eyebrow">
              {scene.eyebrow}
            </p>

            <h2>
              {scene.title}
              <br />
              <em>{scene.accent}</em>
            </h2>

            <p className="story-scene-description">
              {scene.description}
            </p>
          </div>

          <div className="story-scene-bottom">
            <span>AURA COFFEE</span>
            <span>
              {scene.reveal
                ? 'WELCOME HOME'
                : 'CRAFTED WITH INTENTION'}
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}
