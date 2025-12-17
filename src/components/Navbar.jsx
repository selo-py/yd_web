import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { ThemeToggle } from './ThemeProvider.jsx'
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

export default function Navbar() {
  const [isVideosOpen, setIsVideosOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobileVideosOpen, setIsMobileVideosOpen] = useState(false)
  const location = useLocation()
  const isInVideos = location.pathname.startsWith('/video') || location.pathname.startsWith('/youtube')
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-center h-16 relative">
          <div className="absolute left-4 flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="YD İnovasyon logosu" className="h-[74px] w-[74px] object-contain" />
              <span className="font-semibold text-brand dark:text-zinc-100 text-lg">YD İnovasyon</span>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center justify-center mr-12">
              <div className="relative group">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-default select-none ${
                  isInVideos
                    ? 'text-brand dark:text-white'
                    : 'text-zinc-600 dark:text-zinc-300 group-hover:text-brand dark:group-hover:text-white'
                }`}>
                  Videolar
                </span>
                <div className="absolute left-0 top-full w-52 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                  <NavLink
                    to="/video"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-brand dark:text-white bg-zinc-50 dark:bg-zinc-800'
                          : 'text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white'
                      }`
                    }
                  >
                    Instagram Reels
                  </NavLink>
                  <NavLink
                    to="/youtube"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-brand dark:text-white bg-zinc-50 dark:bg-zinc-800'
                          : 'text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white'
                      }`
                    }
                  >
                    YouTube Video
                  </NavLink>
                </div>
              </div>
              <NavLink
                to="/basarisizlik-hikayeleri"
                className={({ isActive }) =>
                  `ml-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand dark:text-white'
                      : 'text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white'
                  }`
                }
              >
                Başarı(sızlık) Hikayeleri
              </NavLink>
              <NavLink
                to="/yeni-dunya-haber"
                className={({ isActive }) =>
                  `ml-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand dark:text-white'
                      : 'text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white'
                  }`
                }
              >
                Yeni Dünya Haber
              </NavLink>
              <NavLink
                to="/finans"
                className={({ isActive }) =>
                  `ml-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand dark:text-white'
                      : 'text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white'
                  }`
                }
              >
                Finans
              </NavLink>
          </nav>

          {/* Mobile hamburger */}
          <div className="absolute right-4 lg:hidden">
            <button
              type="button"
              aria-label="Menüyü aç"
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen(o => !o)}
              className="p-2 rounded-md text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop social icons */}
          <div className="absolute right-4 hidden lg:flex items-center gap-1">
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
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2M8.34 17.34H6.16V10.3h2.18zM7.25 9.29a1.26 1.26 0 110-2.51 1.26 1.26 0 010 2.51M18 17.34h-2.16v-3.58c0-.85-.02-1.94-1.18-1.94s-1.36.92-1.36 1.88v3.64H11.16V10.3h2.07v.96h.03a2.27 2.27 0 012.05-1.13c2.19 0 2.6 1.44 2.6 3.31z"/>
              </svg>
            </SocialIcon>
            <SocialIcon
              href="https://www.facebook.com/p/YD%C4%B0novasyon-100090055811651/"
              label="Facebook"
              hoverClass="hover:text-[#0B3D91] dark:hover:text-[#0B3D91]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M22 12a10 10 0 10-11.56 9.88v-6.99H8.1V12h2.34V9.8c0-2.3 1.37-3.57 3.46-3.57.99 0 2.03.18 2.03.18v2.24h-1.14c-1.12 0-1.46.7-1.46 1.42V12h2.49l-.4 2.89h-2.09v6.99A10 10 0 0022 12"/>
              </svg>
            </SocialIcon>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
          <div className="px-4 py-3 space-y-1">
            <button
              type="button"
              onClick={() => setIsMobileVideosOpen(o => !o)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <span className="font-medium">Videolar</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isMobileVideosOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
            </button>
            {isMobileVideosOpen && (
              <div className="pl-2 space-y-1">
                <NavLink
                  to="/video"
                  onClick={() => { setIsMobileOpen(false); setIsMobileVideosOpen(false) }}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md ${isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-brand dark:text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`
                  }
                >
                  Instagram Reels
                </NavLink>
                <NavLink
                  to="/youtube"
                  onClick={() => { setIsMobileOpen(false); setIsMobileVideosOpen(false) }}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md ${isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-brand dark:text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`
                  }
                >
                  YouTube Video
                </NavLink>
              </div>
            )}
            <NavLink
              to="/basarisizlik-hikayeleri"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-brand dark:text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`
              }
            >
              Başarısızlık Hikayeleri
            </NavLink>
            <NavLink
              to="/yeni-dunya-haber"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-brand dark:text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`
              }
            >
              Yeni Dünya Haber
            </NavLink>
            <NavLink
              to="/finans"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-brand dark:text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`
              }
            >
              Finans
            </NavLink>
            <div className="pt-2 flex items-center gap-2">
              <a href="https://www.instagram.com/ydinovasyon/" target="_blank" rel="noreferrer" className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-[#E1306C]">
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5m0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm11 2a1 1 0 110 2 1 1 0 010-2M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6"/></svg>
              </a>
              <a href="https://www.youtube.com/@ydinovasyon/videos" target="_blank" rel="noreferrer" className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-[#FF0000]">
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M10 15l5.19-3L10 9v6m11.56-6.62c.13.47.21 1.03.26 1.67.07.64.09 1.2.09 1.6l.09.75c0 2.28-.17 3.86-.44 4.74-.25.75-.83 1.33-1.58 1.58-.88.27-2.46.44-4.74.44H9.66c-2.28 0-3.86-.17-4.74-.44-.75-.25-1.33-.83-1.58-1.58-.27-.88-.44-2.46-.44-4.74s.17-3.86.44-4.74c.25-.75.83-1.33 1.58-1.58C6.05 6.17 7.63 6 9.91 6h4.18c2.28 0 3.86.17 4.74.44.75.25 1.33.83 1.58 1.58z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@ydinovasyon" target="_blank" rel="noreferrer" className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-[#5B21B6]">
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16.5 3c.6 1.9 2.1 3.3 4 3.8v3.2c-1.5-.1-3-.6-4.3-1.5v6.8c0 3.6-2.9 6.5-6.5 6.5S3.2 19.9 3.2 16.3c0-3.3 2.4-6 5.6-6.5.4-.1.9-.1 1.3-.1v3.3c-.3-.1-.6-.1-.9-.1-1.7 0-3.1 1.4-3.1 3.2s1.4 3.2 3.1 3.2 3.1-1.4 3.1-3.2V3z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/ydinovasyon" target="_blank" rel="noreferrer" className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-[#0A66C2]">
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2M8.34 17.34H6.16V10.3h2.18zM7.25 9.29a1.26 1.26 0 110-2.51 1.26 1.26 0 010 2.51M18 17.34h-2.16v-3.58c0-.85-.02-1.94-1.18-1.94s-1.36.92-1.36 1.88v3.64H11.16V10.3h2.07v.96h.03a2.27 2.27 0 012.05-1.13c2.19 0 2.6 1.44 2.6 3.31z"/></svg>
              </a>
              <a href="https://www.facebook.com/p/YD%C4%B0novasyon-100090055811651/" target="_blank" rel="noreferrer" className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-[#0B3D91]">
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M22 12a10 10 0 10-11.56 9.88v-6.99H8.1V12h2.34V9.8c0-2.3 1.37-3.57 3.46-3.57.99 0 2.03.18 2.03.18v2.24h-1.14c-1.12 0-1.46.7-1.46 1.42V12h2.49l-.4 2.89h-2.09v6.99A10 10 0 0022 12"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


