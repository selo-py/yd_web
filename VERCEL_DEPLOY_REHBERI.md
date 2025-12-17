# Vercel Deployment Rehberi 🚀

## 📋 İçindekiler

1. [Vercel'e Kayıt Olma](#1-vercele-kayıt-olma)
2. [Projeyi Hazırlama](#2-projeyi-hazırlama)
3. [Vercel'e Deploy Etme](#3-vercele-deploy-etme)
4. [Environment Variables Ayarlama](#4-environment-variables-ayarlama)
5. [Domain Bağlama (Opsiyonel)](#5-domain-bağlama-opsiyonel)
6. [Test Etme](#6-test-etme)

---

## 1. Vercel'e Kayıt Olma

### Adım 1: Vercel Hesabı Oluşturma

1. [vercel.com](https://vercel.com) adresine gidin
2. Sağ üst köşedeki **Sign Up** butonuna tıklayın
3. **GitHub ile giriş yapmanızı öneririm** (en kolay yol):
   - **Continue with GitHub** butonuna tıklayın
   - GitHub hesabınızla giriş yapın
   - Vercel'e izin verin

**Alternatif:** Email ile de kayıt olabilirsiniz, ama GitHub ile bağlamak daha pratik.

### Adım 2: İlk Giriş

- Vercel'e giriş yaptıktan sonra **Dashboard**'a yönlendirileceksiniz
- İlk kez giriş yapıyorsanız, hoş geldiniz ekranını göreceksiniz

---

## 2. Projeyi Hazırlama

### Adım 1: Git Repository Oluşturma

Vercel, projenizi Git repository'den deploy eder. İki seçeneğiniz var:

#### Seçenek A: GitHub Repository (Önerilen)

1. **GitHub'da yeni bir repository oluşturun:**
   - [github.com/new](https://github.com/new)
   - Repository adı: `ydweb` (veya istediğiniz bir isim)
   - **Public** veya **Private** seçin
   - **Initialize this repository with a README** seçmeyin
   - **Create repository** butonuna tıklayın

2. **Projenizi GitHub'a push edin:**

```bash
# Proje klasörünüze gidin (zaten oradasınız)
cd /Users/ahmetselimgul/Desktop/ydweb

# Git repository başlatın (eğer yoksa)
git init

# .gitignore kontrolü (zaten var, güvenli)
# .env dosyası Git'e eklenmeyecek

# Tüm dosyaları ekleyin
git add .

# İlk commit
git commit -m "Initial commit"

# GitHub repository'nizi remote olarak ekleyin
# (YUKARIDAKI ADIMDA OLUŞTURDUĞUNUZ REPO URL'İNİ KULLANIN)
git remote add origin https://github.com/KULLANICI_ADINIZ/ydweb.git

# Push edin
git branch -M main
git push -u origin main
```

**Not:** `KULLANICI_ADINIZ` yerine GitHub kullanıcı adınızı yazın.

#### Seçenek B: Vercel CLI ile Direkt Deploy (Hızlı Test)

GitHub kullanmak istemiyorsanız, Vercel CLI ile direkt deploy edebilirsiniz (ama production için GitHub önerilir).

---

## 3. Vercel'e Deploy Etme

### Yöntem 1: GitHub ile Deploy (Önerilen)

1. **Vercel Dashboard'a gidin:**
   - [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Add New Project** butonuna tıklayın

3. **GitHub repository'nizi seçin:**
   - GitHub hesabınızı bağlamanız istenebilir (izin verin)
   - `ydweb` repository'nizi bulun ve **Import** butonuna tıklayın

4. **Project Settings:**
   - **Project Name**: `ydweb` (veya istediğiniz isim)
   - **Framework Preset**: **Vite** (otomatik algılanmalı)
   - **Root Directory**: `./` (boş bırakın)
   - **Build Command**: `npm run build` (otomatik)
   - **Output Directory**: `dist` (otomatik)
   - **Install Command**: `npm install` (otomatik)

5. **Environment Variables (ŞİMDİLİK ATLAYIN):**
   - Bu adımı şimdilik atlayın, sonra ekleyeceğiz
   - **Deploy** butonuna tıklayın

6. **Deploy başlar:**
   - Vercel otomatik olarak build edecek
   - 1-2 dakika sürebilir
   - Başarılı olursa yeşil bir ekran göreceksiniz

7. **İlk deploy tamamlandı!**
   - Size bir URL verilecek: `https://ydweb-xxxxx.vercel.app`
   - Bu URL'yi açın ve siteyi görün

### Yöntem 2: Vercel CLI ile Deploy

```bash
# Vercel CLI'ı global olarak yükleyin
npm install -g vercel

# Proje klasörünüze gidin
cd /Users/ahmetselimgul/Desktop/ydweb

# Vercel'e login olun
vercel login

# Deploy edin
vercel

# İlk deploy'da sorular soracak:
# - Set up and deploy? Y
# - Which scope? (Hesabınızı seçin)
# - Link to existing project? N
# - Project name? ydweb
# - Directory? ./
# - Override settings? N

# Production'a deploy etmek için:
vercel --prod
```

---

## 4. Environment Variables Ayarlama

### ⚠️ ÖNEMLİ: İlk deploy'dan sonra yapın!

İlk deploy başarılı olduktan sonra, environment variables ekleyin:

### Adım 1: Environment Variables Sayfasına Gidin

1. Vercel Dashboard → Projeniz (`ydweb`)
2. **Settings** sekmesine tıklayın
3. Sol menüden **Environment Variables** seçin

### Adım 2: İlk Variable'ı Ekleyin

1. **Add New** butonuna tıklayın
2. **Key**: `VITE_SUPABASE_URL`
3. **Value**: `https://zygnerqztiaegyqzlkix.supabase.co`
4. **Environment**: 
   - ✅ **Production** (mutlaka işaretleyin)
   - ✅ **Preview** (test için, önerilir)
   - ❌ **Development** (local'de zaten var)
5. **Add** butonuna tıklayın

### Adım 3: İkinci Variable'ı Ekleyin

1. Tekrar **Add New** butonuna tıklayın
2. **Key**: `VITE_SUPABASE_ANON_KEY`
3. **Value**: `.env` dosyanızdan kopyalayın:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z25lcnF6dGlhZWd5cXpsa2l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMDc2MzgsImV4cCI6MjA4MDc4MzYzOH0.nrz2vFdXL3DGb_-VbEUTjvUtk2FTFMPrFwK9Z1g25Jk
   ```
   (Bu sadece örnek, sizin gerçek key'inizi kullanın)
4. **Environment**: 
   - ✅ **Production**
   - ✅ **Preview**
   - ❌ **Development**
5. **Add** butonuna tıklayın

### Adım 4: Deploy'u Yenileyin

Environment variables ekledikten sonra, değişikliklerin aktif olması için deploy'u yenilemeniz gerekir:

1. **Deployments** sekmesine gidin
2. En üstteki (en son) deployment'ı bulun
3. Sağ taraftaki **⋯** (üç nokta) menüsüne tıklayın
4. **Redeploy** seçin
5. **Redeploy** butonuna tıklayın

**Alternatif:** Yeni bir commit push ederseniz otomatik deploy olur.

---

## 5. Domain Bağlama (Opsiyonel)

### Vercel'in Ücretsiz Domain'i

Vercel size otomatik bir domain verir:
- `https://ydweb-xxxxx.vercel.app`
- Bu domain zaten çalışıyor!

### Kendi Domain'inizi Bağlama

Eğer `ydinovasyon.com` gibi kendi domain'inizi kullanmak istiyorsanız:

1. **Settings** → **Domains**
2. Domain'inizi girin: `ydinovasyon.com`
3. Vercel size DNS ayarlarını gösterecek
4. Domain sağlayıcınızda (GoDaddy, Namecheap, vs.) DNS kayıtlarını güncelleyin
5. 24-48 saat içinde aktif olur

---

## 6. Test Etme

### Adım 1: Siteyi Açın

1. Vercel Dashboard → Projeniz → **Deployments**
2. En üstteki deployment'ın yanındaki **Visit** butonuna tıklayın
3. Veya size verilen URL'yi açın: `https://ydweb-xxxxx.vercel.app`

### Adım 2: Console Kontrolü

1. Browser'da siteyi açın
2. **F12** tuşuna basın (Developer Tools)
3. **Console** sekmesine gidin
4. Şunu görmelisiniz:
   ```
   ✅ Supabase bağlantısı başarılı!
   ✅ Supabase bağlantısı doğrulandı!
   ```

### Adım 3: Fonksiyon Testleri

- [ ] Ana sayfa açılıyor mu?
- [ ] İçerikler görüntüleniyor mu?
- [ ] Arama çalışıyor mu?
- [ ] Admin login çalışıyor mu? (`/admin/login`)
- [ ] Instagram Reels embed'leri görünüyor mu?

### Adım 4: Admin Login Test

1. `/admin/login` sayfasına gidin
2. Admin email ve şifre ile giriş yapın
3. Dashboard'a erişebildiğinizi kontrol edin
4. İçerik eklemeyi deneyin

---

## 🔄 Güncelleme Süreci

### Kod Değişikliği Yaptığınızda

1. **Değişiklikleri commit edin:**
   ```bash
   git add .
   git commit -m "Yapılan değişiklikler"
   git push
   ```

2. **Vercel otomatik deploy eder:**
   - GitHub'a push ettiğinizde Vercel otomatik olarak yeni bir deploy başlatır
   - Dashboard'da deploy durumunu görebilirsiniz
   - 1-2 dakika içinde yeni versiyon yayında olur

### Environment Variables Değiştirdiğinizde

1. **Settings** → **Environment Variables** → Değişikliği yapın
2. **Deployments** → En son deployment → **Redeploy**

---

## 🆘 Sorun Giderme

### Problem: Build başarısız oluyor

**Çözüm:**
1. **Deployments** → Başarısız deployment → **View Build Logs**
2. Hata mesajını okuyun
3. Genellikle şu sorunlar olur:
   - Eksik dependency: `package.json` kontrol edin
   - Build command yanlış: Settings → General → Build Command
   - Node version: Settings → General → Node.js Version

### Problem: Supabase bağlantısı çalışmıyor

**Çözüm:**
1. Environment variables doğru eklenmiş mi kontrol edin
2. Variable isimleri tam olarak `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` olmalı
3. Production environment seçili mi kontrol edin
4. Deploy'u yenileyin (Redeploy)
5. Browser console'da hata var mı kontrol edin

### Problem: Site açılmıyor (404)

**Çözüm:**
1. **Deployments** sekmesinde deployment başarılı mı kontrol edin
2. Build log'ları kontrol edin
3. **Settings** → **General** → **Output Directory** = `dist` olmalı

### Problem: GitHub repository bağlanamıyor

**Çözüm:**
1. Vercel Dashboard → **Settings** → **Git**
2. GitHub bağlantısını kontrol edin
3. Gerekirse yeniden bağlayın

---

## ✅ Kontrol Listesi

### Kayıt ve İlk Deploy
- [ ] Vercel hesabı oluşturuldu
- [ ] GitHub repository oluşturuldu
- [ ] Proje GitHub'a push edildi
- [ ] Vercel'de proje import edildi
- [ ] İlk deploy başarılı

### Environment Variables
- [ ] `VITE_SUPABASE_URL` eklendi
- [ ] `VITE_SUPABASE_ANON_KEY` eklendi
- [ ] Production environment seçildi
- [ ] Deploy yenilendi (Redeploy)

### Test
- [ ] Site açılıyor
- [ ] Supabase bağlantısı çalışıyor (console'da ✅ görünüyor)
- [ ] Admin login çalışıyor
- [ ] İçerikler görüntüleniyor
- [ ] Instagram Reels embed'leri çalışıyor

### Domain (Opsiyonel)
- [ ] Kendi domain bağlandı (opsiyonel)
- [ ] SSL sertifikası aktif (otomatik)

---

## 📚 Ek Kaynaklar

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Vite + Vercel](https://vercel.com/guides/deploying-vite)

---

## 🎉 Hazırsınız!

Tüm adımları tamamladıktan sonra siteniz yayında olacak! 

**Sorun olursa:** Bu rehberdeki "Sorun Giderme" bölümüne bakın veya bana sorun.

**Sonraki adımlar:**
1. Supabase CORS ayarlarını yapın (production domain'inizi ekleyin)
2. Production'da admin login'i test edin
3. Siteyi yayınlayın! 🚀



