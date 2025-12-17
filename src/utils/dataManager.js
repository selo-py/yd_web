// Veri yönetimi için utility fonksiyonlar
// Supabase kullanarak veri saklama (localStorage fallback ile)

import { supabase } from '../lib/supabase.js'
// Supabase Auth kullanıyorsanız: authManagerSupabase.js
// Custom Auth kullanıyorsanız: authManager.js
import { isAdminAuthenticated, isAdmin, isEditor } from './authManagerSupabase.js'

// Tablo isimleri mapping
const TABLE_NAMES = {
  videos: 'videos',
  youtubeVideos: 'youtube_videos',
  failures: 'failures',
  news: 'news',
  finans: 'finans',
}

// Supabase'den veri çekerken hata olursa localStorage'a fallback
const USE_SUPABASE = true // Supabase kullanımını açıp kapatmak için

// Slug oluşturma helper
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ID oluşturma helper (UUID için artık gerekli değil ama eski kodlar için tutuyoruz)
export function generateId(prefix = '') {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// ==================== SUPABASE FONKSİYONLARI ====================

// İçerik tipine göre veri getirme (Supabase'den)
export async function getContentByType(type) {
  if (!USE_SUPABASE) {
    return getStoredDataFallback(type)
  }

  const tableName = TABLE_NAMES[type]
  if (!tableName) return []

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(`Error fetching ${type} from Supabase:`, error)
      return getStoredDataFallback(type)
    }

    // Supabase'den gelen veriyi formatla (id -> id, created_at -> createdAt, vb.)
    return data.map(item => formatFromSupabase(item))
  } catch (error) {
    console.error(`Error fetching ${type}:`, error)
    return getStoredDataFallback(type)
  }
}

// Tüm içerikleri getir (sadece Supabase'den) - tarihe göre sıralı
export async function getAllContentByType(type) {
  const stored = await getContentByType(type)

  // Tarihe göre sırala (en yeni en üstte - createdAt büyükten küçüğe)
  return stored.sort((a, b) => {
    const dateA = a.createdAt || (a.created_at ? new Date(a.created_at).getTime() : 0)
    const dateB = b.createdAt || (b.created_at ? new Date(b.created_at).getTime() : 0)
    return dateB - dateA
  })
}

// İçerik ekleme (Supabase'e)
export async function addContent(type, content) {
  // Admin/Editor kontrolü
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    console.error('❌ Unauthorized: Admin authentication required')
    return false
  }

  // Editor ve admin ekleme yapabilir
  const adminCheck = await isAdmin()
  const editorCheck = await isEditor()
  if (!adminCheck && !editorCheck) {
    console.error('❌ Unauthorized: Admin or Editor role required')
    return false
  }

  const tableName = TABLE_NAMES[type]
  if (!tableName) return false

  try {
    // Slug oluştur
    let slug = content.slug || generateSlug(content.title)

    // Slug çakışmasını kontrol et
    const allContent = await getAllContentByType(type)
    let finalSlug = slug
    let counter = 1

    while (allContent.some(item => item.slug === finalSlug)) {
      finalSlug = `${slug}-${counter}`
      counter++
    }

    // Supabase'e gönderilecek veriyi formatla
    const supabaseData = formatToSupabase({
      ...content,
      slug: finalSlug,
      createdAt: content.createdAt || Date.now(),
    })

    console.log(`[DEBUG] Adding ${type} to Supabase:`, { tableName, supabaseData })

    const { data, error } = await supabase
      .from(tableName)
      .insert([supabaseData])
      .select()
      .single()

    if (error) {
      console.error(`❌ Error adding ${type} to Supabase:`, error)
      console.error(`❌ Error details:`, { code: error.code, message: error.message, details: error.details, hint: error.hint })
      // Fallback'e düşme, hata mesajını göster
      return false
    }

    console.log(`✅ Successfully added ${type} to Supabase:`, data)
    return true
  } catch (error) {
    console.error(`Error adding ${type}:`, error)
    return addContentFallback(type, content)
  }
}

// İçerik güncelleme (Supabase'de)
export async function updateContent(type, id, updates) {
  // Admin/Editor kontrolü
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    console.error('❌ Unauthorized: Admin authentication required')
    return false
  }

  // Editor ve admin güncelleme yapabilir
  const adminCheck = await isAdmin()
  const editorCheck = await isEditor()
  if (!adminCheck && !editorCheck) {
    console.error('❌ Unauthorized: Admin or Editor role required')
    return false
  }

  const tableName = TABLE_NAMES[type]
  if (!tableName) return false

  try {
    // UUID kontrolü
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

    if (!isUUID) {
      // Eski ID formatıysa fallback kullan
      return updateContentFallback(type, id, updates)
    }

    const supabaseData = formatToSupabase(updates)

    console.log(`[DEBUG] Updating ${type} in Supabase:`, { tableName, id, supabaseData })

    const { error } = await supabase
      .from(tableName)
      .update(supabaseData)
      .eq('id', id)

    if (error) {
      console.error(`❌ Error updating ${type} in Supabase:`, error)
      console.error(`❌ Error details:`, { code: error.code, message: error.message, details: error.details, hint: error.hint })
      return updateContentFallback(type, id, updates)
    }

    console.log(`✅ Successfully updated ${type} in Supabase`)
    return true
  } catch (error) {
    console.error(`Error updating ${type}:`, error)
    return updateContentFallback(type, id, updates)
  }
}

// İçerik silme (Supabase'den)
export async function deleteContent(type, id) {
  // Admin kontrolü - Sadece admin silebilir
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    console.error('❌ Unauthorized: Admin authentication required')
    return false
  }

  // Sadece admin silebilir, editor silemez
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    console.error('❌ Unauthorized: Admin role required for delete operation')
    return false
  }

  const tableName = TABLE_NAMES[type]
  if (!tableName) return false

  try {
    // UUID kontrolü
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

    if (!isUUID) {
      // Eski ID formatıysa fallback kullan
      return deleteContentFallback(type, id)
    }

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)

    if (error) {
      console.error(`Error deleting ${type} from Supabase:`, error)
      return deleteContentFallback(type, id)
    }

    return true
  } catch (error) {
    console.error(`Error deleting ${type}:`, error)
    return deleteContentFallback(type, id)
  }
}

// Slug'a göre içerik bulma (hem Supabase hem static)
export async function getContentBySlug(type, slug) {
  const allContent = await getAllContentByType(type)
  return allContent.find(item => item.slug === slug)
}

// Ana sayfa içerik yönetimi (Supabase'den)
export async function getHomeContent() {
  if (!USE_SUPABASE) {
    return getHomeContentFallback()
  }

  try {
    const { data, error } = await supabase
      .from('home_content')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (error || !data) {
      // İlk kayıt yoksa oluştur
      const defaultContent = {
        vitrin1: null,
        vitrin2: null,
        vitrin3: null,
        son_icerikler: []
      }

      const { data: newData, error: insertError } = await supabase
        .from('home_content')
        .insert([defaultContent])
        .select()
        .single()

      if (insertError) {
        console.error('Error creating home_content:', insertError)
        return getHomeContentFallback()
      }

      return formatHomeContentFromSupabase(newData)
    }

    return formatHomeContentFromSupabase(data)
  } catch (error) {
    console.error('Error fetching home_content:', error)
    return getHomeContentFallback()
  }
}

export async function setHomeContent(content) {
  // Admin/Editor kontrolü
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    console.error('❌ Unauthorized: Admin authentication required')
    return false
  }

  // Editor ve admin home content'i güncelleyebilir
  const adminCheck = await isAdmin()
  const editorCheck = await isEditor()
  if (!adminCheck && !editorCheck) {
    console.error('❌ Unauthorized: Admin or Editor role required')
    return false
  }

  if (!USE_SUPABASE) {
    return setHomeContentFallback(content)
  }

  try {
    // Önce mevcut kaydı bul
    const { data: existing } = await supabase
      .from('home_content')
      .select('id')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    const supabaseData = formatHomeContentToSupabase(content)

    if (existing) {
      // Güncelle
      const { error } = await supabase
        .from('home_content')
        .update(supabaseData)
        .eq('id', existing.id)

      if (error) {
        console.error('Error updating home_content:', error)
        return setHomeContentFallback(content)
      }
    } else {
      // Yeni kayıt oluştur
      const { error } = await supabase
        .from('home_content')
        .insert([supabaseData])

      if (error) {
        console.error('Error inserting home_content:', error)
        return setHomeContentFallback(content)
      }
    }

    return true
  } catch (error) {
    console.error('Error setting home_content:', error)
    return setHomeContentFallback(content)
  }
}

export async function setHomeVitrin(position, contentId, contentType) {
  const homeContent = await getHomeContent()
  homeContent[position] = { id: contentId, type: contentType }
  return setHomeContent(homeContent)
}

export async function addToSonIcerikler(contentId, contentType) {
  const homeContent = await getHomeContent()
  if (!homeContent.sonIcerikler) {
    homeContent.sonIcerikler = []
  }
  // Zaten ekli değilse ekle
  if (!homeContent.sonIcerikler.find(item => item.id === contentId && item.type === contentType)) {
    homeContent.sonIcerikler.push({ id: contentId, type: contentType })
  }
  return setHomeContent(homeContent)
}

// Mail bülteni yönetimi (Supabase'den)
export async function getNewsletterSubscribers() {
  if (!USE_SUPABASE) {
    return getNewsletterSubscribersFallback()
  }

  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false })

    if (error) {
      console.error('Error fetching newsletter_subscribers:', error)
      return getNewsletterSubscribersFallback()
    }

    return data.map(item => ({
      id: item.id,
      email: item.email,
      subscribedAt: new Date(item.subscribed_at).getTime()
    }))
  } catch (error) {
    console.error('Error fetching newsletter_subscribers:', error)
    return getNewsletterSubscribersFallback()
  }
}

export async function addNewsletterSubscriber(email) {
  // Mail formatını kontrol et
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Geçerli bir e-posta adresi giriniz.' }
  }

  const emailLower = email.toLowerCase().trim()

  if (USE_SUPABASE) {
    try {
      // Zaten kayıtlı mı kontrol et
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('email')
        .eq('email', emailLower)
        .single()

      if (existing) {
        return { success: false, message: 'Bu e-posta adresi zaten kayıtlı.' }
      }

      // Yeni abone ekle
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: emailLower }])

      if (error) {
        console.error('Error adding newsletter subscriber:', error)
        return addNewsletterSubscriberFallback(email)
      }

      return { success: true, message: 'Başarıyla abone oldunuz!' }
    } catch (error) {
      console.error('Error adding newsletter subscriber:', error)
      return addNewsletterSubscriberFallback(email)
    }
  }

  return addNewsletterSubscriberFallback(email)
}

// Tüm içerikleri getir (tüm tiplerden) - Home sayfası için
export async function getAllContents() {
  const allVideos = (await getAllContentByType('videos')).map(item => ({ ...item, type: 'videos', path: '/video' }))
  const allYoutubeVideos = (await getAllContentByType('youtubeVideos')).map(item => ({ ...item, type: 'youtubeVideos', path: '/youtube' }))
  const allFailures = (await getAllContentByType('failures')).map(item => ({ ...item, type: 'failures', path: '/basarisizlik-hikayeleri' }))
  const allNews = (await getAllContentByType('news')).map(item => ({ ...item, type: 'news', path: '/yeni-dunya-haber' }))
  const allFinans = (await getAllContentByType('finans')).map(item => ({ ...item, type: 'finans', path: '/finans' }))

  return [...allVideos, ...allYoutubeVideos, ...allFailures, ...allNews, ...allFinans]
    .sort((a, b) => {
      const dateA = a.createdAt || (a.created_at ? new Date(a.created_at).getTime() : 0)
      const dateB = b.createdAt || (b.created_at ? new Date(b.created_at).getTime() : 0)
      return dateB - dateA
    })
}

// ==================== HELPER FONKSİYONLAR ====================

// Supabase'den gelen veriyi formatla (created_at -> createdAt, vb.)
function formatFromSupabase(item) {
  if (!item) return null

  const formatted = {
    ...item,
    createdAt: item.created_at ? new Date(item.created_at).getTime() : (item.createdAt || Date.now()),
    created_at: undefined, // Eski alanı kaldır
  }

  // Instagram alanlarını camelCase'e çevir
  if (item.instagram_permalink !== undefined) {
    formatted.instagramPermalink = item.instagram_permalink
    delete formatted.instagram_permalink
  }
  if (item.instagram_embed_url !== undefined) {
    formatted.instagramEmbedUrl = item.instagram_embed_url
    delete formatted.instagram_embed_url
  }
  if (item.youtube_id !== undefined) {
    formatted.youtubeId = item.youtube_id
    delete formatted.youtube_id
  }

  return formatted
}

// Supabase'e gönderilecek veriyi formatla (createdAt -> created_at, vb.)
function formatToSupabase(item) {
  const { id, createdAt, instagramPermalink, instagramEmbedUrl, youtubeId, ...rest } = item

  const formatted = {
    ...rest,
  }

  // Instagram alanlarını snake_case'e çevir
  if (instagramPermalink !== undefined) {
    formatted.instagram_permalink = instagramPermalink || null
  }
  if (instagramEmbedUrl !== undefined) {
    formatted.instagram_embed_url = instagramEmbedUrl || null
  }
  if (youtubeId !== undefined) {
    formatted.youtube_id = youtubeId || null
  }

  // Eğer createdAt varsa created_at'e çevir
  if (createdAt !== undefined) {
    formatted.created_at = new Date(createdAt).toISOString()
  }

  // UUID ise id'yi ekle
  if (id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    formatted.id = id
  }

  return formatted
}

// Home content formatı (Supabase'den)
function formatHomeContentFromSupabase(data) {
  if (!data) {
    return {
      vitrin1: null,
      vitrin2: null,
      vitrin3: null,
      sonIcerikler: []
    }
  }

  return {
    vitrin1: data.vitrin1,
    vitrin2: data.vitrin2,
    vitrin3: data.vitrin3,
    sonIcerikler: data.son_icerikler || []
  }
}

// Home content formatı (Supabase'e)
function formatHomeContentToSupabase(content) {
  return {
    vitrin1: content.vitrin1 || null,
    vitrin2: content.vitrin2 || null,
    vitrin3: content.vitrin3 || null,
    son_icerikler: content.sonIcerikler || []
  }
}

// ==================== LOCALSTORAGE FALLBACK FONKSİYONLAR ====================

const STORAGE_KEYS = {
  videos: 'ydweb_videos',
  youtubeVideos: 'ydweb_youtube_videos',
  failures: 'ydweb_failures',
  news: 'ydweb_news',
  finans: 'ydweb_finans',
  homeContent: 'ydweb_home_content',
  newsletter: 'ydweb_newsletter',
}

function getStoredDataFallback(key) {
  try {
    const storageKey = STORAGE_KEYS[key]
    if (!storageKey) return []
    const data = localStorage.getItem(storageKey)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

function getStoredObjectFallback(key) {
  try {
    const storageKey = STORAGE_KEYS[key]
    if (!storageKey) return null
    const data = localStorage.getItem(storageKey)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

function setStoredDataFallback(key, data) {
  try {
    const storageKey = STORAGE_KEYS[key]
    if (!storageKey) return false
    localStorage.setItem(storageKey, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error writing to localStorage:', error)
    return false
  }
}

function getHomeContentFallback() {
  const stored = getStoredObjectFallback('homeContent')
  if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
    return stored
  }
  return {
    vitrin1: null,
    vitrin2: null,
    vitrin3: null,
    sonIcerikler: []
  }
}

function setHomeContentFallback(content) {
  return setStoredDataFallback('homeContent', content)
}

function addContentFallback(type, content) {
  const existing = getStoredDataFallback(type)
  const newContent = {
    ...content,
    id: content.id || generateId(type[0]),
    createdAt: content.createdAt || Date.now(),
  }
  existing.push(newContent)
  return setStoredDataFallback(type, existing)
}

function updateContentFallback(type, id, updates) {
  const existing = getStoredDataFallback(type)
  const index = existing.findIndex(item => item.id === id)
  if (index === -1) return false
  existing[index] = { ...existing[index], ...updates }
  return setStoredDataFallback(type, existing)
}

function deleteContentFallback(type, id) {
  const existing = getStoredDataFallback(type)
  const filtered = existing.filter(item => item.id !== id)
  return setStoredDataFallback(type, filtered)
}

function getNewsletterSubscribersFallback() {
  return getStoredDataFallback('newsletter')
}

function addNewsletterSubscriberFallback(email) {
  const subscribers = getNewsletterSubscribersFallback()
  const emailLower = email.toLowerCase().trim()
  if (subscribers.some(sub => sub.email.toLowerCase() === emailLower)) {
    return { success: false, message: 'Bu e-posta adresi zaten kayıtlı.' }
  }
  const newSubscriber = {
    email: emailLower,
    subscribedAt: Date.now(),
    id: generateId('newsletter_')
  }
  subscribers.push(newSubscriber)
  const saved = setStoredDataFallback('newsletter', subscribers)
  if (saved) {
    return { success: true, message: 'Başarıyla abone oldunuz!' }
  } else {
    return { success: false, message: 'Kayıt sırasında bir hata oluştu.' }
  }
}
