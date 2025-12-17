// Supabase Auth Manager
// Supabase Auth kullanarak güvenli admin authentication

import { supabase } from '../lib/supabase.js'

// Admin kullanıcı girişi (Email/Password)
export async function loginAdmin(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    })

    if (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.message === 'Invalid login credentials' 
          ? 'E-posta veya şifre hatalı!' 
          : 'Giriş sırasında bir hata oluştu!' 
      }
    }

    // Kullanıcı rolünü kontrol et
    const userRole = data.user?.user_metadata?.role
    if (!userRole || (userRole !== 'admin' && userRole !== 'editor')) {
      // Admin/Editor değilse çıkış yap
      await supabase.auth.signOut()
      return { 
        success: false, 
        message: 'Bu hesap admin paneline erişim yetkisine sahip değil!' 
      }
    }

    return { 
      success: true, 
      user: {
        id: data.user.id,
        email: data.user.email,
        role: userRole,
        username: data.user.user_metadata?.username || email.split('@')[0]
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'Giriş sırasında bir hata oluştu!' }
  }
}

// Admin kullanıcı çıkışı
export async function logoutAdmin() {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Admin authentication kontrolü
export async function isAdminAuthenticated() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session || !session.user) return false

    // Rol kontrolü
    const userRole = session.user.user_metadata?.role
    return userRole === 'admin' || userRole === 'editor'
  } catch (error) {
    return false
  }
}

// Admin kullanıcı bilgilerini al
export async function getAdminUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session || !session.user) return null

    const userRole = session.user.user_metadata?.role
    if (userRole !== 'admin' && userRole !== 'editor') return null

    return {
      id: session.user.id,
      email: session.user.email,
      role: userRole,
      username: session.user.user_metadata?.username || session.user.email?.split('@')[0]
    }
  } catch (error) {
    return null
  }
}

// Admin rolü kontrolü
export async function isAdmin() {
  const user = await getAdminUser()
  return user && user.role === 'admin'
}

// Editor rolü kontrolü
export async function isEditor() {
  const user = await getAdminUser()
  return user && user.role === 'editor'
}

// Session refresh (token yenileme)
export async function refreshSession() {
  try {
    const { data, error } = await supabase.auth.refreshSession()
    if (error) {
      console.error('Session refresh error:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Session refresh error:', error)
    return false
  }
}

// Auth state değişikliklerini dinle
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      callback(null)
    } else {
      const userRole = session.user?.user_metadata?.role
      if (userRole === 'admin' || userRole === 'editor') {
        callback({
          id: session.user.id,
          email: session.user.email,
          role: userRole,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0]
        })
      } else {
        callback(null)
      }
    }
  })
}

