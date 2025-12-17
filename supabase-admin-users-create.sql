-- Supabase Auth'da Admin ve Editor Kullanıcıları için Metadata Ekleme
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştırın

-- ============================================
-- ÖNEMLİ: ÖNCE KULLANICILARI OLUŞTURUN!
-- ============================================
-- 1. Supabase Dashboard > Authentication > Users > Add user
-- 2. Admin kullanıcı oluşturun: admin@ydinovasyon.com
-- 3. Editor kullanıcı oluşturun: editor@ydinovasyon.com
-- 4. Sonra bu SQL'i çalıştırın

-- ============================================
-- METADATA EKLEME
-- ============================================

-- Admin kullanıcı için metadata ekle
-- ⚠️ EMAIL ADRESİNİ KENDİ OLUŞTURDUĞUNUZ EMAIL İLE DEĞİŞTİRİN!
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'role', 'admin',
  'username', 'admin'
)
WHERE email = 'admin@ydinovasyon.com';

-- Editor kullanıcı için metadata ekle
-- ⚠️ EMAIL ADRESİNİ KENDİ OLUŞTURDUĞUNUZ EMAIL İLE DEĞİŞTİRİN!
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'role', 'editor',
  'username', 'editor'
)
WHERE email = 'editor@ydinovasyon.com';

-- ============================================
-- KONTROL: Metadata Eklendi mi?
-- ============================================

-- Kullanıcıları ve metadata'larını görmek için:
SELECT 
  id, 
  email, 
  raw_user_meta_data, 
  created_at
FROM auth.users
WHERE email IN ('admin@ydinovasyon.com', 'editor@ydinovasyon.com')
ORDER BY created_at DESC;

-- Metadata doğru eklenmişse şunu görmelisiniz:
-- admin@ydinovasyon.com -> {"role": "admin", "username": "admin"}
-- editor@ydinovasyon.com -> {"role": "editor", "username": "editor"}

