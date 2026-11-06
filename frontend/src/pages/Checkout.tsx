
import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Coffee,
  CreditCard,
  MapPin,
  ShoppingBag,
  Truck,
} from 'lucide-react'

import { useCart } from '../context/CartContext'
import './Checkout.css'

type CheckoutProps = {
  onBack: () => void
}

type OrderType = 'delivery' | 'pickup'

type CheckoutForm = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  notes: string
}

const formatPrice = (amount: number) =>
  `LKR ${amount.toLocaleString('en-LK')}`

export default function Checkout({ onBack }: CheckoutProps) {
  const { items, cartCount, cartTotal, clearCart } = useCart()

  const [orderType, setOrderType] = useState<OrderType>('pickup')

  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [confirmedTotal, setConfirmedTotal] = useState(0)
  const [confirmedType, setConfirmedType] =
    useState<OrderType>('pickup')

  const deliveryFee = 0
  const total = cartTotal + deliveryFee

  const updateField = (
    field: keyof CheckoutForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (items.length === 0) return

    setConfirmedTotal(total)
    setConfirmedType(orderType)
    setSubmitted(true)
    clearCart()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (submitted) {
    return (
      <main className="checkout-page checkout-success-page">
        <div className="checkout-success">
          <CheckCircle2 size={64} strokeWidth={1.3} />

          <p className="checkout-eyebrow">
            AURA COFFEE / DEMO CHECKOUT
          </p>

          <h1>
            YOUR COFFEE
            <br />
            <em>AWAITS.</em>
          </h1>

          <p>
            Thank you, {form.fullName}! Your checkout
            details have been confirmed in this demo.
          </p>

          <div className="checkout-success-details">
            <span>Order type</span>
            <strong>
              {confirmedType === 'pickup'
                ? 'Café Pickup'
                : 'Delivery'}
            </strong>

            <span>Order total</span>
            <strong>{formatPrice(confirmedTotal)}</strong>

            <span>Status</span>
            <strong>Demo confirmation only</strong>
          </div>

          <p className="checkout-demo-warning">
            This is a frontend demonstration. No real order
            has been placed or payment collected.
          </p>

          <button
            type="button"
            className="checkout-primary-button"
            onClick={onBack}
          >
            BACK TO AURA COFFEE
            <ArrowRight size={18} />
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <button
          type="button"
          className="checkout-back"
          onClick={onBack}
        >
          <ArrowLeft size={17} />
          BACK TO SHOP
        </button>

        <div className="checkout-heading">
          <p className="checkout-eyebrow">
            AURA COFFEE / SECURE-STYLE DEMO CHECKOUT
          </p>

          <h1>
            THE FINAL
            <br />
            <em>POUR.</em>
          </h1>

          <p>
            Just a few more details before your perfect
            coffee moment.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="checkout-empty">
            <ShoppingBag size={42} />
            <h2>Your cart is empty</h2>
            <p>Add your favourite coffee before checkout.</p>

            <button
              type="button"
              className="checkout-primary-button"
              onClick={onBack}
            >
              EXPLORE OUR COFFEE
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="checkout-layout">
            <form
              id="aura-checkout-form"
              className="checkout-form"
              onSubmit={handleSubmit}
            >
              {/* CUSTOMER DETAILS */}
              <section className="checkout-panel">
                <div className="checkout-panel-heading">
                  <span className="checkout-step">01</span>

                  <div>
                    <p>YOUR INFORMATION</p>
                    <h2>Contact Details</h2>
                  </div>
                </div>

                <div className="checkout-fields">
                  <label className="checkout-field">
                    <span>FULL NAME *</span>
                    <input
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={100}
                      placeholder="Your full name"
                      value={form.fullName}
                      onChange={(event) =>
                        updateField('fullName', event.target.value)
                      }
                    />
                  </label>

                  <label className="checkout-field">
                    <span>PHONE NUMBER *</span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      required
                      pattern="(?:\+94|0)7[0-9]{8}"
                      title="Enter a Sri Lankan mobile number, e.g. 0771234567 or +94771234567"
                      placeholder="0771234567"
                      value={form.phone}
                      onChange={(event) =>
                        updateField('phone', event.target.value)
                      }
                    />
                  </label>

                  <label className="checkout-field checkout-field-full">
                    <span>EMAIL ADDRESS *</span>
                    <input
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(event) =>
                        updateField('email', event.target.value)
                      }
                    />
                  </label>
                </div>
              </section>

              {/* DELIVERY OR PICKUP */}
              <section className="checkout-panel">
                <div className="checkout-panel-heading">
                  <span className="checkout-step">02</span>

                  <div>
                    <p>HOW WOULD YOU LIKE IT?</p>
                    <h2>Delivery Method</h2>
                  </div>
                </div>

                <div className="checkout-methods">
                  <button
                    type="button"
                    className={`checkout-method ${
                      orderType === 'pickup' ? 'selected' : ''
                    }`}
                    onClick={() => setOrderType('pickup')}
                    aria-pressed={orderType === 'pickup'}
                  >
                    <Coffee size={25} />
                    <strong>Café Pickup</strong>
                    <span>Collect your order in person</span>
                  </button>

                  <button
                    type="button"
                    className={`checkout-method ${
                      orderType === 'delivery' ? 'selected' : ''
                    }`}
                    onClick={() => setOrderType('delivery')}
                    aria-pressed={orderType === 'delivery'}
                  >
                    <Truck size={25} />
                    <strong>Delivery</strong>
                    <span>Delivered to your address</span>
                  </button>
                </div>

                {orderType === 'delivery' && (
                  <div className="checkout-fields checkout-delivery-fields">
                    <label className="checkout-field checkout-field-full">
                      <span>DELIVERY ADDRESS *</span>
                      <input
                        type="text"
                        required
                        autoComplete="street-address"
                        placeholder="House number, street, area"
                        value={form.address}
                        onChange={(event) =>
                          updateField('address', event.target.value)
                        }
                      />
                    </label>

                    <label className="checkout-field checkout-field-full">
                      <span>CITY *</span>
                      <input
                        type="text"
                        required
                        autoComplete="address-level2"
                        placeholder="Your city"
                        value={form.city}
                        onChange={(event) =>
                          updateField('city', event.target.value)
                        }
                      />
                    </label>

                    <p className="checkout-delivery-note">
                      <MapPin size={16} />
                      Delivery availability and fees must be
                      confirmed by the café.
                    </p>
                  </div>
                )}
              </section>

              {/* PAYMENT METHOD */}
              <section className="checkout-panel">
                <div className="checkout-panel-heading">
                  <span className="checkout-step">03</span>

                  <div>
                    <p>PAYMENT PREFERENCE</p>
                    <h2>Payment Method</h2>
                  </div>
                </div>

                <div className="checkout-payment">
                  <CreditCard size={23} />

                  <div>
                    <strong>
                      {orderType === 'pickup'
                        ? 'Pay at Café'
                        : 'Cash on Delivery'}
                    </strong>

                    <p>
                      Payment is not processed on this
                      demo website.
                    </p>
                  </div>

                  <CheckCircle2 size={20} />
                </div>

                <label className="checkout-field checkout-notes">
                  <span>SPECIAL INSTRUCTIONS (OPTIONAL)</span>
                  <textarea
                    rows={4}
                    maxLength={500}
                    placeholder="Any special requests for your coffee?"
                    value={form.notes}
                    onChange={(event) =>
                      updateField('notes', event.target.value)
                    }
                  />
                </label>
              </section>

              <p className="checkout-form-notice">
                This is a demo checkout. Submitting the form
                will not create a real order.
              </p>
            </form>

            {/* ORDER SUMMARY */}
            <aside className="checkout-summary">
              <div className="checkout-summary-header">
                <p className="checkout-eyebrow">
                  YOUR SELECTION
                </p>

                <h2>Order Summary</h2>
                <span>{cartCount} items</span>
              </div>

              <div className="checkout-summary-items">
                {items.map((item) => (
                  <div
                    className="checkout-summary-item"
                    key={item.id}
                  >
                    <div className="checkout-summary-image">
                      <img src={item.image} alt={item.name} />
                      <span>{item.quantity}</span>
                    </div>

                    <div className="checkout-summary-info">
                      <h3>{item.name}</h3>
                      <p>
                        {formatPrice(item.price)} each
                      </p>
                    </div>

                    <strong>
                      {formatPrice(
                        item.price * item.quantity
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-summary-totals">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>

                <div>
                  <span>Delivery</span>
                  <strong>
                    {orderType === 'pickup'
                      ? 'FREE'
                      : 'To be confirmed'}
                  </strong>
                </div>

                <div className="checkout-grand-total">
                  <span>
                    {orderType === 'pickup'
                      ? 'TOTAL'
                      : 'ITEMS TOTAL'}
                  </span>

                  <strong>{formatPrice(total)}</strong>
                </div>
              </div>

              <button
                type="submit"
                form="aura-checkout-form"
                className="checkout-primary-button"
              >
                CONFIRM DEMO ORDER
                <ArrowRight size={19} />
              </button>

              <p className="checkout-summary-note">
                <ShoppingBag size={15} />
                Crafted with care, served with love.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
