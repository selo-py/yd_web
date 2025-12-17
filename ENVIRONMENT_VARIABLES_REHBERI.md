# Environment Variables Rehberi 📝

## 🔍 Environment Variables Nedir?

Environment Variables (Ortam Değişkenleri), uygulamanızın çalışması için gerekli olan ama **kodunuzda hardcode edilmemesi gereken** hassas bilgilerdir.

### Neden Önemli?

1. **Güvenlik**: API key'leriniz kodunuzda görünmez
2. **Esneklik**: Farklı ortamlar (development, production) için farklı değerler kullanabilirsiniz
3. **Gizlilik**: `.env` dosyası Git'e commit edilmez, sadece sizde kalır

---

## 📁 Local Development (.env Dosyası)

### Şu An Durumunuz

Projenizde zaten bir `.env` dosyası var ve içinde şunlar bulunuyor:

```env
VITE_SUPABASE_URL=https://zygnerqztiaegyqzlkix.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### ✅ Kontrol Edin

1. `.env` dosyası `.gitignore`'da mı? ✅ (Evet, zaten var)
2. `.env` dosyası Git'e commit edilmiş mi? Kontrol edin:

```bash
# Git'te .env dosyası var mı kontrol edin
git ls-files | grep .env
```

**Eğer çıktı boşsa:** ✅ Güvenli! `.env` dosyası Git'te yok.

**Eğer `.env` görünüyorsa:** ❌ Sorun var! Aşağıdaki adımları uygulayın:

```bash
# .env dosyasını Git'ten kaldırın (dosyayı silmez, sadece Git tracking'den çıkarır)
git rm --cached .env

# Commit edin
git commit -m "Remove .env from Git tracking"
```

---

## 🌐 Production Deployment

### ⚠️ ÖNEMLİ: Production'da `.env` Dosyası Kullanılmaz!

Production'da (Vercel, Netlify, vs.) `.env` dosyasını yüklemezsiniz. Bunun yerine **platform'un kendi environment variables ayarlarını** kullanırsınız.

---

## 🚀 Platform Bazlı Kurulum

### 1️⃣ Vercel'de Environment Variables

#### Adım 1: Vercel Dashboard'a Gidin
1. [vercel.com](https://vercel.com) → Projenizi seçin
2. **Settings** → **Environment Variables**

#### Adım 2: Variables Ekleyin

Her bir değişken için:

1. **Name**: `VITE_SUPABASE_URL`
2. **Value**: `https://zygnerqztiaegyqzlkix.supabase.co`
3. **Environment**: 
   - ✅ **Production** (mutlaka işaretleyin)
   - ✅ **Preview** (opsiyonel, test için)
   - ❌ **Development** (local'de zaten var)

4. **Add** butonuna tıklayın

Aynı şekilde ikinci değişkeni ekleyin:
- **Name**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (tam key'inizi yapıştırın)
- **Environment**: ✅ Production, ✅ Preview

#### Adım 3: Deploy Edin

Variables ekledikten sonra:
1. **Deployments** sekmesine gidin
2. En son deployment'ın yanındaki **⋯** (üç nokta) → **Redeploy**
3. Veya yeni bir commit push edin

#### 📸 Görsel Rehber (Vercel)

```
Settings
  └── Environment Variables
      └── Add New
          ├── Name: VITE_SUPABASE_URL
          ├── Value: https://zygnerqztiaegyqzlkix.supabase.co
          └── Environment: ☑ Production ☑ Preview
```

---

### 2️⃣ Netlify'da Environment Variables

#### Adım 1: Netlify Dashboard'a Gidin
1. [app.netlify.com](https://app.netlify.com) → Projenizi seçin
2. **Site configuration** → **Environment variables**

#### Adım 2: Variables Ekleyin

1. **Add a variable** butonuna tıklayın
2. **Key**: `VITE_SUPABASE_URL`
3. **Value**: `https://zygnerqztiaegyqzlkix.supabase.co`
4. **Scopes**: 
   - ✅ **Production** (mutlaka)
   - ✅ **Deploy previews** (opsiyonel)
5. **Add variable** butonuna tıklayın

Aynı şekilde ikinci değişkeni ekleyin:
- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: (tam key'inizi yapıştırın)
- **Scopes**: ✅ Production, ✅ Deploy previews

#### Adım 3: Deploy Edin

Variables ekledikten sonra:
1. **Deploys** sekmesine gidin
2. **Trigger deploy** → **Deploy site**
3. Veya yeni bir commit push edin

---

### 3️⃣ Diğer Platformlar

#### Railway, Render, Fly.io, vs.

Genellikle benzer şekilde çalışır:
1. Dashboard → **Settings** → **Environment Variables**
2. Her değişkeni ekleyin
3. Deploy edin

---

## ✅ Kontrol Listesi

### Local Development
- [x] `.env` dosyası var
- [x] `.env` dosyası `.gitignore`'da
- [ ] `.env` dosyası Git'te yok (kontrol edin: `git ls-files | grep .env`)

### Production (Vercel/Netlify)
- [ ] `VITE_SUPABASE_URL` eklendi
- [ ] `VITE_SUPABASE_ANON_KEY` eklendi
- [ ] Production environment seçildi
- [ ] Deploy edildi ve test edildi

---

## 🧪 Test Etme

### Local'de Test

```bash
# .env dosyasının okunduğunu kontrol edin
npm run dev
```

Console'da şunu görmelisiniz:
```
✅ Supabase bağlantısı başarılı!
```

### Production'da Test

1. Siteyi açın
2. Browser console'u açın (F12)
3. Şunu görmelisiniz:
   ```
   ✅ Supabase bağlantısı başarılı!
   ```

Eğer hata görüyorsanız:
- Environment variables doğru eklenmiş mi kontrol edin
- Deploy'u yeniden yapın
- Browser cache'i temizleyin

---

## 🔒 Güvenlik Notları

### ✅ YAPILMASI GEREKENLER

1. **`.env` dosyasını Git'e commit etmeyin**
   - `.gitignore`'da olduğundan emin olun
   - Eğer yanlışlıkla commit ettiyseniz, hemen kaldırın

2. **Production'da environment variables kullanın**
   - `.env` dosyasını production sunucusuna yüklemeyin
   - Platform'un kendi environment variables sistemini kullanın

3. **API key'leri paylaşmayın**
   - `.env` dosyasını kimseyle paylaşmayın
   - Screenshot'larda key'leri gizleyin

### ❌ YAPILMAMASI GEREKENLER

1. ❌ `.env` dosyasını Git'e commit etmek
2. ❌ API key'leri kod içinde hardcode etmek
3. ❌ `.env` dosyasını public repository'de paylaşmak
4. ❌ Production'da `.env` dosyasını manuel olarak yüklemek

---

## 🆘 Sorun Giderme

### Problem: Production'da Supabase bağlantısı çalışmıyor

**Çözüm:**
1. Environment variables doğru eklenmiş mi kontrol edin
2. Variable isimleri tam olarak `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` olmalı
3. Deploy'u yeniden yapın
4. Browser console'da hata mesajlarını kontrol edin

### Problem: `.env` dosyası Git'te görünüyor

**Çözüm:**
```bash
# Git tracking'den kaldırın
git rm --cached .env

# Commit edin
git commit -m "Remove .env from Git"

# Push edin
git push
```

### Problem: Local'de environment variables çalışmıyor

**Çözüm:**
1. `.env` dosyası proje root'unda mı? (package.json ile aynı seviyede)
2. Dosya adı tam olarak `.env` mi? (`.env.local` değil)
3. Değişken isimleri `VITE_` ile başlıyor mu?
4. Development server'ı yeniden başlatın (`npm run dev`)

---

## 📚 Ek Kaynaklar

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

---

## ✅ Özet

1. **Local'de**: `.env` dosyası kullanıyorsunuz ✅ (Zaten yapılmış)
2. **Production'da**: Platform'un environment variables sistemini kullanacaksınız
3. **Kontrol**: `.env` dosyası Git'te olmamalı ✅ (`.gitignore`'da)

**Sonraki adım**: Hangi platform kullanacaksınız? (Vercel, Netlify, vs.) O platform için yukarıdaki adımları uygulayın!



