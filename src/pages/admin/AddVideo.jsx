import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addContent } from '../../utils/dataManager.js'
import { validateFormData, sanitizeFormData, isValidUrl, isValidInstagramUrl } from '../../utils/inputValidation.js'

export default function AddVideo() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    intro: '',
    thumbnail: '',
    cover: '',
    content: '',
    instagramPermalink: '',
    instagramEmbedUrl: '',
    extra: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    
    // Form validation
    const validation = validateFormData(formData, {
      title: { required: true, minLength: 3, maxLength: 200, label: 'Başlık' },
      intro: { required: true, minLength: 10, maxLength: 500, label: 'Kısa Açıklama' },
      thumbnail: { required: true, isUrl: true, label: 'Thumbnail URL' },
      cover: { required: true, isUrl: true, label: 'Kapak Görsel URL' },
      content: { required: true, minLength: 20, label: 'İçerik Metni' },
      instagramPermalink: { 
        isInstagramUrl: true, 
        label: 'Instagram Permalink',
        validator: (val) => !val || isValidInstagramUrl(val),
        errorMessage: 'Geçerli bir Instagram URL\'i giriniz'
      },
      instagramEmbedUrl: { 
        isUrl: true, 
        label: 'Instagram Embed URL',
        validator: (val) => !val || isValidUrl(val),
        errorMessage: 'Geçerli bir URL giriniz'
      },
    })
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      setLoading(false)
      return
    }
    
    // Sanitize form data
    const sanitizedData = sanitizeFormData(formData)
    
    const videoData = {
      ...sanitizedData,
      // Instagram permalink veya embed URL'den birini kullan
      instagramPermalink: sanitizedData.instagramPermalink || undefined,
      instagramEmbedUrl: sanitizedData.instagramEmbedUrl || undefined,
    }

    const success = await addContent('videos', videoData)
    if (success) {
      alert('İçerik başarıyla eklendi!')
      navigate('/admin/dashboard')
    } else {
      alert('İçerik eklenirken bir hata oluştu!')
    }
    setLoading(false)
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
            Reels Videosu İçeriği Ekle
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
              maxLength={500}
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 transition-all ${
                errors.intro ? 'border-red-500 focus:ring-red-400 focus:border-red-400' : 'border-blue-500/30 focus:ring-blue-400 focus:border-blue-400'
              }`}
              placeholder="Kısa açıklama girin"
            />
            {errors.intro && (
              <p className="mt-1 text-sm text-red-400">{errors.intro}</p>
            )}
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
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 transition-all ${
                errors.thumbnail ? 'border-red-500 focus:ring-red-400 focus:border-red-400' : 'border-blue-500/30 focus:ring-blue-400 focus:border-blue-400'
              }`}
              placeholder="https://..."
            />
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-400">{errors.thumbnail}</p>
            )}
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
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 transition-all ${
                errors.cover ? 'border-red-500 focus:ring-red-400 focus:border-red-400' : 'border-blue-500/30 focus:ring-blue-400 focus:border-blue-400'
              }`}
              placeholder="https://..."
            />
            {errors.cover && (
              <p className="mt-1 text-sm text-red-400">{errors.cover}</p>
            )}
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
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 transition-all ${
                errors.content ? 'border-red-500 focus:ring-red-400 focus:border-red-400' : 'border-blue-500/30 focus:ring-blue-400 focus:border-blue-400'
              }`}
              placeholder="İçerik metnini girin"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-400">{errors.content}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Instagram Reel Permalink
            </label>
            <input
              type="url"
              name="instagramPermalink"
              value={formData.instagramPermalink}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 transition-all ${
                errors.instagramPermalink ? 'border-red-500 focus:ring-red-400 focus:border-red-400' : 'border-blue-500/30 focus:ring-blue-400 focus:border-blue-400'
              }`}
              placeholder="https://www.instagram.com/reel/..."
            />
            {errors.instagramPermalink && (
              <p className="mt-1 text-sm text-red-400">{errors.instagramPermalink}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Instagram Embed URL (Alternatif)
            </label>
            <input
              type="url"
              name="instagramEmbedUrl"
              value={formData.instagramEmbedUrl}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 transition-all ${
                errors.instagramEmbedUrl ? 'border-red-500 focus:ring-red-400 focus:border-red-400' : 'border-blue-500/30 focus:ring-blue-400 focus:border-blue-400'
              }`}
              placeholder="https://www.instagram.com/p/.../embed"
            />
            {errors.instagramEmbedUrl && (
              <p className="mt-1 text-sm text-red-400">{errors.instagramEmbedUrl}</p>
            )}
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
              placeholder="Örn: Related: Robotics, Retail Tech"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Yayınlanıyor...' : 'İçeriği Yayınla'}
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

