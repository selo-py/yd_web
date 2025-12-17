# Supabase Auth'a Geçiş Rehberi 🔐

## Neden Supabase Auth?

- ✅ Server-side authentication (daha güvenli)
- ✅ JWT token tabanlı güvenlik
- ✅ RLS politikaları tam çalışır
- ✅ Email verification
- ✅ Password reset
- ✅ Multi-factor authentication desteği

## 📋 Adım Adım Kurulum

### Adım 1: Supabase Auth'u Aktif Edin

1. **Supabase Dashboard'a gidin**
   - https://supabase.com
   - Projenizi seçin

2. **Authentication'ı açın**
   - Sol menüden **Authentication** > **Providers** seçin
   - **Email** provider'ını aktif edin
   - **Enable Email provider** butonuna tıklayın

3. **Email ayarlarını yapın** (opsiyonel)
   - **SMTP Settings** bölümünden email gönderimi ayarlayın
   - Veya Supabase'in varsayılan email servisini kullanın

### Adım 2: İlk Admin Kullanıcıyı Oluşturun

**Yöntem 1: Dashboard'dan Oluştur + SQL ile Metadata Ekle (Önerilen)**

1. **Supabase Dashboard > Authentication > Users**
2. **Add user** butonuna tıklayın
3. Şu bilgileri girin:
   - **Email**: admin@ydinovasyon.com (veya istediğiniz email)
   - **Password**: Güçlü bir şifre girin
   - **Auto Confirm User**: ✅ İşaretleyin (email verification olmadan giriş için)
4. **Create user** butonuna tıklayın

5. **Editor kullanıcı oluşturun** (aynı şekilde):
   - Email: editor@ydinovasyon.com
   - Password: Güçlü bir şifre
   - Auto Confirm User: ✅ İşaretleyin
   - Create user

6. **User Metadata'yı SQL ile ekleyin:**
   - Supabase Dashboard > SQL Editor
   - `supabase-admin-users-create.sql` dosyasındaki UPDATE sorgularını çalıştırın
   - Email adreslerini kendi oluşturduğunuz email'lerle değiştirin

**Yöntem 2: Sadece SQL ile (Alternatif)**

Eğer Dashboard'dan oluşturmak istemiyorsanız, `supabase-admin-users-create.sql` dosyasındaki SQL komutlarını kullanabilirsiniz (daha karmaşık).

### Adım 3: RLS Politikalarını Güncelleyin

Supabase Dashboard > SQL Editor'de şu SQL'i çalıştırın:

```sql
-- Mevcut politikaları sil
DROP POLICY IF EXISTS "Authenticated insert on videos" ON videos;
DROP POLICY IF EXISTS "Authenticated update on videos" ON videos;
DROP POLICY IF EXISTS "Authenticated delete on videos" ON videos;

DROP POLICY IF EXISTS "Authenticated insert on youtube_videos" ON youtube_videos;
DROP POLICY IF EXISTS "Authenticated update on youtube_videos" ON youtube_videos;
DROP POLICY IF EXISTS "Authenticated delete on youtube_videos" ON youtube_videos;

DROP POLICY IF EXISTS "Authenticated insert on failures" ON failures;
DROP POLICY IF EXISTS "Authenticated update on failures" ON failures;
DROP POLICY IF EXISTS "Authenticated delete on failures" ON failures;

DROP POLICY IF EXISTS "Authenticated insert on news" ON news;
DROP POLICY IF EXISTS "Authenticated update on news" ON news;
DROP POLICY IF EXISTS "Authenticated delete on news" ON news;

DROP POLICY IF EXISTS "Authenticated insert on finans" ON finans;
DROP POLICY IF EXISTS "Authenticated update on finans" ON finans;
DROP POLICY IF EXISTS "Authenticated delete on finans" ON finans;

DROP POLICY IF EXISTS "Authenticated insert on home_content" ON home_content;
DROP POLICY IF EXISTS "Authenticated update on home_content" ON home_content;
DROP POLICY IF EXISTS "Authenticated delete on home_content" ON home_content;

-- Yeni güvenli politikalar

-- VIDEOS Tablosu
CREATE POLICY "Admin or editor insert on videos" ON videos
  FOR INSERT WITH CHECK (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on videos" ON videos
  FOR UPDATE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on videos" ON videos
  FOR DELETE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text = 'admin'
  );

-- YOUTUBE_VIDEOS Tablosu
CREATE POLICY "Admin or editor insert on youtube_videos" ON youtube_videos
  FOR INSERT WITH CHECK (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on youtube_videos" ON youtube_videos
  FOR UPDATE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on youtube_videos" ON youtube_videos
  FOR DELETE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text = 'admin'
  );

-- FAILURES Tablosu
CREATE POLICY "Admin or editor insert on failures" ON failures
  FOR INSERT WITH CHECK (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on failures" ON failures
  FOR UPDATE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on failures" ON failures
  FOR DELETE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text = 'admin'
  );

-- NEWS Tablosu
CREATE POLICY "Admin or editor insert on news" ON news
  FOR INSERT WITH CHECK (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on news" ON news
  FOR UPDATE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on news" ON news
  FOR DELETE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text = 'admin'
  );

-- FINANS Tablosu
CREATE POLICY "Admin or editor insert on finans" ON finans
  FOR INSERT WITH CHECK (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on finans" ON finans
  FOR UPDATE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on finans" ON finans
  FOR DELETE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text = 'admin'
  );

-- HOME_CONTENT Tablosu
CREATE POLICY "Admin or editor insert on home_content" ON home_content
  FOR INSERT WITH CHECK (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on home_content" ON home_content
  FOR UPDATE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on home_content" ON home_content
  FOR DELETE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text = 'admin'
  );

-- NEWSLETTER_SUBSCRIBERS Tablosu (herkes ekleyebilir, sadece admin silebilir)
-- Public insert zaten var, sadece delete'i güncelleyelim
DROP POLICY IF EXISTS "Authenticated delete on newsletter_subscribers" ON newsletter_subscribers;

CREATE POLICY "Admin only delete on newsletter_subscribers" ON newsletter_subscribers
  FOR DELETE USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text = 'admin'
  );

-- ADMIN_USERS Tablosu (sadece admin okuyabilir)
DROP POLICY IF EXISTS "Authenticated read on admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated insert on admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated update on admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated delete on admin_users" ON admin_users;

CREATE POLICY "Admin only read on admin_users" ON admin_users
  FOR SELECT USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role')::text = 'admin'
  );
```

### Adım 4: RLS Politikalarını Uygulayın

Supabase Dashboard > SQL Editor'de `supabase-rls-policies-auth.sql` dosyasının içeriğini çalıştırın.

### Adım 5: Kodları Güncelleyin

Kodları Supabase Auth kullanacak şekilde güncelleyeceğiz (aşağıdaki adımlarda).

## ⚠️ Önemli Notlar

1. **Email Verification**: İsterseniz email verification'ı aktif edebilirsiniz
2. **Password Reset**: Supabase Auth otomatik password reset sağlar
3. **Session Management**: Supabase Auth otomatik session yönetimi yapar
4. **JWT Tokens**: Güvenli JWT token'lar otomatik oluşturulur

## 🔄 Geçiş Sonrası

1. Eski `admin_users` tablosunu kullanmayı bırakabilirsiniz (opsiyonel)
2. Tüm authentication Supabase Auth üzerinden yapılacak
3. RLS politikaları tam çalışacak
4. Daha güvenli bir sistem olacak

