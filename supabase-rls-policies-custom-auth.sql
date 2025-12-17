-- Güvenli RLS Politikaları - Custom Authentication için
-- Bu dosyayı mevcut RLS politikalarını güncellemek için kullanın
-- NOT: Custom authentication kullandığımız için, RLS politikaları client-side kontrolüne bağlı
-- Daha güvenli bir çözüm için Supabase Auth'a geçiş yapmanız önerilir

-- ÖNEMLİ: Bu politikalar şu anki custom authentication sistemiyle tam güvenli değil
-- Çünkü Supabase RLS, client-side'dan gelen bilgilere güvenemez
-- Bu yüzden client-side'da da kontrol yapıyoruz

-- ============================================
-- 1. VIDEOS Tablosu için Güvenli RLS
-- ============================================

-- Mevcut politikaları sil (opsiyonel - dikkatli olun!)
DROP POLICY IF EXISTS "Authenticated insert on videos" ON videos;
DROP POLICY IF EXISTS "Authenticated update on videos" ON videos;
DROP POLICY IF EXISTS "Authenticated delete on videos" ON videos;

-- Herkes okuyabilir (zaten var, değiştirmiyoruz)
-- CREATE POLICY "Public read access on videos" ON videos FOR SELECT USING (true);

-- NOT: Custom authentication için RLS politikaları sınırlı
-- Client-side'da admin kontrolü yapıyoruz
-- Bu politikalar sadece ekstra bir güvenlik katmanı

-- Şimdilik herkese açık bırakıyoruz (client-side kontrolü var)
-- Supabase Auth'a geçtiğinizde aşağıdaki politikaları kullanın:

/*
-- Sadece admin kullanıcılar INSERT yapabilir
CREATE POLICY "Admin only insert on videos" ON videos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND role = 'admin'
    )
  );

-- Admin ve editor UPDATE yapabilir
CREATE POLICY "Admin or editor update on videos" ON videos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND (role = 'admin' OR role = 'editor')
    )
  );

-- Sadece admin DELETE yapabilir
CREATE POLICY "Admin only delete on videos" ON videos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND role = 'admin'
    )
  );
*/

-- ============================================
-- ALTERNATİF ÇÖZÜM: Service Role Key ile
-- ============================================
-- Daha güvenli bir yaklaşım: Supabase Edge Functions kullanmak
-- Veya client-side'da admin kontrolü yapıp, sadece authenticated istekleri göndermek

-- ŞU ANKİ ÇÖZÜM:
-- 1. Client-side'da admin kontrolü yapıyoruz (authManager.js)
-- 2. RLS politikaları şimdilik herkese açık (development için OK)
-- 3. Production'da Supabase Auth'a geçiş yapın

-- ============================================
-- ÖNERİLEN: Supabase Auth'a Geçiş
-- ============================================
-- En güvenli çözüm Supabase Auth kullanmaktır:
-- 1. Supabase Dashboard > Authentication > Providers
-- 2. Email/Password provider'ı aktif edin
-- 3. Admin kullanıcıları Supabase Auth'da oluşturun
-- 4. RLS politikalarını auth.uid() ile kontrol edin

