
import { Coffee, Menu, X, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

import './Navbar.css'

type NavbarProps = {
  onCheckout: () => void
}

export default function Navbar({
  onCheckout,
}: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const { cartCount } = useCart()

  const closeMenu = () => setOpen(false)

  const handleCheckout = () => {
    setCartOpen(false)
    setOpen(false)
    onCheckout()
  }

  return (
    <>
      <header className="navbar">
        <a
          href="/"
          className="brand"
          onClick={closeMenu}
        >
          <Coffee size={25} />

          <span>
            AURA<span className="brand-light">COFFEE</span>
          </span>
        </a>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          <a href="/#home" onClick={closeMenu}>
            Home
          </a>

          <a href="/#menu" onClick={closeMenu}>
            Our Coffee
          </a>

          <a href="/#story" onClick={closeMenu}>
            Our Story
          </a>

          <a href="/#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-order"
            onClick={() => {
              setCartOpen(true)
              setOpen(false)
            }}
            aria-label={`Open shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={16} />
            <span>Order Now</span>

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </>
  )
}
