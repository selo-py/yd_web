import { useState, useMemo, useEffect } from 'react'

export default function SearchBar({ allItems, onSearchResults, onSearchChange, placeholder = 'Ara...' }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return allItems
    }

    const query = searchQuery.toLowerCase().trim()
    
    return allItems.filter(item => {
      // Başlıkta arama
      const titleMatch = item.title?.toLowerCase().includes(query)
      
      // Extra/Related alanında arama
      let extraMatch = false
      if (item.extra) {
        // "Related:", "Konu:", "Etiketler:" gibi prefix'leri kaldır ve arama yap
        const extraText = item.extra
          .replace(/^(Related|Konu|Etiketler):\s*/i, '')
          .toLowerCase()
        extraMatch = extraText.includes(query)
      }
      
      return titleMatch || extraMatch
    })
  }, [searchQuery, allItems])

  // Arama sonuçlarını parent'a bildir
  useEffect(() => {
    if (onSearchResults) {
      onSearchResults(filteredItems)
    }
    // Arama aktif mi bilgisini gönder
    if (onSearchChange) {
      onSearchChange(searchQuery.trim().length > 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems, searchQuery])

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-zinc-400 dark:text-zinc-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
            aria-label="Aramayı temizle"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {searchQuery && (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {filteredItems.length} sonuç bulundu
        </p>
      )}
    </div>
  )
}

