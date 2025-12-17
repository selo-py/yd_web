# Supabase Auth Kod Güncellemeleri 🔄

## Yapılacak Değişiklikler

### 1. AdminLogin.jsx - Email/Password ile Giriş

**Değişiklik:**
- `username` yerine `email` kullanılacak
- `authManager.js` yerine `authManagerSupabase.js` kullanılacak

### 2. authManager.js → authManagerSupabase.js

**Yeni dosya:** `authManagerSupabase.js` oluşturuldu
- Supabase Auth kullanıyor
- JWT token tabanlı
- Otomatik session yönetimi

### 3. Tüm Admin Sayfaları

**Değişiklik:**
- `authManager.js` → `authManagerSupabase.js`
- `isAdminAuthenticated()` → `await isAdminAuthenticated()` (async)
- `getAdminUser()` → `await getAdminUser()` (async)
- `isAdmin()` → `await isAdmin()` (async)
- `isEditor()` → `await isEditor()` (async)

### 4. dataManager.js

**Değişiklik:**
- Admin kontrolleri async olacak
- `isAdmin()` → `await isAdmin()`
- `isEditor()` → `await isEditor()`

## ⚠️ ÖNEMLİ: Geçiş Yapmadan Önce

1. ✅ Supabase Auth'u aktif edin
2. ✅ Admin ve Editor kullanıcıları oluşturun
3. ✅ RLS politikalarını uygulayın (`supabase-rls-policies-auth.sql`)
4. ✅ Test edin

## 🔄 Geçiş Adımları

### Adım 1: AdminLogin.jsx Güncelle

```jsx
// Eski: username kullanıyordu
// Yeni: email kullanacak
```

### Adım 2: authManager.js'yi Yedekle

```bash
# Eski dosyayı yedekle (geri dönüş için)
cp src/utils/authManager.js src/utils/authManager.backup.js
```

### Adım 3: authManager.js'yi Güncelle

`authManager.js` dosyasını `authManagerSupabase.js` içeriğiyle değiştir.

### Adım 4: Tüm Admin Sayfalarını Güncelle

Tüm `isAdminAuthenticated()`, `getAdminUser()`, `isAdmin()`, `isEditor()` çağrılarını async yap.

### Adım 5: dataManager.js'yi Güncelle

Admin kontrollerini async yap.

## 🧪 Test

1. Admin email ile giriş yapın
2. İçerik ekleyin/güncelleyin/silin
3. Editor email ile giriş yapın
4. İçerik ekleyin/güncelleyin (silme yapamaz)

## 🔙 Geri Dönüş

Eğer sorun olursa:
1. `authManager.backup.js` → `authManager.js` olarak geri yükleyin
2. Tüm import'ları geri alın
3. Eski sisteme dönün

