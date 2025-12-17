# Production Hazırlık Checklist ✅

## ✅ Tamamlanan İşlemler

### 1. Supabase Auth Kurulumu ✅
- [x] Supabase Auth aktif edildi
- [x] Admin kullanıcı oluşturuldu
- [x] Editor kullanıcı oluşturuldu
- [x] User metadata eklendi (role: admin/editor)
- [x] RLS politikaları uygulandı

### 2. Güvenlik İyileştirmeleri ✅
- [x] Security headers eklendi
- [x] Content Security Policy (CSP) eklendi
- [x] Input validation utilities oluşturuldu
- [x] Form validation eklendi (AddVideo, Bulten)
- [x] Admin authentication Supabase Auth'a geçirildi
- [x] Client-side admin kontrolleri eklendi

### 3. Kod Güncellemeleri ✅
- [x] Tüm admin sayfaları Supabase Auth kullanıyor
- [x] Async authentication kontrolleri eklendi
- [x] Rol bazlı yetkilendirme çalışıyor

## ⚠️ Yapılması Gerekenler (ÖNEMLİ!)

### 1. Test Etme 🔴

**Mutlaka test edin:**

1. **Admin Login Test:**
   - [✅] Admin email ile giriş yapın
   - [✅] Dashboard'a erişebildiğinizi kontrol edin
   - [✅] İçerik ekleyin
   - [✅] İçerik güncelleyin
   - [] İçerik silin

2. **Editor Login Test:**
   - [✅] Editor email ile giriş yapın
   - [✅] Dashboard'a erişebildiğinizi kontrol edin
   - [✅] İçerik ekleyin ✅
   - [✅] İçerik güncelleyin ✅
   - [✅] İçerik silmeyi deneyin ❌ (Başarısız olmalı)

3. **Public Sayfalar Test:**
   - [✅] Ana sayfa açılıyor mu?
   - [✅] İçerikler görüntüleniyor mu?
   - [✅] Arama çalışıyor mu?
   - [✅] Newsletter formu çalışıyor mu?

### 2. Environment Variables 🔴

**Production'da mutlaka ayarlayın:**

- [ ] `VITE_SUPABASE_URL` - Production URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Production Anon Key
- [ ] `.env` dosyası Git'e commit edilmedi (`.gitignore`'da)

**Vercel'de Environment Variables Ekleme:**
1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. **Add New** → Key: `VITE_SUPABASE_URL`, Value: (Supabase URL'iniz)
3. **Add New** → Key: `VITE_SUPABASE_ANON_KEY`, Value: (Anon Key'iniz)
4. Her ikisinde de **Production** environment'ı seçin
5. **Deployments** → En son deployment → **Redeploy**

**📖 Detaylı rehber:** `VERCEL_DEPLOY_REHBERI.md` dosyasına bakın

### 3. Supabase CORS Ayarları 🔴

**Supabase Dashboard'da:**

1. **Settings > API > CORS**
2. Sadece kendi domain'inizi ekleyin:
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`
3. **`*` (tüm domainler) kullanmayın!**

### 4. Build ve Deploy Test 🟡

**Local'de test edin:**

```bash
# Production build
npm run build

# Build'i test et
npm run preview
```

**Kontrol edin:**
- [ ] Build başarılı mı?
- [ ] Preview'da site çalışıyor mu?
- [ ] Admin login çalışıyor mu?

### 5. Production Deployment 🟡

**Vercel için:**
```bash
npm i -g vercel
vercel --prod
```

**Netlify için:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**Kontrol edin:**
- [ ] Site yayında mı?
- [ ] HTTPS aktif mi?
- [ ] Admin login çalışıyor mu?

### 6. Güvenlik Son Kontrolleri 🟡

- [ ] Admin şifreleri güçlü mü?
- [ ] Editor şifreleri güçlü mü?
- [ ] `.env` dosyası Git'te yok mu?
- [ ] CORS ayarları yapıldı mı?
- [ ] HTTPS aktif mi?

### 7. Monitoring (Opsiyonel ama Önerilir) 🟢

- [ ] Error tracking (Sentry, LogRocket)
- [ ] Analytics (Google Analytics, Plausible)
- [ ] Uptime monitoring (UptimeRobot)

## 🚨 Kritik Kontroller

### Supabase Auth Kontrolü

```sql
-- Kullanıcıların metadata'sını kontrol edin:
SELECT id, email, raw_user_meta_data, created_at
FROM auth.users
WHERE email IN ('admin@ydinovasyon.com', 'editor@ydinovasyon.com');
```

**Beklenen sonuç:**
- `raw_user_meta_data` içinde `{"role": "admin"}` veya `{"role": "editor"}` olmalı

### RLS Politikaları Kontrolü

```sql
-- Politikaların aktif olduğunu kontrol edin:
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('videos', 'youtube_videos', 'failures', 'news', 'finans', 'home_content');
```

## 📝 Sonraki Adımlar (İleride)

1. **Email Verification** (Opsiyonel)
   - Supabase Auth'da email verification aktif edin
   - Daha güvenli olur

2. **Password Reset** (Opsiyonel)
   - Supabase Auth otomatik sağlar
   - Admin panelinde "Şifremi Unuttum" ekleyebilirsiniz

3. **Rate Limiting** (İleride)
   - Login endpoint için rate limiting
   - Supabase Edge Functions ile

4. **Audit Logging** (İleride)
   - Admin işlemlerini loglayın
   - Supabase'de `audit_log` tablosu oluşturun

## ✅ Proje Durumu

**Kodlar hazır!** Ancak yukarıdaki testleri yapmadan production'a geçmeyin.

### Öncelik Sırası:

1. **🔴 Yüksek Öncelik (Mutlaka Yapın):**
   - Test etme (Admin/Editor login)
   - Environment variables ayarlama
   - CORS ayarları
   - Build test

2. **🟡 Orta Öncelik (Önerilir):**
   - Production deployment
   - Güvenlik son kontrolleri

3. **🟢 Düşük Öncelik (İleride):**
   - Monitoring
   - Email verification
   - Rate limiting

## 🎉 Hazır Olduğunuzda

Tüm testleri yaptıktan sonra:
1. Production'a deploy edin
2. Admin login'i test edin
3. Siteyi yayınlayın!

**Sorun olursa:** `DEPLOYMENT_GUVENLIK.md` dosyasına bakın.

