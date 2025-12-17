// Supabase Client Configuration
// Bu dosya Supabase bağlantısını yönetir

import { createClient } from '@supabase/supabase-js'

// .env dosyasından Supabase bilgilerini alıyoruz
// Eğer .env dosyası yoksa veya değerler yoksa hata verecek
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Eğer URL veya Key yoksa kullanıcıyı uyar
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase yapılandırması eksik!')
  console.error('Lütfen .env dosyasında VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY değerlerini ayarlayın.')
}

// Supabase client'ı oluştur ve export et
// Bu client'ı projede her yerde kullanabilirsiniz
// Eğer URL veya key yoksa, boş string ile client oluştur (hata vermesin)
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key')

// Test için basit bir fonksiyon (opsiyonel)
export async function testConnection() {
  try {
    // Önce URL ve Key kontrolü
    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co') {
      console.error('❌ Supabase yapılandırması eksik!')
      console.error('Lütfen .env dosyasında VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY değerlerini ayarlayın.')
      return false
    }

    const { data, error } = await supabase.from('videos').select('count')
    if (error) {
      console.error('❌ Supabase bağlantı hatası:', error)
      return false
    }
    console.log('✅ Supabase bağlantısı başarılı!')
    return true
  } catch (err) {
    console.error('❌ Bağlantı testi başarısız:', err)
    return false
  }
}

// Uygulama başlangıcında otomatik test (development modunda)
if (import.meta.env.DEV) {
  // Sayfa yüklendiğinde test et
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      testConnection().then(success => {
        if (success) {
          console.log('✅ Supabase bağlantısı doğrulandı!')
        } else {
          console.warn('⚠️ Supabase bağlantısı başarısız. Lütfen .env dosyasını kontrol edin.')
        }
      })
    }, 1000) // 1 saniye bekle (sayfa yüklenmesi için)
  }
}



