import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  article = null,
}) {
  const siteUrl = 'https://ydinovasyon.com'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`
  const fullTitle = title ? `${title} | YD İnovasyon` : 'YD İnovasyon - Girişimcilik, Teknoloji ve İnovasyon'
  const fullDescription = description || 'Girişimcilik, Yapay Zeka, Finans, Teknoloji ve Yeni Dünya Düzeninden haberdar olmak için bizi takip edebilirsin.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="YD İnovasyon" />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Article specific */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          name: 'YD İnovasyon',
          url: siteUrl,
          description: fullDescription,
          ...(type === 'article' && article ? {
            headline: title,
            image: imageUrl,
            datePublished: article.publishedTime,
            dateModified: article.modifiedTime || article.publishedTime,
            author: {
              '@type': 'Organization',
              name: article.author || 'YD İnovasyon',
            },
            publisher: {
              '@type': 'Organization',
              name: 'YD İnovasyon',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
              },
            },
          } : {
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteUrl}/search?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        })}
      </script>
    </Helmet>
  )
}

