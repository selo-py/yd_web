-- Admin Authentication Helper Functions
-- Bu dosyayı Supabase SQL Editor'de çalıştırın
-- Custom authentication sistemi için RLS politikalarında kullanılacak

-- 1. Admin kullanıcı kontrolü için function
-- Bu function, request header'dan gelen admin bilgisini kontrol eder
CREATE OR REPLACE FUNCTION is_admin_user(username_param TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.username = username_param 
    AND admin_users.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Editor kullanıcı kontrolü için function
CREATE OR REPLACE FUNCTION is_editor_user(username_param TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.username = username_param 
    AND (admin_users.role = 'editor' OR admin_users.role = 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Kullanıcı kontrolü için function (admin veya editor)
CREATE OR REPLACE FUNCTION is_authenticated_user(username_param TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.username = username_param
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- NOT: Bu fonksiyonlar şu anki custom authentication sistemiyle çalışmaz
-- Çünkü Supabase RLS politikaları request header'larına doğrudan erişemez
-- Bu yüzden alternatif bir yaklaşım kullanacağız (aşağıdaki dosyaya bakın)

