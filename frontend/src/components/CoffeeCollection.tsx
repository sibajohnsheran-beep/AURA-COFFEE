
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Plus, Check } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useCart } from '../context/CartContext'

import './CoffeeCollection.css'

gsap.registerPlugin(ScrollTrigger)

type Coffee = {
  id: number
  name: string
  category: string
  description: string
  price: number
  image: string
  tag: string
}

const coffees: Coffee[] = [
  {
    id: 1,
    name: 'Signature Espresso',
    category: 'CLASSIC / HOT',
    description: 'A bold, rich shot with a beautiful golden crema.',
    price: 650,
    image: '/images/espresso.png',
    tag: 'BEST SELLER',
  },
  {
    id: 2,
    name: 'Velvet Cappuccino',
    category: 'CLASSIC / HOT',
    description: 'Smooth espresso layered with silky steamed milk.',
    price: 950,
    image: '/images/cappuccino.png',
    tag: 'POPULAR',
  },
  {
    id: 3,
    name: 'Iced Vanilla Latte',
    category: 'SIGNATURE / ICED',
    description: 'Chilled espresso, creamy milk and sweet vanilla.',
    price: 1150,
    image: '/images/iced-latte.png',
    tag: 'REFRESHING',
  },
  {
    id: 4,
    name: 'Caramel Macchiato',
    category: 'SIGNATURE / HOT',
    description: 'Rich espresso with velvety milk and golden caramel.',
    price: 1250,
    image: '/images/caramel-macchiato.png',
    tag: 'SIGNATURE',
  },
]

export default function CoffeeCollection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { addToCart, items } = useCart()

  const [recentlyAdded, setRecentlyAdded] = useState<number | null>(
    null
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.collection-reveal',
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.collection-heading',
            start: 'top 85%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.coffee-card',
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.coffee-grid',
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleAddToCart = (coffee: Coffee) => {
    addToCart({
      id: String(coffee.id),
      name: coffee.name,
      price: coffee.price,
      image: coffee.image,
    })

    setRecentlyAdded(coffee.id)
  }

  return (
    <section
      className="coffee-collection"
      id="collection"
      ref={sectionRef}
    >
      <div className="collection-top">
        <div className="collection-heading">
          <p className="collection-eyebrow collection-reveal">
            02 / CRAFTED TO PERFECTION
          </p>

          <h2 className="collection-title collection-reveal">
            DISCOVER YOUR
            <br />
            <em>PERFECT BREW.</em>
          </h2>
        </div>

        <p className="collection-description collection-reveal">
          From bold espresso to silky smooth lattes,
          every creation is crafted to make your
          coffee moments extraordinary.
        </p>
      </div>

      <div className="coffee-grid">
        {coffees.map((coffee) => {
          const cartItem = items.find(
            (item) => item.id === String(coffee.id)
          )

          const quantity = cartItem?.quantity ?? 0

          const isRecentlyAdded =
            recentlyAdded === coffee.id && quantity > 0

          return (
            <article className="coffee-card" key={coffee.id}>
              <div className="coffee-image-wrap">
                <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="coffee-image"
                  loading="lazy"
                />

                <span className="coffee-tag">{coffee.tag}</span>

                <span className="coffee-image-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </div>

              <div className="coffee-info">
                <p className="coffee-category">
                  {coffee.category}
                </p>

                <div className="coffee-name-row">
                  <h3>{coffee.name}</h3>

                  <span className="coffee-price">
                    LKR {coffee.price.toLocaleString('en-LK')}
                  </span>
                </div>

                <p className="coffee-description">
                  {coffee.description}
                </p>

                <button
                  type="button"
                  className="coffee-add-button"
                  onClick={() => handleAddToCart(coffee)}
                >
                  {isRecentlyAdded ? (
                    <>
                      <Check size={17} />
                      ADDED TO CART ({quantity})
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      {quantity > 0
                        ? `ADD MORE (${quantity} IN CART)`
                        : 'ADD TO CART'}
                    </>
                  )}
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <div className="collection-footer">
        <span>HANDCRAFTED WITH PASSION</span>
        <span>FRESHLY BREWED • ALWAYS EXCEPTIONAL</span>
      </div>
    </section>
  )
}
