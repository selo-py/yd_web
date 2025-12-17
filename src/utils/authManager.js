// Admin Authentication Manager
// Supabase kullanarak güvenli admin authentication

import { supabase } from '../lib/supabase.js'

// Basit hash fonksiyonu (client-side için - production'da server-side hash kullanılmalı)
// NOT: Bu sadece temel güvenlik için. Production'da Supabase Auth veya serverless function kullanın.
async function hashPassword(password) {
  // Web Crypto API kullanarak basit hash
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

// Admin kullanıcı girişi
export async function loginAdmin(username, password) {
  try {
    // Şifreyi hash'le
    const passwordHash = await hashPassword(password)

    // Supabase'den kullanıcıyı bul
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, username, role, password_hash')
      .eq('username', username)
      .single()

    if (error || !data) {
      console.error('Login error:', error)
      return { success: false, message: 'Kullanıcı adı veya şifre hatalı!' }
    }

    // Şifre hash'ini karşılaştır
    if (data.password_hash !== passwordHash) {
      return { success: false, message: 'Kullanıcı adı veya şifre hatalı!' }
    }

    // Başarılı - session'a kaydet (şifre hash'i kaydetme)
    const sessionData = {
      authenticated: true,
      username: data.username,
      role: data.role || 'admin',
      userId: data.id,
      timestamp: Date.now()
    }

    sessionStorage.setItem('adminSession', JSON.stringify(sessionData))
    
    return { 
      success: true, 
      user: {
        username: data.username,
        role: data.role || 'admin',
        id: data.id
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'Giriş sırasında bir hata oluştu!' }
  }
}

// Admin kullanıcı çıkışı
export function logoutAdmin() {
  sessionStorage.removeItem('adminSession')
}

// Admin authentication kontrolü
export function isAdminAuthenticated() {
  try {
    const sessionData = sessionStorage.getItem('adminSession')
    if (!sessionData) return false

    const session = JSON.parse(sessionData)
    
    // Session timeout kontrolü (24 saat)
    const SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 saat
    if (Date.now() - session.timestamp > SESSION_TIMEOUT) {
      logoutAdmin()
      return false
    }

    return session.authenticated === true
  } catch (error) {
    return false
  }
}

// Admin kullanıcı bilgilerini al
export function getAdminUser() {
  try {
    const sessionData = sessionStorage.getItem('adminSession')
    if (!sessionData) return null

    const session = JSON.parse(sessionData)
    
    // Session timeout kontrolü
    const SESSION_TIMEOUT = 24 * 60 * 60 * 1000
    if (Date.now() - session.timestamp > SESSION_TIMEOUT) {
      logoutAdmin()
      return null
    }

    return {
      username: session.username,
      role: session.role,
      userId: session.userId
    }
  } catch (error) {
    return null
  }
}

// Admin rolü kontrolü
export function isAdmin() {
  const user = getAdminUser()
  return user && user.role === 'admin'
}

// Editor rolü kontrolü
export function isEditor() {
  const user = getAdminUser()
  return user && user.role === 'editor'
}

// Şifre hash'leme (yeni admin kullanıcı eklemek için)
export async function hashPasswordForStorage(password) {
  return await hashPassword(password)
}

