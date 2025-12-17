import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import SEO from '../components/SEO.jsx'
import { getAllContentByType, getHomeContent, getAllContents } from '../utils/dataManager.js'
import SearchBar from '../components/SearchBar.jsx'

// Öne çıkan içerikler (sadece admin panelinden seçilenler)
async function getFeaturedContent() {
  const homeContent = await getHomeContent()
  const featured = []
  
  // Vitrin 1, 2, 3'ü al
  for (let i = 1; i <= 3; i++) {
    const vitrin = homeContent[`vitrin${i}`]
    if (vitrin) {
      const allContent = await getAllContentByType(vitrin.type)
      const content = allContent.find(item => item.id === vitrin.id)
      if (content) {
        // Tip bilgisini ekle
        const typeMap = {
          videos: { contentType: 'video', path: '/video' },
          youtubeVideos: { contentType: 'youtube', path: '/youtube' },
          failures: { contentType: 'failure', path: '/basarisizlik-hikayeleri' },
          news: { contentType: 'news', path: '/yeni-dunya-haber' },
          finans: { contentType: 'finans', path: '/finans' },
        }
        const typeInfo = typeMap[vitrin.type] || {}
        featured.push({ ...content, type: vitrin.type, ...typeInfo })
      }
    }
  }
  
  // Sadece admin panelinden seçilen içerikleri döndür (fallback yok)
  return featured
}

// Son içerikler (sadece admin panelinden seçilenler)
async function getRecentContent() {
  const homeContent = await getHomeContent()
  
  // Sadece admin panelinden seçilen içerikleri göster
  if (homeContent.sonIcerikler && homeContent.sonIcerikler.length > 0) {
    const recentItems = []
    for (const item of homeContent.sonIcerikler) {
      const allContent = await getAllContentByType(item.type)
      const content = allContent.find(c => c.id === item.id)
      if (content) {
        const typeMap = {
          videos: { contentType: 'video', path: '/video' },
          youtubeVideos: { contentType: 'youtube', path: '/youtube' },
          failures: { contentType: 'failure', path: '/basarisizlik-hikayeleri' },
          news: { contentType: 'news', path: '/yeni-dunya-haber' },
          finans: { contentType: 'finans', path: '/finans' },
        }
        const typeInfo = typeMap[item.type] || {}
        recentItems.push({ ...content, type: item.type, ...typeInfo })
      }
    }
    // created_at veya createdAt alanına göre en yeniden en eskiye sırala
    return recentItems.sort((a, b) => {
      const dateA = a.createdAt || (a.created_at ? new Date(a.created_at).getTime() : 0)
      const dateB = b.createdAt || (b.created_at ? new Date(b.created_at).getTime() : 0)
      return dateB - dateA // En yeni önce (descending)
    })
  }
  
  // Admin panelinden seçilen içerik yoksa boş döndür
  return []
}

export default function Home() {
  const location = useLocation()
  const [displayCount, setDisplayCount] = useState(5)
  const [featured, setFeatured] = useState([])
  const [recent, setRecent] = useState([])
  const [allContents, setAllContents] = useState([]) // Tüm içerikleri tutmak için yeni state
  const [searchResults, setSearchResults] = useState([]) // Arama sonuçlarını tutmak için yeni state
  const [searchActive, setSearchActive] = useState(false) // Arama çubuğunda yazı olup olmadığını kontrol eder
  const [hasSearched, setHasSearched] = useState(false) // Daha önce arama yapılıp yapılmadığını kontrol eder

  useEffect(() => {
    // Sadece Home sayfasındayken yükle
    if (location.pathname !== '/') return

    // İlk yükleme
    const loadData = async () => {
      const featuredData = await getFeaturedContent()
      const recentData = await getRecentContent()
      const allContentsData = await getAllContents()
      
      setFeatured(featuredData)
      setRecent(recentData)
      setAllContents(allContentsData)
    }
    
    loadData()

    // Polling ile kontrol et (her 5 saniyede bir - Supabase değişiklikleri için)
    const interval = setInterval(() => {
      if (location.pathname === '/') {
        loadData()
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [location.pathname])

  // Arama sonuçlarını al ve sakla
  const handleSearchResults = useCallback((results) => {
    setSearchResults(results)
  }, [])

  // Arama durumunu güncelle
  const handleSearchChange = useCallback((isActive) => {
    setSearchActive(isActive)
    if (isActive) {
      setHasSearched(true) // Arama aktifse, arama yapıldı demektir
    } else {
      setSearchResults([]) // Çubuk tamamen boşaltıldığında sonuçları temizle
      setHasSearched(false) // Arama yapılmadı durumuna dön
    }
  }, [])

  const displayedRecent = recent.slice(0, displayCount)
  const hasMore = recent.length > displayCount

  return (
    <>
      <SEO
        title="Ana Sayfa"
        description="YD İnovasyon - Girişimcilik, Yapay Zeka, Finans, Teknoloji ve Yeni Dünya Düzeninden haberdar olmak için bizi takip edebilirsin."
        keywords="girişimcilik, yapay zeka, finans, teknoloji, inovasyon, startup, başarı hikayeleri"
      />
      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Newsletter Subscription Section */}
        <section className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-700 dark:text-zinc-300 text-center sm:text-left">
              Yeni içeriklerimizden anında haberdar olmak için mail bültenimize abone olmayı unutmayın!
            </p>
            <Link
              to="/bulten"
              className="flex-shrink-0 px-6 py-2 bg-brand text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
            >
              Abone Ol
            </Link>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="mb-8">
          <SearchBar
            allItems={allContents}
            onSearchResults={handleSearchResults}
            onSearchChange={handleSearchChange}
            placeholder="Tüm içeriklerde ara (başlık, konu, etiket)..."
          />

          {/* Arama Sonuçları - Arama çubuğunun hemen altında (çubuk boşaltılana kadar göster) */}
          {hasSearched && (
            <div className="mt-6 space-y-4">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    to={`${item.path}/${item.slug}`}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand dark:hover:border-brand transition-colors group"
                  >
                    <div className="flex-shrink-0 w-full sm:w-56 h-36 overflow-hidden rounded-md">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-md group-hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-brand dark:group-hover:text-white transition-colors line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      {item.intro && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {item.intro}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-zinc-600 dark:text-zinc-400 text-center py-8">
                  Arama sonucu bulunamadı.
                </p>
              )}
            </div>
          )}
        </section>

        {/* Featured Content Section */}
        {featured.length > 0 && !hasSearched && (
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Büyük öne çıkan içerik (sol) */}
              {featured[0] && (
                <Link
                  to={`${featured[0].path}/${featured[0].slug}`}
                  className="lg:col-span-2 group"
                >
                  <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                    <img
                      src={featured[0].cover || featured[0].thumbnail}
                      alt={featured[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-white line-clamp-2">
                        {featured[0].title}
                      </h2>
                    </div>
                  </div>
                </Link>
              )}

              {/* İki küçük öne çıkan içerik (sağ) */}
              <div className="flex flex-col gap-4">
                {featured[1] && (
                  <Link
                    to={`${featured[1].path}/${featured[1].slug}`}
                    className="group flex-1"
                  >
                    <div className="relative h-[150px] sm:h-[170px] lg:h-[190px] rounded-lg overflow-hidden">
                      <img
                        src={featured[1].cover || featured[1].thumbnail}
                        alt={featured[1].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-semibold text-white line-clamp-2">
                          {featured[1].title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )}
                {featured[2] && (
                  <Link
                    to={`${featured[2].path}/${featured[2].slug}`}
                    className="group flex-1"
                  >
                    <div className="relative h-[150px] sm:h-[170px] lg:h-[190px] rounded-lg overflow-hidden">
                      <img
                        src={featured[2].cover || featured[2].thumbnail}
                        alt={featured[2].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-semibold text-white line-clamp-2">
                          {featured[2].title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Recent Content Section - Sadece arama yapılmadığında göster */}
        {recent.length > 0 && !hasSearched && (
          <section>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">
              Son İçerikler
            </h2>
            <div className="space-y-4">
              {displayedRecent.map((item) => (
                <Link
                  key={`${item.type}-${item.id}`}
                  to={`${item.path}/${item.slug}`}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand dark:hover:border-brand transition-colors group"
                >
                  <div className="flex-shrink-0 w-full sm:w-56">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 sm:h-36 object-cover rounded-md group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-brand dark:group-hover:text-white transition-colors line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    {item.intro && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {item.intro}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {hasMore && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setDisplayCount(prev => prev + 5)}
                  className="px-6 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
                >
                  Daha Fazla Göster
                </button>
              </div>
            )}
            {!hasMore && displayCount > 5 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setDisplayCount(5)}
                  className="px-6 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
                >
                  Daha Az Göster
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  )
}
