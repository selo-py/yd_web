# Admin Kullanıcı Oluşturma Rehberi

## Önemli Güvenlik Notu

Bu sistem client-side hash kullanıyor. Production için **Supabase Auth** veya **serverless function** kullanmanız önerilir.

## İlk Admin Kullanıcı Oluşturma

### Yöntem 1: SQL ile (Önerilen)

1. Supabase Dashboard > **SQL Editor**'e gidin
2. Şu SQL'i çalıştırın (şifreyi değiştirin):

```sql
-- Admin kullanıcı oluştur
-- Şifre: admin123 (SHA-256 hash: 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9)
INSERT INTO admin_users (username, password_hash, role)
VALUES (
  'admin',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
  'admin'
);

-- Editor kullanıcı oluştur
-- Şifre: editor123 (SHA-256 hash: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918)
INSERT INTO admin_users (username, password_hash, role)
VALUES (
  'editor',
  '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  'editor'
);
```

### Yöntem 2: Browser Console ile

1. Browser console'u açın (F12)
2. Şu kodu çalıştırın:

```javascript
// Şifre hash'leme
async function createAdminUser() {
  const encoder = new TextEncoder()
  const password = 'admin123' // Değiştirin
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  console.log('Password hash:', hashHex)
  
  // Supabase'e ekle
  const { supabase } = await import('/src/lib/supabase.js')
  const { data, error } = await supabase
    .from('admin_users')
    .insert([{
      username: 'admin',
      password_hash: hashHex,
      role: 'admin'
    }])
  
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Success:', data)
  }
}

createAdminUser()
```

## Şifre Hash Hesaplama

Farklı şifreler için hash hesaplamak için:

1. Browser console'da:
```javascript
async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

hashPassword('your-password').then(hash => console.log('Hash:', hash))
```

2. Veya online tool kullanın: https://emn178.github.io/online-tools/sha256.html

## Güvenlik Önerileri

1. **Güçlü şifreler kullanın**: En az 12 karakter, büyük/küçük harf, rakam, özel karakter
2. **Her kullanıcı için farklı şifre**: Aynı şifreyi birden fazla kullanıcıda kullanmayın
3. **Düzenli şifre değişimi**: 3-6 ayda bir şifreleri değiştirin
4. **Production'da Supabase Auth kullanın**: Daha güvenli authentication için

## Şifre Değiştirme

```sql
-- Kullanıcı şifresini değiştir
UPDATE admin_users
SET password_hash = 'yeni-hash-buraya'
WHERE username = 'admin';
```

## Kullanıcı Silme

```sql
-- Kullanıcı sil
DELETE FROM admin_users
WHERE username = 'kullanici-adi';
```

