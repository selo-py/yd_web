import SEO from '../components/SEO.jsx'

export default function Iletisim() {
  return (
    <main>
      <SEO
        title="İletişim - YD İnovasyon"
        description="YD İnovasyon ile iletişime geçin. Sosyal hesaplarımız ve e-posta bilgilerimiz."
      />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">İletişim</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          Bu sayfa iletişim bilgileri için yer tutucudur. Gerçek içerik daha sonra eklenecektir.
        </p>
        <div className="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-3">
          <div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">E-posta</span>
            <div className="text-zinc-800 dark:text-zinc-100">Proje, iş birliği ve sorularınız için bize mail atabilirsiniz: 
              <p>info@ydinovasyon.com</p>ydmarka@gmail.com</div>
          </div>
          <div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Sosyal Medya</span>
            <div className="flex flex-col gap-2 text-zinc-700 dark:text-zinc-200">
              <a href="https://www.instagram.com/ydinovasyon/" target="_blank" rel="noreferrer" className="hover:text-[#E1306C]">Instagram</a>
              <a href="https://www.youtube.com/@ydinovasyon/videos" target="_blank" rel="noreferrer" className="hover:text-[#FF0000]">YouTube</a>
              <a href="https://www.tiktok.com/@ydinovasyon" target="_blank" rel="noreferrer" className="hover:text-[#5B21B6]">TikTok</a>
              <a href="https://www.linkedin.com/company/ydinovasyon" target="_blank" rel="noreferrer" className="hover:text-[#0A66C2]">LinkedIn</a>
              <a href="https://www.facebook.com/p/YD%C4%B0novasyon-100090055811651/" target="_blank" rel="noreferrer" className="hover:text-[#0B3D91]">Facebook</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


