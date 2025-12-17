# Supabase Kurulum Rehberi

## Adım 4: Veritabanı Tablolarını Oluşturma

### 4.1. Supabase Dashboard'a Giriş
1. https://supabase.com adresine gidin
2. Projenizi seçin: `zygnerqztiaegyqzlkix`

### 4.2. SQL Editor'ü Açın
1. Sol menüden **SQL Editor** seçeneğine tıklayın
2. **New query** butonuna tıklayın

### 4.3. Tabloları Oluşturun
1. `supabase-schema.sql` dosyasının içeriğini kopyalayın
2. SQL Editor'e yapıştırın
3. **Run** butonuna tıklayın (veya Ctrl+Enter)
4. Başarılı mesajını bekleyin

### 4.4. Row Level Security (RLS) Politikalarını Ekleyin
1. Yeni bir query oluşturun
2. `supabase-rls-policies.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'e yapıştırın
4. **Run** butonuna tıklayın

### 4.5. Tabloları Kontrol Edin
1. Sol menüden **Table Editor** seçeneğine tıklayın
2. Şu tabloları görmelisiniz:
   - ✅ videos
   - ✅ youtube_videos
   - ✅ failures
   - ✅ news
   - ✅ finans
   - ✅ home_content
   - ✅ newsletter_subscribers
   - ✅ admin_users

### 4.6. İlk Home Content Kaydını Oluşturun
Home content tablosuna bir başlangıç kaydı ekleyin:

```sql
INSERT INTO home_content (vitrin1, vitrin2, vitrin3, son_icerikler)
VALUES (NULL, NULL, NULL, '[]'::jsonb);
```

## Sonraki Adımlar
- Adım 5: dataManager.js dosyasını Supabase kullanacak şekilde güncelleme
- Adım 6: Authentication entegrasyonu
- Adım 7: Storage (dosya yükleme) yapılandırması







