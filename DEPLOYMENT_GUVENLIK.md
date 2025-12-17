# Deployment Güvenlik Checklist 🚀

## Production'a Geçmeden Önce Yapılması Gerekenler

### 1. Environment Variables ✅

- [x] `.env` dosyası oluşturuldu
- [ ] Production environment variables ayarlandı (Vercel/Netlify)
- [ ] `.env` dosyası Git'e commit edilmedi (`.gitignore`'da)

**Vercel/Netlify'da:**
- Settings > Environment Variables
- `VITE_SUPABASE_URL` ekleyin
- `VITE_SUPABASE_ANON_KEY` ekleyin

### 2. Supabase Ayarları

- [ ] CORS ayarları yapıldı
  - Supabase Dashboard > Settings > API > CORS
  - Sadece kendi domain'inizi ekleyin (örn: `https://ydinovasyon.com`)
  - `*` (tüm domainler) kullanmayın

- [ ] RLS politikaları gözden geçirildi
  - Şu anda herkese açık (development için OK)
  - Production'da Supabase Auth kullanıldığında güvenli hale getirin

- [x] Admin kullanıcılar oluşturuldu
  - `ADMIN_KULLANICI_OLUSTURMA.md` dosyasına bakın
  - Güçlü şifreler kullanın

### 3. Security Headers ✅

- [x] Security headers eklendi (`index.html`)
- [x] Content Security Policy eklendi
- [ ] Production'da CSP optimize edildi (nonce/hash kullanımı)

**Not:** CSP'deki `unsafe-inline` ve `unsafe-eval` React/Vite için gerekli. Production'da optimize edilebilir.

### 4. Input Validation ✅

- [x] Input validation utilities oluşturuldu
- [x] `AddVideo.jsx` sayfasına validation eklendi
- [x] `Bulten.jsx` sayfasına validation eklendi
- [ ] Diğer form sayfalarına validation eklendi (opsiyonel ama önerilir)

### 5. HTTPS

- [ ] HTTPS aktif (Vercel/Netlify otomatik sağlar)
- [ ] HTTP'den HTTPS'ye yönlendirme yapıldı

### 6. Build ve Deploy

```bash
# Production build
npm run build

# Build'i test et
npm run preview
```

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### 7. Monitoring ve Logging

- [ ] Error tracking eklendi (Sentry, LogRocket, vb.)
- [ ] Analytics eklendi (Google Analytics, Plausible, vb.)
- [ ] Uptime monitoring (UptimeRobot, Pingdom, vb.)

### 8. Güvenlik Testleri

- [ ] XSS saldırıları test edildi
- [ ] SQL injection test edildi (Supabase otomatik korur)
- [ ] CSRF koruması test edildi
- [ ] Authentication bypass test edildi
- [ ] Input validation test edildi

### 9. Performance

- [ ] Build optimizasyonu yapıldı
- [ ] Image optimization aktif
- [ ] Lazy loading kullanılıyor
- [ ] CDN kullanılıyor (Vercel/Netlify otomatik)

### 10. Backup ve Recovery

- [ ] Supabase backup ayarları yapıldı
- [ ] Database backup stratejisi belirlendi
- [ ] Recovery planı hazırlandı

## 🚨 Acil Durum Planı

### Güvenlik İhlali Durumunda:

1. **Hemen yapılacaklar:**
   - Tüm admin şifrelerini değiştirin
   - Supabase API key'lerini yenileyin
   - Etkilenen kullanıcıları bilgilendirin

2. **İnceleme:**
   - Log'ları kontrol edin
   - Hangi verilerin erişildiğini belirleyin
   - Güvenlik açığını kapatın

3. **Önleme:**
   - Güvenlik açığını düzeltin
   - Ek güvenlik önlemleri alın
   - Düzenli güvenlik audit'i yapın

## 📝 Sonraki Adımlar (İleride)

1. **Supabase Auth'a Geçiş**
   - Daha güvenli authentication
   - Email verification
   - Password reset
   - Multi-factor authentication

2. **Serverless Functions**
   - Admin authentication için API endpoint
   - Daha güvenli şifre hash'leme
   - Rate limiting

3. **Advanced Security**
   - Content Security Policy optimization
   - Subresource Integrity (SRI)
   - HTTP Strict Transport Security (HSTS)

## 🔗 Kaynaklar

- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

