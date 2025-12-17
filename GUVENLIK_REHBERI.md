# Güvenlik Rehberi 🔒

## ✅ Yapılan Güvenlik İyileştirmeleri

### 1. Admin Authentication - Supabase Entegrasyonu ✅

- ✅ Kullanıcı adı/şifreler artık kod içinde değil, Supabase'de saklanıyor
- ✅ Şifreler SHA-256 ile hash'leniyor
- ✅ Session timeout (24 saat) eklendi
- ✅ Tüm admin sayfalarında güvenli authentication kontrolü

### 2. Güvenlik Notları

**⚠️ ÖNEMLİ:** Bu sistem client-side hash kullanıyor. Production için daha güvenli alternatifler:

1. **Supabase Auth** (Önerilen) - En güvenli yöntem
2. **Serverless Functions** (Netlify/Vercel) - API endpoint ile authentication
3. **Edge Functions** (Supabase) - Server-side authentication

## 🔐 İlk Admin Kullanıcı Oluşturma

Detaylı talimatlar için: `ADMIN_KULLANICI_OLUSTURMA.md`

### Hızlı Başlangıç:

1. Supabase Dashboard > SQL Editor
2. Şu SQL'i çalıştırın:

```sql
-- Admin kullanıcı (şifre: admin123)
INSERT INTO admin_users (username, password_hash, role)
VALUES (
  'admin',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
  'admin'
);
```

## 🛡️ Ek Güvenlik Önerileri

### 1. RLS Politikalarını Güvenli Hale Getirin

Şu anda RLS politikaları herkese açık. Production'da:

```sql
-- Sadece authenticated kullanıcılar INSERT/UPDATE/DELETE yapabilir
CREATE POLICY "Authenticated insert on videos" ON videos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Veya custom admin kontrolü için:
CREATE POLICY "Admin only insert" ON videos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() -- Supabase Auth kullanıyorsanız
    )
  );
```

### 2. Environment Variables

✅ `.env` dosyası zaten oluşturuldu ve `.gitignore`'da

**Production'da:**
- `.env` dosyasını production server'a güvenli şekilde yükleyin
- Vercel/Netlify gibi platformlarda environment variables ayarlayın
- Asla `.env` dosyasını Git'e commit etmeyin

### 3. HTTPS Kullanın

- Production'da mutlaka HTTPS kullanın
- Vercel, Netlify gibi platformlar otomatik HTTPS sağlar

### 4. CORS Ayarları

Supabase Dashboard > Settings > API > CORS:
- Sadece kendi domain'inizi ekleyin
- `*` (tüm domainler) kullanmayın

### 5. Rate Limiting

Supabase otomatik rate limiting sağlar, ancak:
- Önemli endpoint'ler için ek rate limiting ekleyebilirsiniz
- Supabase Edge Functions kullanarak custom rate limiting

### 6. Input Validation

Tüm form input'larında:
- ✅ Required alanlar kontrol ediliyor
- ✅ URL validation var
- ⚠️ Ek validation eklenebilir (XSS, SQL injection koruması)

### 7. Şifre Güvenliği

- ✅ Şifreler hash'leniyor
- ⚠️ Güçlü şifreler kullanın (min 12 karakter)
- ⚠️ Düzenli şifre değişimi (3-6 ay)

### 8. Session Güvenliği

- ✅ Session timeout (24 saat)
- ✅ SessionStorage kullanılıyor (XSS'e karşı daha güvenli)
- ⚠️ Production'da HttpOnly cookies kullanılabilir

## 🚀 Production Deployment Checklist

### Güvenlik

- [ ] `.env` dosyası production'da doğru ayarlanmış
- [ ] HTTPS aktif
- [ ] CORS ayarları yapılmış
- [ ] RLS politikaları gözden geçirilmiş
- [ ] Admin kullanıcılar oluşturulmuş
- [ ] Güçlü şifreler kullanılıyor
- [ ] Environment variables güvenli şekilde saklanıyor

### Performans

- [ ] Build optimizasyonu yapılmış (`npm run build`)
- [ ] CDN kullanılıyor (Vercel/Netlify otomatik)
- [ ] Image optimization aktif
- [ ] Lazy loading kullanılıyor

### Monitoring

- [ ] Error tracking (Sentry, LogRocket, vb.)
- [ ] Analytics (Google Analytics, Plausible, vb.)
- [ ] Uptime monitoring

## 📝 Sonraki Adımlar

1. **Supabase Auth'a Geçiş** (Önerilen)
   - Daha güvenli authentication
   - Email verification
   - Password reset
   - Multi-factor authentication

2. **Serverless Functions**
   - Admin authentication için API endpoint
   - Daha güvenli şifre hash'leme
   - Rate limiting

3. **Content Security Policy (CSP)**
   - XSS koruması
   - Inline script'leri kaldırma

4. **Security Headers**
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

## 🔗 Kaynaklar

- [Supabase Security Best Practices](https://supabase.com/docs/guides/platform/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Basics](https://developer.mozilla.org/en-US/docs/Web/Security)

