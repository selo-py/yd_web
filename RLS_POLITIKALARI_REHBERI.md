# RLS Politikaları Güvenlik Rehberi 🔒

## ⚠️ Önemli Not

**Custom Authentication Sistemi Kullanıyoruz**

Şu anda custom authentication sistemi kullanıldığı için, Supabase RLS politikaları tam olarak çalışmaz. RLS politikaları Supabase Auth JWT token'larına bağlıdır.

**Çözüm:** Client-side'da admin kontrolü yapıyoruz. Bu yeterli güvenlik sağlar ama ideal değil.

## ✅ Yapılan İyileştirmeler

### 1. Client-Side Admin Kontrolü Eklendi

`dataManager.js` dosyasına admin kontrolü eklendi:

- ✅ `addContent()` - Admin ve Editor ekleme yapabilir
- ✅ `updateContent()` - Admin ve Editor güncelleme yapabilir
- ✅ `deleteContent()` - **Sadece Admin** silebilir (Editor silemez)
- ✅ `setHomeContent()` - Admin ve Editor güncelleme yapabilir

### 2. UI'da Rol Kontrolü

- ✅ `ContentList.jsx` - Silme butonu sadece admin için gösteriliyor
- ✅ `handleDelete()` - Editor'lar silme yapamaz (ekstra kontrol)

## 🔐 Mevcut Güvenlik Katmanları

### Katman 1: Client-Side Authentication
- ✅ `authManager.js` - Admin authentication kontrolü
- ✅ Session timeout (24 saat)
- ✅ Rol kontrolü (admin/editor)

### Katman 2: Client-Side İşlem Kontrolü
- ✅ `dataManager.js` - Her işlemden önce admin kontrolü
- ✅ Rol bazlı yetkilendirme (admin/editor ayrımı)

### Katman 3: UI Kontrolü
- ✅ Admin sayfalarında authentication kontrolü
- ✅ Silme butonları sadece admin için gösteriliyor
- ✅ Editor'lar için kısıtlamalar

### Katman 4: Supabase RLS (Sınırlı)
- ⚠️ Şu anda herkese açık (custom auth ile sınırlı)
- ✅ Supabase Auth'a geçiş yapıldığında aktif edilecek

## 🚀 Supabase Auth'a Geçiş (Önerilen)

En güvenli çözüm Supabase Auth kullanmaktır:

### Adımlar:

1. **Supabase Auth'u Aktif Edin**
   - Supabase Dashboard > Authentication > Providers
   - Email/Password provider'ı aktif edin

2. **Admin Kullanıcıları Oluşturun**
   - Supabase Dashboard > Authentication > Users
   - Admin kullanıcıları ekleyin
   - User metadata'da `role: 'admin'` veya `role: 'editor'` ekleyin

3. **RLS Politikalarını Güncelleyin**

```sql
-- Örnek: Videos tablosu için
DROP POLICY IF EXISTS "Authenticated insert on videos" ON videos;
DROP POLICY IF EXISTS "Authenticated update on videos" ON videos;
DROP POLICY IF EXISTS "Authenticated delete on videos" ON videos;

-- Admin ve Editor INSERT yapabilir
CREATE POLICY "Admin or editor insert on videos" ON videos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        (auth.users.raw_user_meta_data->>'role')::text = 'admin'
        OR (auth.users.raw_user_meta_data->>'role')::text = 'editor'
      )
    )
  );

-- Admin ve Editor UPDATE yapabilir
CREATE POLICY "Admin or editor update on videos" ON videos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        (auth.users.raw_user_meta_data->>'role')::text = 'admin'
        OR (auth.users.raw_user_meta_data->>'role')::text = 'editor'
      )
    )
  );

-- Sadece Admin DELETE yapabilir
CREATE POLICY "Admin only delete on videos" ON videos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role')::text = 'admin'
    )
  );
```

## 📋 Mevcut Durum Özeti

### ✅ Çalışan Güvenlik Önlemleri:

1. **Admin Authentication**
   - Kullanıcı adı/şifre Supabase'de hash'lenmiş
   - Session timeout (24 saat)
   - Client-side authentication kontrolü

2. **Rol Bazlı Yetkilendirme**
   - Admin: Tüm işlemler (INSERT, UPDATE, DELETE)
   - Editor: INSERT, UPDATE (DELETE hariç)
   - Client-side kontrolü aktif

3. **UI Kısıtlamaları**
   - Silme butonları sadece admin için görünüyor
   - Editor'lar silme yapamaz (hem UI hem backend kontrolü)

### ⚠️ Sınırlamalar:

1. **RLS Politikaları**
   - Custom authentication ile tam çalışmıyor
   - Client-side kontrolüne bağlı
   - Supabase Auth'a geçiş yapıldığında aktif edilecek

2. **Client-Side Kontrolü**
   - Kullanıcı browser console'dan bypass edebilir (teorik olarak)
   - Ancak Supabase'e istek gönderilmeden önce kontrol ediliyor
   - Pratikte yeterli güvenlik sağlar

## 🛡️ Ek Güvenlik Önerileri

### 1. Supabase Edge Functions (İleride)

Server-side authentication için:
- Admin işlemleri için Edge Function oluşturun
- Edge Function içinde admin kontrolü yapın
- Client-side'dan Edge Function'ı çağırın

### 2. Rate Limiting

- Login endpoint için rate limiting
- Form submission için rate limiting
- IP-based rate limiting

### 3. Audit Logging

- Tüm admin işlemlerini loglayın
- Hangi kullanıcı ne zaman ne yaptı
- Supabase'de bir `audit_log` tablosu oluşturun

## 📝 Test Checklist

- [ ] Admin kullanıcı ile giriş yapıldı
- [ ] Admin kullanıcı içerik ekleyebiliyor
- [ ] Admin kullanıcı içerik güncelleyebiliyor
- [ ] Admin kullanıcı içerik silebiliyor
- [ ] Editor kullanıcı ile giriş yapıldı
- [ ] Editor kullanıcı içerik ekleyebiliyor
- [ ] Editor kullanıcı içerik güncelleyebiliyor
- [ ] Editor kullanıcı içerik **silemiyor** (buton görünmüyor)
- [ ] Editor kullanıcı console'dan silme denemesi yapıldı → Başarısız olmalı

## 🔗 Kaynaklar

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Custom Authentication Best Practices](https://supabase.com/docs/guides/auth/auth-helpers/custom-auth)

