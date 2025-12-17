import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getContentBySlug } from '../utils/dataManager.js'
import SEO from '../components/SEO.jsx'

export default function FinansDetail() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    // Hem stored hem static verilerden ara
    setItem(null) // Loading state
    const loadItem = async () => {
      const foundItem = await getContentBySlug('finans', slug)
      setItem(foundItem || null)
    }
    loadItem()
  }, [slug])

  if (item === null) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="text-zinc-600 dark:text-zinc-400">Yükleniyor...</div>
      </main>
    )
  }

  if (!item) {
    return (
      <>
        <SEO title="İçerik Bulunamadı" description="Aradığınız içerik bulunamadı." />
        <main className="mx-auto max-w-3xl px-4 py-10">
          <p className="text-zinc-700 dark:text-zinc-200">İçerik bulunamadı.</p>
          <Link to="/finans" className="text-brand hover:opacity-80">Listeye dön</Link>
        </main>
      </>
    )
  }

  return (
    <>
      <SEO
        title={item.title}
        description={item.intro || item.content}
        keywords={`${item.title}, finans, finansman, makro ekonomi`}
        image={item.cover}
        url={`/finans/${slug}`}
        type="article"
        article={{
          publishedTime: new Date().toISOString(),
          author: 'YD İnovasyon',
          section: 'Finans',
          tags: ['Finans', 'Finansman', 'Makro Ekonomi'],
        }}
      />
      <main className="mx-auto max-w-3xl px-4 pb-16">
        <article>
          <header className="py-6">
            <h1 className="mb-2 text-2xl sm:text-3xl font-bold !leading-tight text-zinc-900 dark:text-zinc-100">{item.title}</h1>
          <p className="m-0 text-zinc-600 dark:text-zinc-300 break-words whitespace-pre-wrap">{item.intro}</p>
        </header>

        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
          <img src={item.cover} alt={item.title} className="w-full h-auto object-cover" />
        </div>

        <section className="mt-6 text-zinc-700 dark:text-zinc-200 leading-relaxed break-words">
          <p className="m-0 break-words whitespace-pre-wrap">{item.content}</p>
        </section>

        {item.extra && item.extra.trim() !== '' && (
        <section className="mt-8">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
              <h2 className="m-0 text-base font-semibold text-brand dark:text-zinc-100">Etiketler</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{item.extra}</p>
          </div>
        </section>
        )}
      </article>

      <div className="mt-8">
        <Link to="/finans" className="text-brand dark:text-blue-400 hover:opacity-80 font-medium">← Listeye dön</Link>
      </div>
      </main>
    </>
  )
}


