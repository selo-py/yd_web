# Supabase Son Kontroller ✅

## ✅ Tamamlananlar

1. ✅ Supabase bağlantısı başarılı
2. ✅ .env dosyası oluşturuldu
3. ✅ Database tabloları oluşturulmuş
4. ✅ RLS politikaları hazır

## 🔍 Son Kontroller (Yapmanız Gerekenler)

### 1. Ana Sayfayı Test Edin

1. Ana sayfayı açın: `http://localhost:5173/`
2. Browser console'u açın (F12)
3. Hata var mı kontrol edin
4. İçerikler görünüyor mu kontrol edin

**Beklenen:** Ana sayfa açılmalı, hata olmamalı. Eğer içerik yoksa normal (henüz içerik eklenmemiş olabilir).

### 2. Admin Panelinden İçerik Ekleyin

1. Admin paneline gidin: `http://localhost:5173/admin`
2. Giriş yapın (admin/admin123 veya editor/editor123)
3. Bir içerik ekleyin (ör. Video, Haber, vb.)
4. Başarılı mesajı görüyor musunuz kontrol edin

**Beklenen:** İçerik başarıyla eklenmeli ve Supabase'de görünmeli.

### 3. Supabase Dashboard'da Kontrol Edin

1. Supabase Dashboard'a gidin: https://supabase.com
2. Projenizi seçin
3. **Table Editor** > **videos** (veya eklediğiniz tablo) seçin
4. Yeni eklediğiniz içeriği görüyor musunuz kontrol edin

**Beklenen:** Eklediğiniz içerik Supabase tablosunda görünmeli.

### 4. Ana Sayfada İçeriği Kontrol Edin

1. Ana sayfaya dönün
2. Eklediğiniz içeriğin göründüğünü kontrol edin
3. İçeriğe tıklayıp detay sayfasını açın

**Beklenen:** Eklediğiniz içerik ana sayfada ve ilgili liste sayfasında görünmeli.

### 5. Home Content Tablosunu Kontrol Edin

1. Supabase Dashboard > **Table Editor** > **home_content**
2. Bir kayıt var mı kontrol edin

**Not:** Eğer kayıt yoksa, ana sayfayı açtığınızda otomatik oluşturulacak (kod içinde bu var).

## ⚠️ Olası Sorunlar ve Çözümleri

### "Error fetching ... from Supabase" hatası

**Neden:** RLS politikaları aktif değil veya yanlış yapılandırılmış.

**Çözüm:**
1. Supabase Dashboard > **Authentication** > **Policies**
2. Her tablo için "Public read access" politikasının aktif olduğundan emin olun
3. Eğer yoksa, `supabase-rls-policies.sql` dosyasını SQL Editor'de çalıştırın

### İçerik eklenmiyor

**Neden:** RLS politikaları INSERT'e izin vermiyor.

**Çözüm:**
1. `supabase-rls-policies.sql` dosyasını kontrol edin
2. "Authenticated insert" politikalarının aktif olduğundan emin olun
3. Şu anda RLS politikaları herkese izin veriyor (güvenlik için ileride değiştirilebilir)

### Ana sayfada içerik görünmüyor

**Neden:** 
- Henüz içerik eklenmemiş olabilir
- Home content tablosunda vitrin/son içerikler seçilmemiş olabilir

**Çözüm:**
1. Admin panelinden içerik ekleyin
2. Admin panelinden "Ana Sayfa İçerik Yönetimi"ne gidin
3. Vitrin ve son içerikleri seçin

## 🎉 Başarılı Olursa

Eğer tüm kontroller başarılıysa:

✅ Supabase bağlantısı tamamen çalışıyor!
✅ Veri ekleme/çekme işlemleri çalışıyor!
✅ Admin paneli Supabase ile entegre!

## 📝 Notlar

- `.env` dosyası Git'e commit edilmeyecek (güvenlik için)
- RLS politikaları şu anda herkese açık (production'da değiştirilebilir)
- Admin authentication hala localStorage kullanıyor (ileride Supabase Auth'a geçilebilir)

