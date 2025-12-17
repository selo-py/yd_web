import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllContentByType, getContentByType, deleteContent } from '../../utils/dataManager.js'
import { isAdminAuthenticated, getAdminUser, isEditor as checkIsEditor, isAdmin as checkIsAdmin } from '../../utils/authManagerSupabase.js'

const TYPE_LABELS = {
  videos: 'Reels Videoları',
  youtubeVideos: 'YouTube Videoları',
  failures: 'Başarı(sızlık) Hikayeleri',
  news: 'Yeni Dünya Haber',
  finans: 'Finans İçerikleri',
}

const TYPE_PATHS = {
  videos: '/video',
  youtubeVideos: '/youtube',
  failures: '/basarisizlik-hikayeleri',
  news: '/yeni-dunya-haber',
  finans: '/finans',
}

// Route type'larını dataManager type'larına çevir
const TYPE_MAPPING = {
  video: 'videos',
  youtube: 'youtubeVideos',
  failure: 'failures',
  news: 'news',
  finans: 'finans',
}

export default function ContentList() {
  const { type } = useParams()
  const navigate = useNavigate()
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditor, setIsEditor] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAdminAuthenticated()
      if (!authenticated) {
      navigate('/admin')
      return
    }

    // Kullanıcı rolünü kontrol et
      setIsEditor(await checkIsEditor())

    // Route type'ını dataManager type'ına çevir
    const dataType = TYPE_MAPPING[type] || type
    
    // Hem stored hem static verileri al (zaten tarihe göre sıralı - en yeni en üstte)
    const loadContents = async () => {
      const allData = await getAllContentByType(dataType)
      setContents(allData)
      setLoading(false)
    }
    loadContents()
    }
    
    checkAuth()
  }, [type, navigate])

  const handleDelete = async (id) => {
    const dataType = TYPE_MAPPING[type] || type

    // Editor'lar silme yapamaz
    const editorCheck = await checkIsEditor()
    if (editorCheck) {
      alert('Sadece admin kullanıcılar içerik silebilir!')
      return
    }

    if (window.confirm('Bu içeriği silmek istediğinize emin misiniz?')) {
      const success = await deleteContent(dataType, id)
      if (success) {
        setContents(contents.filter(item => item.id !== id))
        alert('İçerik başarıyla silindi!')
      } else {
        alert('İçerik silinirken bir hata oluştu!')
      }
    }
  }

  const handleEdit = (id) => {
    navigate(`/admin/${type}/edit/${id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-blue-300 text-lg">Yükleniyor...</div>
      </div>
    )
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
            {TYPE_LABELS[TYPE_MAPPING[type] || type] || 'İçerikler'}
          </h1>
        </div>

        {contents.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-12 text-center shadow-2xl">
            <p className="text-blue-300/80 text-lg mb-6">
              Henüz içerik eklenmemiş.
            </p>
            <button
              onClick={() => navigate(`/admin/${type}/add`)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
            >
              Yeni İçerik Ekle
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {contents.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 flex gap-6 shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-40 h-32 object-cover rounded-xl flex-shrink-0 border border-blue-500/30"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    {item.intro && (
                      <p className="text-sm text-blue-300/80 mb-4 line-clamp-2">
                        {item.intro}
                      </p>
                    )}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
                      >
                        Düzenle
                      </button>
                      {!isEditor && (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-6 py-3 bg-red-600/80 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                        >
                          Sil
                        </button>
                      )}
                      <a
                        href={`${TYPE_PATHS[TYPE_MAPPING[type] || type]}/${item.slug}`}
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
  )
}

