import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllContentByType } from '../utils/dataManager.js'
import SEO from '../components/SEO.jsx'
import SearchBar from '../components/SearchBar.jsx'

function YouTubeCard({ item }) {
  return (
    <Link
      to={`/youtube/${item.slug}`}
      className="group block mx-auto w-[85.5%] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow bg-white dark:bg-zinc-900"
    >
      <div className="p-2 aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-lg">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2">{item.title}</h3>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 line-clamp-2">{item.intro}</p>
      </div>
    </Link>
  )
}

export default function YouTubeList() {
  const location = useLocation()
  const [allVideos, setAllVideos] = useState([])
  const [filteredVideos, setFilteredVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Sadece bu sayfadayken yükle
    if (location.pathname !== '/youtube') return

    setLoading(true)
    // Hem stored hem static verileri al (zaten tarihe göre sıralı)
    const loadVideos = async () => {
      const allContent = await getAllContentByType('youtubeVideos')
      setAllVideos(allContent)
      setFilteredVideos(allContent)
      setLoading(false)
    }
    loadVideos()
  }, [location.pathname])

  if (loading && location.pathname === '/youtube') {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-12">
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">Yükleniyor...</div>
      </main>
    )
  }

  return (
    <>
      <SEO
        title="YouTube Videoları"
        description="YouTube videoları - Girişimcilik, teknoloji ve inovasyon içerikleri"
        keywords="youtube, video, girişimcilik, teknoloji, inovasyon"
        url="/youtube"
      />
      <main className="mx-auto max-w-6xl px-4 pb-12">
        <header className="flex items-baseline justify-between mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">Videolar</h1>
          <span className="text-sm text-zinc-600 dark:text-zinc-300">{filteredVideos.length} içerik</span>
        </header>
        <h2 className="mt-1 text-base sm:text-lg font-medium text-zinc-700 dark:text-zinc-300">YouTube Video</h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-300">
        Markaların ve girişimcilerin perde arkasını anlatan detaylı başarı hikâyeleri burada.
        </p>
        
        <div className="mt-6">
          <SearchBar
            allItems={allVideos}
            onSearchResults={setFilteredVideos}
            placeholder="YouTube videolarında ara (başlık, konu, etiket)..."
          />
        </div>

        <div className="grid grid-cols-1 gap-7 mt-7">
          {filteredVideos.map(item => (
            <YouTubeCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </>
  )
}


