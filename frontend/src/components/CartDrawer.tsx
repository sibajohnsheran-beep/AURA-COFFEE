
import { useEffect, useRef } from 'react'
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react'

import { useCart } from '../context/CartContext'
import './CartDrawer.css'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

export default function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
}: CartDrawerProps) {
  const {
    items,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart()

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="cart-layer">
      <div
        className="cart-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Your shopping cart"
      >
        <div className="cart-header">
          <div>
            <p className="cart-eyebrow">
              AURA COFFEE
            </p>

            <h2>Your Cart</h2>

            <span className="cart-subtitle">
              {cartCount}{' '}
              {cartCount === 1 ? 'item' : 'items'} selected
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="cart-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1.2} />

            <h3>Your cart is empty</h3>

            <p>Your next favourite coffee is waiting.</p>

            <a
              href="/#collection"
              className="cart-explore"
              onClick={onClose}
            >
              EXPLORE OUR COFFEE
              <ArrowRight size={17} />
            </a>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article
                  className="cart-item"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>

                    <p>
                      LKR {item.price.toLocaleString('en-LK')}
                    </p>

                    <div className="cart-item-bottom">
                      <div className="cart-quantity">
                        <button
                          type="button"
                          disabled={item.quantity <= 1}
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                          }}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Subtotal</span>

                <strong>
                  LKR {cartTotal.toLocaleString('en-LK')}
                </strong>
              </div>

              <p className="cart-footer-note">
                Delivery fees, if applicable, are
                calculated at checkout.
              </p>

              <button
                type="button"
                className="cart-checkout"
                onClick={onCheckout}
              >
                CONTINUE TO CHECKOUT
                <ArrowRight size={19} />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
