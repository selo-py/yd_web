import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHomeContent, setHomeContent, getAllContentByType } from '../../utils/dataManager.js'
import { isAdminAuthenticated, getAdminUser, isEditor as checkIsEditor } from '../../utils/authManagerSupabase.js'

const TYPE_PATHS = {
  videos: '/video',
  youtubeVideos: '/youtube',
  failures: '/basarisizlik-hikayeleri',
  news: '/yeni-dunya-haber',
  finans: '/finans',
}

export default function HomeContentView() {
  const navigate = useNavigate()
  const [homeContent, setHomeContentState] = useState({
    vitrin1: null,
    vitrin2: null,
    vitrin3: null,
    sonIcerikler: []
  })
  const [isEditor, setIsEditor] = useState(false)
  const [contentCache, setContentCache] = useState({}) // İçerik cache'i

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAdminAuthenticated()
      if (!authenticated) {
      navigate('/admin')
      return
    }

    // Kullanıcı rolünü kontrol et
      setIsEditor(await checkIsEditor())

    loadHomeContent()
    }
    
    checkAuth()
  }, [navigate])

  useEffect(() => {
    // Home content değiştiğinde içerikleri yükle
    const loadContents = async () => {
      const cache = {}
      
      // Vitrin içeriklerini yükle
      for (let i = 1; i <= 3; i++) {
        const vitrin = homeContent[`vitrin${i}`]
        if (vitrin && vitrin.id && vitrin.type) {
          const cacheKey = `${vitrin.type}-${vitrin.id}`
          if (!contentCache[cacheKey]) {
            const data = await getAllContentByType(vitrin.type)
            const found = data.find(item => item.id === vitrin.id)
            if (found) {
              cache[cacheKey] = found
            }
          }
        }
      }
      
      // Son içerikleri yükle
      if (homeContent.sonIcerikler && homeContent.sonIcerikler.length > 0) {
        for (const item of homeContent.sonIcerikler) {
          if (item.id && item.type) {
            const cacheKey = `${item.type}-${item.id}`
            if (!contentCache[cacheKey]) {
              const data = await getAllContentByType(item.type)
              const found = data.find(c => c.id === item.id)
              if (found) {
                cache[cacheKey] = found
              }
            }
          }
        }
      }
      
      if (Object.keys(cache).length > 0) {
        setContentCache(prev => ({ ...prev, ...cache }))
      }
    }
    
    if (homeContent) {
      loadContents()
    }
  }, [homeContent])

  const loadHomeContent = async () => {
    const content = await getHomeContent()
    setHomeContentState(content)
  }

  const getContentInfo = (id, type) => {
    const cacheKey = `${type}-${id}`
    return contentCache[cacheKey] || null
  }

  const handleRemoveFromVitrin = async (position) => {
    if (window.confirm('Bu içeriği kaldırmak istediğinize emin misiniz?')) {
      const content = { ...homeContent }
      content[position] = null
      const success = await setHomeContent(content)
      if (success) {
        alert('İçerik kaldırıldı!')
        await loadHomeContent()
      }
    }
  }

  const handleRemoveFromSonIcerikler = async (index) => {
    if (window.confirm('Bu içeriği kaldırmak istediğinize emin misiniz?')) {
      const content = { ...homeContent }
      if (content.sonIcerikler && content.sonIcerikler.length > index) {
        content.sonIcerikler.splice(index, 1)
        const success = await setHomeContent(content)
        if (success) {
          alert('İçerik kaldırıldı!')
          await loadHomeContent()
        }
      }
    }
  }

  const handleRemoveAllSonIcerikler = async () => {
    if (window.confirm('Tüm son içerikleri kaldırmak istediğinize emin misiniz?')) {
      const content = { ...homeContent }
      content.sonIcerikler = []
      const success = await setHomeContent(content)
      if (success) {
        alert('Tüm son içerikler kaldırıldı!')
        await loadHomeContent()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-blue-300 rounded-xl font-medium transition-all duration-200 mb-4 border border-blue-500/30 hover:border-blue-400/50"
          >
            ← Geri Dön
          </button>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Ana Sayfa İçerik Görüntüleme
          </h1>
          <p className="text-blue-300/80 mt-2">
            Ana sayfada görüntülenen içerikleri görüntüleyin{!isEditor && ' ve silin'}. İçerik eklemek için "Ana Sayfa İçeriği Ekle" sayfasını kullanın.
          </p>
        </div>

        {/* Vitrin İçerikleri */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">
              Vitrin İçerikleri
            </h2>
          </div>
          {[1, 2, 3].some(num => homeContent[`vitrin${num}`]) ? (
            <div className="space-y-4">
              {[1, 2, 3].map((num) => {
                const vitrin = homeContent[`vitrin${num}`]
                if (!vitrin) return null
                const content = getContentInfo(vitrin.id, vitrin.type)
                if (!content) return null
                
                return (
                  <div
                    key={num}
                    className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 flex gap-6 shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-40 h-32 object-cover rounded-xl flex-shrink-0 border border-blue-500/30"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">
                          Vitrin {num}: {content.title}
                        </h3>
                      </div>
                      {content.intro && (
                        <p className="text-sm text-blue-300/80 mb-4 line-clamp-2">
                          {content.intro}
                        </p>
                      )}
                      <div className="flex gap-3 mt-4">
                        {!isEditor && (
                        <button
                          onClick={() => handleRemoveFromVitrin(`vitrin${num}`)}
                          className="px-6 py-3 bg-red-600/80 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                        >
                          Kaldır
                        </button>
                        )}
                        <a
                          href={`${TYPE_PATHS[vitrin.type]}/${content.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-blue-300 rounded-xl font-semibold transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50"
                        >
                          Görüntüle
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-12 text-center shadow-2xl">
              <p className="text-blue-300/80 text-lg">
                Henüz vitrin içeriği eklenmemiş.
              </p>
            </div>
          )}
        </div>

        {/* Son İçerikler */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">
                Son İçerikler
              </h2>
            </div>
            {homeContent.sonIcerikler && homeContent.sonIcerikler.length > 0 && !isEditor && (
              <button
                onClick={handleRemoveAllSonIcerikler}
                className="px-6 py-3 bg-red-600/80 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
              >
                Tümünü Kaldır
              </button>
            )}
          </div>
          {!homeContent.sonIcerikler || homeContent.sonIcerikler.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-12 text-center shadow-2xl">
              <p className="text-blue-300/80 text-lg">
                Henüz son içerik eklenmemiş.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {homeContent.sonIcerikler.map((item, index) => {
                const content = getContentInfo(item.id, item.type)
                if (!content) return null
                
                return (
                  <div
                    key={`${item.type}-${item.id}-${index}`}
                    className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 flex gap-6 shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-40 h-32 object-cover rounded-xl flex-shrink-0 border border-blue-500/30"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {content.title}
                      </h3>
                      {content.intro && (
                        <p className="text-sm text-blue-300/80 mb-4 line-clamp-2">
                          {content.intro}
                        </p>
                      )}
                      <div className="flex gap-3 mt-4">
                        {!isEditor && (
                        <button
                          onClick={() => handleRemoveFromSonIcerikler(index)}
                          className="px-6 py-3 bg-red-600/80 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                        >
                          Kaldır
                        </button>
                        )}
                        <a
                          href={`${TYPE_PATHS[item.type]}/${content.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-blue-300 rounded-xl font-semibold transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50"
                        >
                          Görüntüle
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

