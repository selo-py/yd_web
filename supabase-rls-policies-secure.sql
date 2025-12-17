-- Güvenli RLS Politikaları (Production için)
-- Bu dosyayı mevcut RLS politikalarını güncellemek için kullanın
-- ÖNEMLİ: Bu politikalar admin authentication sisteminizle uyumlu çalışmayabilir
-- Supabase Auth kullanıyorsanız bu politikaları kullanın

-- Önce mevcut politikaları sil (opsiyonel - dikkatli olun!)
-- DROP POLICY IF EXISTS "Authenticated insert on videos" ON videos;
-- DROP POLICY IF EXISTS "Authenticated update on videos" ON videos;
-- DROP POLICY IF EXISTS "Authenticated delete on videos" ON videos;

-- 1. VIDEOS Tablosu için Güvenli RLS
-- Herkes okuyabilir (zaten var)
-- CREATE POLICY "Public read access on videos" ON videos FOR SELECT USING (true);

-- Sadece admin kullanıcılar yazabilir (Supabase Auth kullanıyorsanız)
-- CREATE POLICY "Admin only insert on videos" ON videos
--   FOR INSERT WITH CHECK (
--     EXISTS (
--       SELECT 1 FROM admin_users 
--       WHERE id::text = current_setting('request.jwt.claims', true)::json->>'sub'
--     )
--   );

-- NOT: Şu anki sistemde admin_users tablosu custom authentication kullanıyor
-- Bu yüzden RLS politikaları şimdilik herkese açık bırakıldı
-- Production'da Supabase Auth'a geçtiğinizde bu politikaları aktif edin

-- 2. ADMIN_USERS Tablosu için Güvenli RLS
-- Sadece kendi kaydını okuyabilir (Supabase Auth kullanıyorsanız)
-- CREATE POLICY "Users can read own record" ON admin_users
--   FOR SELECT USING (
--     id::text = current_setting('request.jwt.claims', true)::json->>'sub'
--   );

-- Sadece admin rolündeki kullanıcılar yeni admin ekleyebilir
-- CREATE POLICY "Admin only insert on admin_users" ON admin_users
--   FOR INSERT WITH CHECK (
--     EXISTS (
--       SELECT 1 FROM admin_users 
--       WHERE id::text = current_setting('request.jwt.claims', true)::json->>'sub'
--       AND role = 'admin'
--     )
--   );

-- NOT: Bu politikalar şu anki custom authentication sistemiyle çalışmaz
-- Supabase Auth'a geçtiğinizde aktif edin

