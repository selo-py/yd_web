import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getContentBySlug } from '../utils/dataManager.js'
import InstagramEmbed from '../components/InstagramEmbed.jsx'
import SEO from '../components/SEO.jsx'

export default function VideoDetail() {
  const { slug } = useParams()
  const [video, setVideo] = useState(null)

  useEffect(() => {
    // Hem stored hem static verilerden ara
    setVideo(null) // Loading state
    const loadVideo = async () => {
      const foundVideo = await getContentBySlug('videos', slug)
      setVideo(foundVideo || null)
    }
    loadVideo()
  }, [slug])

  if (video === null) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="text-zinc-600 dark:text-zinc-400">Yükleniyor...</div>
      </main>
    )
  }

  if (!video) {
    return (
      <>
        <SEO title="Video Bulunamadı" description="Aradığınız video bulunamadı." />
        <main className="mx-auto max-w-3xl px-4 py-10">
          <p className="text-zinc-700 dark:text-zinc-200">Video bulunamadı.</p>
          <Link to="/video" className="text-brand hover:opacity-80">Videolara dön</Link>
        </main>
      </>
    )
  }

  return (
    <>
      <SEO
        title={video.title}
        description={video.intro || video.content}
        keywords={`${video.title}, instagram reels, video, girişimcilik, teknoloji`}
        image={video.cover}
        url={`/video/${slug}`}
        type="article"
        article={{
          publishedTime: new Date().toISOString(),
          author: 'YD İnovasyon',
          section: 'Videolar',
          tags: ['Instagram Reels', 'Girişimcilik', 'Teknoloji'],
        }}
      />
      <main className="mx-auto max-w-3xl px-4 pb-16">
        <article>
          <header className="py-6">
            <h1 className="mb-2 text-2xl sm:text-3xl font-bold !leading-tight text-zinc-900 dark:text-zinc-100">{video.title}</h1>
            <p className="m-0 text-zinc-600 dark:text-zinc-300 break-words whitespace-pre-wrap">{video.intro}</p>
          </header>

        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 aspect-[2/3]">
          <img src={video.cover} alt={video.title} className="w-full h-full object-cover" />
        </div>

        <section className="mt-6 text-zinc-700 dark:text-zinc-200 leading-relaxed break-words">
          <p className="m-0 break-words whitespace-pre-wrap">{video.content}</p>
        </section>

        <section className="mt-8">
          <div className="flex justify-center">
            {video.instagramPermalink ? (
              <div className="w-full sm:w-[85%] md:w-[70%] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 sm:p-4">
                <InstagramEmbed permalink={video.instagramPermalink} />
              </div>
            ) : video.instagramEmbedUrl ? (
              <div className="w-full sm:w-[85%] md:w-[70%] aspect-[9/16] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                <iframe
                  src={video.instagramEmbedUrl}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              <div className="w-full sm:w-[85%] md:w-[70%] p-4 text-center text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                Instagram içeriği bulunamadı
              </div>
            )}
          </div>
        </section>

        {video.extra && video.extra.trim() !== '' && (
        <section className="mt-8">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
              <h2 className="m-0 text-base font-semibold text-brand dark:text-zinc-100">Etiketler</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{video.extra}</p>
          </div>
        </section>
        )}
      </article>

      <div className="mt-8">
        <Link to="/video" className="text-brand dark:text-blue-400 hover:opacity-80 font-medium">← Reels Videolarına dön</Link>
      </div>
      </main>
    </>
  )
}


