
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CartProduct = {
  id: string
  name: string
  price: number
  image: string
}

export type CartItem = CartProduct & {
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: CartProduct) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
)

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: CartProduct) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      )

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    )
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setItems([])

  const cartCount = useMemo(
    () => items.reduce(
      (total, item) => total + item.quantity,
      0
    ),
    [items]
  )

  const cartTotal = useMemo(
    () => items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
