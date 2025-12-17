import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllContentByType } from '../utils/dataManager.js'
import SEO from '../components/SEO.jsx'
import SearchBar from '../components/SearchBar.jsx'

function FinansCard({ item }) {
  return (
    <Link
      to={`/finans/${item.slug}`}
      className="group block mx-auto w-[95%] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow bg-white dark:bg-zinc-900"
    >
      <div className="p-2 aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-lg">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.06]"
          loading="lazy"
        />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 transition-colors line-clamp-2">{item.title}</h3>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 line-clamp-2">{item.intro}</p>
      </div>
    </Link>
  )
}

export default function FinansList() {
  const location = useLocation()
  const [allFinans, setAllFinans] = useState([])
  const [filteredFinans, setFilteredFinans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Sadece bu sayfadayken yükle
    if (location.pathname !== '/finans') return

    setLoading(true)
    // Hem stored hem static verileri al (zaten tarihe göre sıralı)
    const loadFinans = async () => {
      const allContent = await getAllContentByType('finans')
      setAllFinans(allContent)
      setFilteredFinans(allContent)
      setLoading(false)
    }
    loadFinans()
  }, [location.pathname])

  if (loading && location.pathname === '/finans') {
    return (
      <main className="mx-auto max-w-6xl px-4 pb-12">
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">Yükleniyor...</div>
      </main>
    )
  }

  return (
    <>
      <SEO
        title="Finans"
        description="Makro görünüm ve girişim finansmanı notları"
        keywords="finans, finansman, makro ekonomi, girişim finansmanı, yatırım"
        url="/finans"
      />
      <main className="mx-auto max-w-6xl px-4 pb-12">
        <header className="flex items-baseline justify-between mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">Finans</h1>
        <span className="text-sm text-zinc-600 dark:text-zinc-300">{filteredFinans.length} içerik</span>
      </header>
      <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-300">Finans, yatırım ve para dünyasına dair net, sade ve öğretici içerikler.</p>
      
      <div className="mt-6">
        <SearchBar
          allItems={allFinans}
          onSearchResults={setFilteredFinans}
          placeholder="Finans içeriklerinde ara (başlık, konu, etiket)..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
        {filteredFinans.map(f => (
          <FinansCard key={f.id} item={f} />
        ))}
      </div>
      </main>
    </>
  )
}


