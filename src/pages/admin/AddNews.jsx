import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addContent } from '../../utils/dataManager.js'

export default function AddNews() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    intro: '',
    thumbnail: '',
    cover: '',
    content: '',
    extra: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const success = await addContent('news', formData)
    if (success) {
      alert('İçerik başarıyla eklendi!')
      navigate('/admin/dashboard')
    } else {
      alert('İçerik eklenirken bir hata oluştu!')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-blue-300 rounded-xl font-medium transition-all duration-200 mb-4 border border-blue-500/30 hover:border-blue-400/50"
          >
            ← Geri Dön
          </button>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Yeni Dünya Haber İçeriği Ekle
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 shadow-2xl">
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Başlık *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="İçerik başlığını girin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Kısa Açıklama (Intro) *
            </label>
            <textarea
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="Kısa açıklama girin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Thumbnail Görsel URL *
            </label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Kapak Görsel URL *
            </label>
            <input
              type="url"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              İçerik Metni *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="İçerik metnini girin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Ekstra Bilgi
            </label>
            <input
              type="text"
              name="extra"
              value={formData.extra}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="Örn: Etiketler: Regülasyon, Yapay Zeka, Politika"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
            >
              İçeriği Yayınla
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-blue-300 rounded-xl font-semibold transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

