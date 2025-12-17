# Supabase Bağlantı Kontrol Listesi

## ✅ Tamamlananlar

1. ✅ Supabase paketi yüklü (`@supabase/supabase-js`)
2. ✅ Supabase client yapılandırması hazır (`src/lib/supabase.js`)
3. ✅ dataManager.js Supabase kullanıyor (`USE_SUPABASE = true`)
4. ✅ Database schema dosyası hazır (`supabase-schema.sql`)
5. ✅ RLS politikaları hazır (`supabase-rls-policies.sql`)
6. ✅ Tablolar oluşturulmuş (sizin belirttiğinize göre)

## ❌ Eksikler ve Yapılması Gerekenler

### 1. .env Dosyası Oluşturma (KRİTİK!)

Proje root dizininde `.env` dosyası oluşturun:

```bash
# Proje root dizininde (.gitignore'da olduğu için git'e commit edilmeyecek)
touch .env
```

`.env` dosyasına şu içeriği ekleyin:

```env
# Supabase Yapılandırması
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Supabase URL ve Key'i Nasıl Bulursunuz?**

1. Supabase Dashboard'a gidin: https://supabase.com
2. Projenizi seçin
3. Sol menüden **Settings** > **API** seçeneğine tıklayın
4. Şu bilgileri kopyalayın:
   - **Project URL** → `VITE_SUPABASE_URL` değeri
   - **anon public** key → `VITE_SUPABASE_ANON_KEY` değeri

### 2. Database Tablolarını Kontrol Edin

Supabase Dashboard > Table Editor'de şu tabloların olduğundan emin olun:

- ✅ `videos`
- ✅ `youtube_videos`
- ✅ `failures`
- ✅ `news`
- ✅ `finans`
- ✅ `home_content`
- ✅ `newsletter_subscribers`
- ✅ `admin_users`

### 3. RLS Politikalarını Kontrol Edin

Supabase Dashboard > Authentication > Policies'de tüm tablolar için RLS politikalarının aktif olduğundan emin olun.

Eğer politikalar yoksa, `supabase-rls-policies.sql` dosyasını SQL Editor'de çalıştırın.

### 4. İlk Home Content Kaydını Oluşturun

SQL Editor'de şu sorguyu çalıştırın:

```sql
INSERT INTO home_content (vitrin1, vitrin2, vitrin3, son_icerikler)
VALUES (NULL, NULL, NULL, '[]'::jsonb);
```

### 5. Bağlantıyı Test Edin

`.env` dosyasını oluşturduktan sonra:

1. Development server'ı yeniden başlatın:
   ```bash
   npm run dev
   ```

2. Browser console'u açın (F12)

3. Console'da şu mesajları kontrol edin:
   - ❌ "Supabase yapılandırması eksik!" görüyorsanız → `.env` dosyası doğru oluşturulmamış
   - ✅ Hata yoksa → Bağlantı başarılı!

4. Ana sayfayı açın ve içeriklerin Supabase'den geldiğini kontrol edin.

### 6. Admin Authentication (Opsiyonel - İleride)

Şu anda admin authentication localStorage/sessionStorage kullanıyor. İleride Supabase Auth kullanmak isterseniz:

- Supabase Dashboard > Authentication > Providers'dan authentication yöntemlerini yapılandırın
- `src/pages/admin/AdminLogin.jsx` dosyasını Supabase Auth kullanacak şekilde güncelleyin

## Hızlı Test Komutu

Browser console'da şu komutu çalıştırarak bağlantıyı test edebilirsiniz:

```javascript
// Browser console'da
import { testConnection } from './src/lib/supabase.js'
testConnection()
```

Veya sayfada zaten yüklüyse:

```javascript
// Browser console'da
const { testConnection } = await import('/src/lib/supabase.js')
await testConnection()
```

## Sorun Giderme

### "Supabase yapılandırması eksik!" hatası
- `.env` dosyasının proje root dizininde olduğundan emin olun
- Dosya adının tam olarak `.env` olduğundan emin olun (`.env.local` değil)
- Development server'ı yeniden başlatın (`.env` değişiklikleri için gerekli)

### "Error fetching ... from Supabase" hatası
- Supabase URL ve Key'in doğru olduğundan emin olun
- RLS politikalarının aktif olduğundan emin olun
- Tabloların doğru oluşturulduğundan emin olun

### Veriler görünmüyor
- Tablolarda veri olduğundan emin olun (Supabase Dashboard > Table Editor)
- RLS politikalarının "Public read access" olduğundan emin olun
- Browser console'da hata var mı kontrol edin

