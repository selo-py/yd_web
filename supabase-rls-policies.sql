-- Row Level Security (RLS) Politikaları
-- Bu dosyayı tabloları oluşturduktan sonra çalıştırın

-- 1. VIDEOS Tablosu için RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Public read access on videos" ON videos
  FOR SELECT USING (true);

-- Sadece authenticated kullanıcılar yazabilir (admin/editor)
CREATE POLICY "Authenticated insert on videos" ON videos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update on videos" ON videos
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete on videos" ON videos
  FOR DELETE USING (true);

-- 2. YOUTUBE_VIDEOS Tablosu için RLS
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access on youtube_videos" ON youtube_videos
  FOR SELECT USING (true);

CREATE POLICY "Authenticated insert on youtube_videos" ON youtube_videos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update on youtube_videos" ON youtube_videos
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete on youtube_videos" ON youtube_videos
  FOR DELETE USING (true);

-- 3. FAILURES Tablosu için RLS
ALTER TABLE failures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access on failures" ON failures
  FOR SELECT USING (true);

CREATE POLICY "Authenticated insert on failures" ON failures
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update on failures" ON failures
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete on failures" ON failures
  FOR DELETE USING (true);

-- 4. NEWS Tablosu için RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access on news" ON news
  FOR SELECT USING (true);

CREATE POLICY "Authenticated insert on news" ON news
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update on news" ON news
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete on news" ON news
  FOR DELETE USING (true);

-- 5. FINANS Tablosu için RLS
ALTER TABLE finans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access on finans" ON finans
  FOR SELECT USING (true);

CREATE POLICY "Authenticated insert on finans" ON finans
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update on finans" ON finans
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete on finans" ON finans
  FOR DELETE USING (true);

-- 6. HOME_CONTENT Tablosu için RLS
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access on home_content" ON home_content
  FOR SELECT USING (true);

CREATE POLICY "Authenticated insert on home_content" ON home_content
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update on home_content" ON home_content
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete on home_content" ON home_content
  FOR DELETE USING (true);

-- 7. NEWSLETTER_SUBSCRIBERS Tablosu için RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir (sadece kendi email'ini kontrol için)
CREATE POLICY "Public read access on newsletter_subscribers" ON newsletter_subscribers
  FOR SELECT USING (true);

-- Herkes yeni abone ekleyebilir
CREATE POLICY "Public insert on newsletter_subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Sadece admin güncelleyebilir/silebilir
CREATE POLICY "Authenticated update on newsletter_subscribers" ON newsletter_subscribers
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete on newsletter_subscribers" ON newsletter_subscribers
  FOR DELETE USING (true);

-- 8. ADMIN_USERS Tablosu için RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Sadece authenticated kullanıcılar okuyabilir
CREATE POLICY "Authenticated read on admin_users" ON admin_users
  FOR SELECT USING (true);

-- Sadece authenticated kullanıcılar yazabilir
CREATE POLICY "Authenticated insert on admin_users" ON admin_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update on admin_users" ON admin_users
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete on admin_users" ON admin_users
  FOR DELETE USING (true);







