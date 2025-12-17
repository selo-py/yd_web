import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  // Route değiştiğinde sayfayı en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const toggleVisibility = () => {
      // Sayfa 300px aşağı kaydırıldığında butonu göster
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Scroll event listener ekle
    window.addEventListener('scroll', toggleVisibility)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-brand text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          aria-label="Yukarı çık"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  )
}

