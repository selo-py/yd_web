import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllContentByType, getHomeContent, setHomeVitrin, addToSonIcerikler } from '../../utils/dataManager.js'
import { isAdminAuthenticated } from '../../utils/authManagerSupabase.js'

const CONTENT_TYPES = [
  { key: 'videos', label: 'Reels Videoları', path: '/video' },
  { key: 'youtubeVideos', label: 'YouTube Videoları', path: '/youtube' },
  { key: 'failures', label: 'Başarı(sızlık) Hikayeleri', path: '/basarisizlik-hikayeleri' },
  { key: 'news', label: 'Yeni Dünya Haber', path: '/yeni-dunya-haber' },
  { key: 'finans', label: 'Finans İçerikleri', path: '/finans' },
]

const VITRIN_POSITIONS = [
  { key: 'vitrin1', label: 'Vitrin 1 (Sol Büyük)' },
  { key: 'vitrin2', label: 'Vitrin 2 (Sağ Üst)' },
  { key: 'vitrin3', label: 'Vitrin 3 (Sağ Alt)' },
  { key: 'sonIcerikler', label: 'Son İçerikler' },
]

export default function HomeContentManager() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('videos')
  const [contents, setContents] = useState([])
  const [homeContent, setHomeContentState] = useState({
    vitrin1: null,
    vitrin2: null,
    vitrin3: null,
    sonIcerikler: []
  })
  const [selectedContent, setSelectedContent] = useState(null)
  const [selectedPosition, setSelectedPosition] = useState('vitrin1')
  const [contentCache, setContentCache] = useState({})

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAdminAuthenticated()
      if (!authenticated) {
      navigate('/admin')
      return
    }

    loadContents()
    loadHomeContent()
    }
    
    checkAuth()
  }, [selectedType, navigate])

  const loadContents = async () => {
    const data = await getAllContentByType(selectedType)
    setContents(data)
  }

  const loadHomeContent = async () => {
    const content = await getHomeContent()
    // Eğer content null veya array ise, default değer kullan
    if (!content || Array.isArray(content)) {
      setHomeContentState({
        vitrin1: null,
        vitrin2: null,
        vitrin3: null,
        sonIcerikler: []
      })
    } else {
      setHomeContentState(content)
    }
  }

  const handleAssign = async () => {
    if (!selectedContent) {
      alert('Lütfen bir içerik seçin!')
      return
    }

    if (selectedPosition === 'sonIcerikler') {
      const result = await addToSonIcerikler(selectedContent.id, selectedType)
      if (result) {
        alert('İçerik "Son İçerikler" bölümüne eklendi!')
        await loadHomeContent()
        setSelectedContent(null)
      } else {
        alert('İçerik eklenirken bir hata oluştu!')
      }
    } else {
      const result = await setHomeVitrin(selectedPosition, selectedContent.id, selectedType)
      if (result) {
        alert(`İçerik "${VITRIN_POSITIONS.find(p => p.key === selectedPosition)?.label}" konumuna yerleştirildi!`)
        await loadHomeContent()
        setSelectedContent(null)
      } else {
        alert('İçerik yerleştirilirken bir hata oluştu!')
      }
    }
  }

  useEffect(() => {
    // Home content değiştiğinde içerikleri yükle
    const loadContentInfo = async () => {
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
      loadContentInfo()
    }
  }, [homeContent])

  const getContentInfo = (id, type) => {
    const cacheKey = `${type}-${id}`
    return contentCache[cacheKey] || null
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
            Ana Sayfa İçerik Yönetimi
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol: İçerik Seçimi */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">
                İçerik Seç
              </h2>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-blue-300 mb-2">
                İçerik Tipi
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              >
                {CONTENT_TYPES.map(type => (
                  <option key={type.key} value={type.key}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Konum Seç
              </label>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              >
                {VITRIN_POSITIONS.map(pos => (
                  <option key={pos.key} value={pos.key}>{pos.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto mb-5">
              {contents.length === 0 ? (
                <p className="text-blue-300/60 text-sm">
                  Bu kategoride henüz içerik yok.
                </p>
              ) : (
                contents.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedContent(item)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedContent?.id === item.id
                        ? 'border-blue-400 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 shadow-lg shadow-blue-500/20'
                        : 'border-blue-500/30 bg-slate-700/30 hover:border-blue-400/50 hover:bg-slate-700/50'
                    }`}
                  >
                    <h3 className="font-semibold text-white text-sm">
                      {item.title}
                    </h3>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={handleAssign}
              disabled={!selectedContent}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {selectedPosition === 'sonIcerikler' ? 'Son İçeriklere Ekle' : 'Konuma Yerleştir'}
            </button>
          </div>

          {/* Sağ: Mevcut Durum */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">
                Mevcut Durum
              </h2>
            </div>

            <div className="space-y-4">
              {VITRIN_POSITIONS.map(pos => {
                let content = []
                if (pos.key === 'sonIcerikler') {
                  content = Array.isArray(homeContent.sonIcerikler) ? homeContent.sonIcerikler : []
                } else {
                  const vitrinItem = homeContent[pos.key]
                  if (vitrinItem && vitrinItem.id && vitrinItem.type) {
                    content = [vitrinItem]
                  }
                }

                return (
                  <div key={pos.key} className="border border-blue-500/30 rounded-xl p-4 bg-slate-700/30">
                    <div className="mb-3">
                      <h3 className="font-semibold text-white">
                        {pos.label}
                      </h3>
                    </div>
                    {content.length === 0 ? (
                      <p className="text-sm text-blue-300/50">Boş</p>
                    ) : (
                      <div className="space-y-2">
                        {content.map((item, idx) => {
                          if (!item || !item.id || !item.type) return null
                          const info = getContentInfo(item.id, item.type)
                          if (!info) return null
                          return (
                            <div key={idx} className="flex gap-3 items-center text-sm bg-slate-800/50 p-3 rounded-lg border border-blue-500/20">
                              <img
                                src={info.thumbnail}
                                alt={info.title}
                                className="w-16 h-12 object-cover rounded-lg border border-blue-500/30"
                              />
                              <span className="text-blue-300 flex-1 truncate font-medium">
                                {info.title}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

