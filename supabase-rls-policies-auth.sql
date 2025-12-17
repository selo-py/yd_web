-- Güvenli RLS Politikaları - Supabase Auth için
-- Bu dosyayı Supabase Auth'u aktif ettikten SONRA çalıştırın

-- ÖNEMLİ: Önce Supabase Auth'da admin ve editor kullanıcıları oluşturun
-- User metadata'da role: 'admin' veya role: 'editor' ekleyin

-- ============================================
-- 1. VIDEOS Tablosu için Güvenli RLS
-- ============================================

-- Mevcut politikaları sil
DROP POLICY IF EXISTS "Authenticated insert on videos" ON videos;
DROP POLICY IF EXISTS "Authenticated update on videos" ON videos;
DROP POLICY IF EXISTS "Authenticated delete on videos" ON videos;

-- Admin ve Editor INSERT yapabilir
CREATE POLICY "Admin or editor insert on videos" ON videos
  FOR INSERT WITH CHECK (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

-- Admin ve Editor UPDATE yapabilir
CREATE POLICY "Admin or editor update on videos" ON videos
  FOR UPDATE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

-- Sadece Admin DELETE yapabilir
CREATE POLICY "Admin only delete on videos" ON videos
  FOR DELETE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text = 'admin'
  );

-- ============================================
-- 2. YOUTUBE_VIDEOS Tablosu için Güvenli RLS
-- ============================================

DROP POLICY IF EXISTS "Authenticated insert on youtube_videos" ON youtube_videos;
DROP POLICY IF EXISTS "Authenticated update on youtube_videos" ON youtube_videos;
DROP POLICY IF EXISTS "Authenticated delete on youtube_videos" ON youtube_videos;

CREATE POLICY "Admin or editor insert on youtube_videos" ON youtube_videos
  FOR INSERT WITH CHECK (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on youtube_videos" ON youtube_videos
  FOR UPDATE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on youtube_videos" ON youtube_videos
  FOR DELETE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text = 'admin'
  );

-- ============================================
-- 3. FAILURES Tablosu için Güvenli RLS
-- ============================================

DROP POLICY IF EXISTS "Authenticated insert on failures" ON failures;
DROP POLICY IF EXISTS "Authenticated update on failures" ON failures;
DROP POLICY IF EXISTS "Authenticated delete on failures" ON failures;

CREATE POLICY "Admin or editor insert on failures" ON failures
  FOR INSERT WITH CHECK (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on failures" ON failures
  FOR UPDATE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on failures" ON failures
  FOR DELETE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text = 'admin'
  );

-- ============================================
-- 4. NEWS Tablosu için Güvenli RLS
-- ============================================

DROP POLICY IF EXISTS "Authenticated insert on news" ON news;
DROP POLICY IF EXISTS "Authenticated update on news" ON news;
DROP POLICY IF EXISTS "Authenticated delete on news" ON news;

CREATE POLICY "Admin or editor insert on news" ON news
  FOR INSERT WITH CHECK (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on news" ON news
  FOR UPDATE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on news" ON news
  FOR DELETE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text = 'admin'
  );

-- ============================================
-- 5. FINANS Tablosu için Güvenli RLS
-- ============================================

DROP POLICY IF EXISTS "Authenticated insert on finans" ON finans;
DROP POLICY IF EXISTS "Authenticated update on finans" ON finans;
DROP POLICY IF EXISTS "Authenticated delete on finans" ON finans;

CREATE POLICY "Admin or editor insert on finans" ON finans
  FOR INSERT WITH CHECK (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on finans" ON finans
  FOR UPDATE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on finans" ON finans
  FOR DELETE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text = 'admin'
  );

-- ============================================
-- 6. HOME_CONTENT Tablosu için Güvenli RLS
-- ============================================

DROP POLICY IF EXISTS "Authenticated insert on home_content" ON home_content;
DROP POLICY IF EXISTS "Authenticated update on home_content" ON home_content;
DROP POLICY IF EXISTS "Authenticated delete on home_content" ON home_content;

CREATE POLICY "Admin or editor insert on home_content" ON home_content
  FOR INSERT WITH CHECK (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin or editor update on home_content" ON home_content
  FOR UPDATE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text IN ('admin', 'editor')
  );

CREATE POLICY "Admin only delete on home_content" ON home_content
  FOR DELETE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text = 'admin'
  );

-- ============================================
-- 7. NEWSLETTER_SUBSCRIBERS Tablosu için Güvenli RLS
-- ============================================

-- Public insert zaten var, sadece delete'i güncelleyelim
DROP POLICY IF EXISTS "Authenticated delete on newsletter_subscribers" ON newsletter_subscribers;

CREATE POLICY "Admin only delete on newsletter_subscribers" ON newsletter_subscribers
  FOR DELETE USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text = 'admin'
  );

-- ============================================
-- 8. ADMIN_USERS Tablosu için Güvenli RLS
-- ============================================

DROP POLICY IF EXISTS "Authenticated read on admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated insert on admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated update on admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated delete on admin_users" ON admin_users;

-- Sadece admin okuyabilir (opsiyonel - artık kullanılmayabilir)
CREATE POLICY "Admin only read on admin_users" ON admin_users
  FOR SELECT USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role')::text = 'admin'
  );

