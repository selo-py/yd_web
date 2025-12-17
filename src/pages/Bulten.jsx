import { useState } from 'react'
import SEO from '../components/SEO.jsx'
import { addNewsletterSubscriber } from '../utils/dataManager.js'
import { isValidEmail, sanitizeText } from '../utils/inputValidation.js'

export default function Bulten() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // Email validation
    if (!email.trim()) {
      setMessage('Lütfen e-posta adresinizi giriniz.')
      setIsLoading(false)
      return
    }

    if (!isValidEmail(email.trim())) {
      setMessage('Geçerli bir e-posta adresi giriniz.')
      setIsLoading(false)
      return
    }

    // Sanitize email
    const sanitizedEmail = sanitizeText(email.trim())

    // Abone ol
    const result = await addNewsletterSubscriber(sanitizedEmail)
    setMessage(result.message)
    
    if (result.success) {
      setEmail('')
    }
    
    setIsLoading(false)
  }

  return (
    <main>
      <SEO
        title="Bülten - YD İnovasyon"
        description="YD İnovasyon mail bültenine abone olun. Yeni içeriklerimizden anında haberdar olun."
      />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 text-center">Mail Bülteni</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300 text-center">
          Yeni içeriklerimizden anında haberdar olmak için mail bültenimize abone olun.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  E-posta Adresiniz
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  message.includes('Başarıyla') 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                }`}>
                  {message}
                </div>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-brand text-white rounded-md hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Kaydediliyor...' : 'Abone Ol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

