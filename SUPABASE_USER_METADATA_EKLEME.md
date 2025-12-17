# Supabase User Metadata Ekleme Rehberi 📝

## Problem

Supabase Dashboard'da "Add user" formunda **User Metadata** alanı görünmüyor.

## Çözüm: İki Adımlı Yöntem

### Adım 1: Kullanıcıları Dashboard'dan Oluşturun

1. **Supabase Dashboard > Authentication > Users**
2. **Add user** butonuna tıklayın
3. Şu bilgileri girin:
   - **Email**: admin@ydinovasyon.com
   - **Password**: Güçlü bir şifre
   - **Auto Confirm User**: ✅ İşaretleyin
4. **Create user** butonuna tıklayın

5. **Editor kullanıcı için tekrarlayın:**
   - Email: editor@ydinovasyon.com
   - Password: Güçlü bir şifre
   - Auto Confirm User: ✅

### Adım 2: User Metadata'yı SQL ile Ekleyin

1. **Supabase Dashboard > SQL Editor**'e gidin
2. Şu SQL'i çalıştırın (email adreslerini kendi oluşturduğunuz email'lerle değiştirin):

```sql
-- Admin kullanıcı için metadata ekle
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'role', 'admin',
  'username', 'admin'
)
WHERE email = 'admin@ydinovasyon.com';

-- Editor kullanıcı için metadata ekle
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'role', 'editor',
  'username', 'editor'
)
WHERE email = 'editor@ydinovasyon.com';
```

3. **Kontrol edin:**
```sql
-- Kullanıcıları ve metadata'larını görmek için:
SELECT id, email, raw_user_meta_data, created_at
FROM auth.users
ORDER BY created_at DESC;
```

## ✅ Doğrulama

Metadata'nın eklendiğini kontrol etmek için:

1. **Supabase Dashboard > Authentication > Users**
2. Oluşturduğunuz kullanıcıya tıklayın
3. **Raw User Meta Data** bölümünde şunu görmelisiniz:
   ```json
   {
     "role": "admin",
     "username": "admin"
   }
   ```

## 🔄 Alternatif: Management API (İleri Seviye)

Eğer programatik olarak kullanıcı oluşturmak isterseniz, Supabase Management API kullanabilirsiniz, ancak bu daha karmaşıktır ve API key gerektirir.

## 📝 Notlar

- User Metadata, RLS politikalarında `auth.jwt() ->> 'user_metadata' ->> 'role'` ile kontrol edilir
- Metadata eklenmeden kullanıcılar admin paneline giriş yapamaz
- Metadata'yı sonradan güncelleyebilirsiniz

