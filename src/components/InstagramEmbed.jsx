import { useEffect, useRef, useState } from 'react'

export default function InstagramEmbed({ permalink }) {
  const containerRef = useRef(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (!permalink) return

    function processEmbeds() {
      // Script yüklendikten sonra biraz bekle
      setTimeout(() => {
      if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
        window.instgrm.Embeds.process()
          setScriptLoaded(true)
        } else {
          // Script henüz yüklenmediyse tekrar dene
          setTimeout(processEmbeds, 100)
      }
      }, 100)
    }

    const existingScript = document.querySelector('script#instagram-embed-script')
    
    if (!existingScript) {
      const s = document.createElement('script')
      s.id = 'instagram-embed-script'
      s.async = true
      s.src = 'https://www.instagram.com/embed.js'
      s.onload = () => {
        processEmbeds()
      }
      s.onerror = () => {
        console.error('Instagram embed script yüklenemedi')
      }
      document.body.appendChild(s)
    } else {
      // Script zaten yüklü, sadece process et
      processEmbeds()
    }

    // Permalink değiştiğinde tekrar process et
    return () => {
      if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
        window.instgrm.Embeds.process()
      }
    }
  }, [permalink])

  if (!permalink) {
    return (
      <div className="w-full p-4 text-center text-zinc-500 dark:text-zinc-400">
        Instagram linki bulunamadı
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 12,
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '0 auto',
          maxWidth: 540,
          minWidth: 326,
          width: '100%'
        }}
      />
      {!scriptLoaded && (
        <div className="w-full p-4 text-center text-zinc-500 dark:text-zinc-400 text-sm">
          Instagram içeriği yükleniyor...
        </div>
      )}
    </div>
  )
}


