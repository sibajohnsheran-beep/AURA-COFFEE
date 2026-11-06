
import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Checkout from './pages/Checkout'

export default function App() {
  const [path, setPath] = useState(
    () => window.location.pathname
  )

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigate = (nextPath: string) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }

  const goHome = () => {
    navigate('/')
  }

  const goCheckout = () => {
    navigate('/checkout')
  }

  return (
    <>
      <Navbar onCheckout={goCheckout} />

      {path === '/checkout' ? (
        <Checkout onBack={goHome} />
      ) : (
        <Home />
      )}
    </>
  )
}
