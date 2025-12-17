import { NavLink } from 'react-router-dom'
import logo from '../../ydlogo.png'

function SocialIcon({ href, label, children, hoverClass = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`p-2 rounded-full transition-colors text-brand hover:bg-zinc-100 dark:bg-black dark:text-white dark:hover:bg-white ${hoverClass}`}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-6">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <img src={logo} alt="YD İnovasyon logosu" className="h-[100px] w-[100px] sm:h-[125px] sm:w-[125px] object-contain" />
          </div>

          <nav className="flex items-center justify-center flex-wrap gap-4 sm:gap-6">
            <NavLink
              to="/hakkimizda"
              className="text-sm text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Hakkımızda
            </NavLink>
            <NavLink
              to="/iletisim"
              className="text-sm text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              İletişim
            </NavLink>
            <NavLink
              to="/bulten"
              className="text-sm text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Bülten
            </NavLink>
            <NavLink
              to="/gizlilik-politikasi"
              className="text-sm text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Gizlilik Politikası
            </NavLink>
          </nav>

          <div className="flex items-center justify-center md:justify-end gap-1">
            <SocialIcon
              href="https://www.instagram.com/ydinovasyon/"
              label="Instagram"
              hoverClass="hover:text-[#E1306C] dark:hover:text-[#E1306C]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5m0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm11 2a1 1 0 110 2 1 1 0 010-2M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6"/></svg>
            </SocialIcon>
            <SocialIcon
              href="https://www.youtube.com/@ydinovasyon/videos"
              label="YouTube"
              hoverClass="hover:text-[#FF0000] dark:hover:text-[#FF0000]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M10 15l5.19-3L10 9v6m11.56-6.62c.13.47.21 1.03.26 1.67.07.64.09 1.2.09 1.6l.09.75c0 2.28-.17 3.86-.44 4.74-.25.75-.83 1.33-1.58 1.58-.88.27-2.46.44-4.74.44H9.66c-2.28 0-3.86-.17-4.74-.44-.75-.25-1.33-.83-1.58-1.58-.27-.88-.44-2.46-.44-4.74s.17-3.86.44-4.74c.25-.75.83-1.33 1.58-1.58C6.05 6.17 7.63 6 9.91 6h4.18c2.28 0 3.86.17 4.74.44.75.25 1.33.83 1.58 1.58z"/></svg>
            </SocialIcon>
            <SocialIcon
              href="https://www.tiktok.com/@ydinovasyon"
              label="TikTok"
              hoverClass="hover:text-[#5B21B6] dark:hover:text-[#5B21B6]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16.5 3c.6 1.9 2.1 3.3 4 3.8v3.2c-1.5-.1-3-.6-4.3-1.5v6.8c0 3.6-2.9 6.5-6.5 6.5S3.2 19.9 3.2 16.3c0-3.3 2.4-6 5.6-6.5.4-.1.9-.1 1.3-.1v3.3c-.3-.1-.6-.1-.9-.1-1.7 0-3.1 1.4-3.1 3.2s1.4 3.2 3.1 3.2 3.1-1.4 3.1-3.2V3z"/></svg>
            </SocialIcon>
            <SocialIcon
              href="https://www.linkedin.com/company/ydinovasyon"
              label="LinkedIn"
              hoverClass="hover:text-[#0A66C2] dark:hover:text-[#0A66C2]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2M8.34 17.34H6.16V10.3h2.18zM7.25 9.29a1.26 1.26 0 110-2.51 1.26 1.26 0 010 2.51M18 17.34h-2.16v-3.58c0-.85-.02-1.94-1.18-1.94s-1.36.92-1.36 1.88v3.64H11.16V10.3h2.07v.96h.03a2.27 2.27 0 012.05-1.13c2.19 0 2.6 1.44 2.6 3.31z"/></svg>
            </SocialIcon>
            <SocialIcon
              href="https://www.facebook.com/p/YD%C4%B0novasyon-100090055811651/"
              label="Facebook"
              hoverClass="hover:text-[#0B3D91] dark:hover:text-[#0B3D91]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M22 12a10 10 0 10-11.56 9.88v-6.99H8.1V12h2.34V9.8c0-2.3 1.37-3.57 3.46-3.57.99 0 2.03.18 2.03.18v2.24h-1.14c-1.12 0-1.46.7-1.46 1.42V12h2.49l-.4 2.89h-2.09v6.99A10 10 0 0022 12"/></svg>
            </SocialIcon>
          </div>
        </div>
        <div className="pb-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} YD İnovasyon. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  )
}


