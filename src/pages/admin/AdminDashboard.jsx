import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isAdminAuthenticated, logoutAdmin, getAdminUser, isEditor as checkIsEditor } from '../../utils/authManagerSupabase.js'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isEditor, setIsEditor] = useState(false)

  useEffect(() => {
    // Auth kontrolü
    const checkAuth = async () => {
      const authenticated = await isAdminAuthenticated()
      if (!authenticated) {
      navigate('/admin')
        return
      }
      
      const userData = await getAdminUser()
      setUser(userData)
      setIsEditor(await checkIsEditor())
    }
    
    checkAuth()
  }, [navigate])

  const handleLogout = async () => {
    await logoutAdmin()
    navigate('/admin')
  }

  const username = user?.username || user?.email?.split('@')[0] || ''
  const role = user?.role || 'admin'

  const menuItems = [
    { 
      title: 'Ana Sayfa İçeriği Ekle', 
      path: '/admin/home-content',
      description: 'Ana sayfa vitrin ve son içerikler yönetimi'
    },
    { 
      title: 'Reels Videosu İçeriği Ekle', 
      path: '/admin/video/add',
      type: 'video'
    },
    { 
      title: 'Youtube Videosu İçeriği Ekle', 
      path: '/admin/youtube/add',
      type: 'youtube'
    },
    { 
      title: 'Başarı(sızlık) Hikayeleri İçeriği Ekle', 
      path: '/admin/failure/add',
      type: 'failure'
    },
    { 
      title: 'Yeni Dünya Haber İçeriği Ekle', 
      path: '/admin/news/add',
      type: 'news'
    },
    { 
      title: 'Finans İçeriği Ekle', 
      path: '/admin/finans/add',
      type: 'finans'
    },
  ]

  const contentListItems = [
    { 
      title: 'Ana Sayfa İçeriklerini Görüntüle' + (isEditor ? '' : '/Sil'), 
      path: '/admin/home-content-view',
      description: isEditor ? 'Ana sayfada görüntülenen içerikleri görüntüle' : 'Ana sayfada görüntülenen içerikleri görüntüle ve sil'
    },
    { title: 'Reels Videoları', path: '/admin/video/list', type: 'video' },
    { title: 'Youtube Videoları', path: '/admin/youtube/list', type: 'youtube' },
    { title: 'Başarı(sızlık) Hikayeleri', path: '/admin/failure/list', type: 'failure' },
    { title: 'Yeni Dünya Haber', path: '/admin/news/list', type: 'news' },
    { title: 'Finans İçerikleri', path: '/admin/finans/list', type: 'finans' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Admin Paneli
            </h1>
            <p className="text-blue-300 text-sm">
              İçerik yönetim sistemi
              {username && (
                <span className="ml-2 text-blue-400">
                  • {username} ({isEditor ? 'Editör' : 'Yönetici'})
                </span>
              )}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol: Yeni İçerik Ekle */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">
                Yeni İçerik Ekle
              </h2>
            </div>
            <div className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full text-left px-6 py-4 bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-blue-500/20 rounded-xl hover:border-blue-400/50 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/20 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="font-semibold text-white text-base">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-sm text-blue-300/80 mt-1.5">
                      {item.description}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sağ: İçerikleri Yönet */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">
                İçerikleri Yönet
              </h2>
            </div>
            <div className="space-y-3">
              {contentListItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full text-left px-6 py-4 bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-blue-500/20 rounded-xl hover:border-blue-400/50 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/20 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="font-semibold text-white text-base">
                    {item.title}
                  </div>
                  <div className="text-sm text-blue-300/80 mt-1.5">
                    {item.description || (isEditor ? 'Düzenle, Görüntüle' : 'Düzenle, Sil, Görüntüle')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

