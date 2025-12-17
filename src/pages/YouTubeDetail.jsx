import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getContentBySlug } from '../utils/dataManager.js'
import SEO from '../components/SEO.jsx'

export default function YouTubeDetail() {
  const { slug } = useParams()
  const [video, setVideo] = useState(null)

  useEffect(() => {
    // Hem stored hem static verilerden ara
    setVideo(null) // Loading state
    const loadVideo = async () => {
      const foundVideo = await getContentBySlug('youtubeVideos', slug)
      setVideo(foundVideo || null)
    }
    loadVideo()
  }, [slug])

  if (video === null) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="text-zinc-600 dark:text-zinc-400">Yükleniyor...</div>
      </main>
    )
  }

  if (!video) {
    return (
      <>
        <SEO title="Video Bulunamadı" description="Aradığınız video bulunamadı." />
        <main className="mx-auto max-w-4xl px-4 py-10">
          <p className="text-zinc-700 dark:text-zinc-200">Video bulunamadı.</p>
          <Link to="/youtube" className="text-brand hover:opacity-80">YouTube videolarına dön</Link>
        </main>
      </>
    )
  }

  return (
    <>
      <SEO
        title={video.title}
        description={video.intro || video.content}
        keywords={`${video.title}, youtube, video, girişimcilik, teknoloji`}
        image={video.cover}
        url={`/youtube/${slug}`}
        type="article"
        article={{
          publishedTime: new Date().toISOString(),
          author: 'YD İnovasyon',
          section: 'YouTube Videoları',
          tags: ['YouTube', 'Girişimcilik', 'Teknoloji'],
        }}
      />
      <main className="mx-auto max-w-4xl px-4 pb-16">
        <article>
          <header className="py-6">
            <h1 className="mb-2 text-3xl sm:text-4xl font-bold !leading-tight text-zinc-900 dark:text-zinc-100">{video.title}</h1>
            <p className="m-0 text-lg text-zinc-600 dark:text-zinc-300 break-words whitespace-pre-wrap">{video.intro}</p>
          </header>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
          <img src={video.cover} alt={video.title} className="w-full h-auto object-cover" />
        </div>

        <section className="mt-6 text-zinc-700 dark:text-zinc-200 leading-relaxed break-words">
          <p className="m-0 break-words whitespace-pre-wrap">{video.content}</p>
        </section>

        <section className="mt-8">
          <div className="w-full aspect-video overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
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
        <Link to="/youtube" className="text-brand dark:text-blue-400 hover:opacity-80 font-medium">← YouTube videolarına dön</Link>
      </div>
      </main>
    </>
  )
}


