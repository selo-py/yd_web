// Input Validation ve Sanitization Utilities
// XSS, SQL Injection ve diğer güvenlik tehditlerine karşı koruma

/**
 * HTML tag'lerini temizle (XSS koruması)
 */
export function sanitizeHtml(html) {
  if (!html) return ''
  
  // Basit HTML tag temizleme
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}

/**
 * Text input'u temizle (XSS koruması)
 */
export function sanitizeText(text) {
  if (!text) return ''
  
  // HTML tag'leri kaldır
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * URL validation
 */
export function isValidUrl(url) {
  if (!url || url.trim() === '') return false
  
  try {
    const urlObj = new URL(url)
    // Sadece http ve https protokollerine izin ver
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Email validation
 */
export function isValidEmail(email) {
  if (!email || email.trim() === '') return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Instagram URL validation
 */
export function isValidInstagramUrl(url) {
  if (!url || url.trim() === '') return false
  
  try {
    const urlObj = new URL(url)
    return (
      (urlObj.hostname === 'www.instagram.com' || urlObj.hostname === 'instagram.com') &&
      (urlObj.pathname.includes('/reel/') || urlObj.pathname.includes('/p/'))
    )
  } catch {
    return false
  }
}

/**
 * YouTube URL/ID validation
 */
export function isValidYouTubeId(id) {
  if (!id || id.trim() === '') return false
  
  // YouTube ID formatı: 11 karakter, alphanumeric + - ve _
  const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/
  return youtubeIdRegex.test(id.trim())
}

/**
 * Slug validation
 */
export function isValidSlug(slug) {
  if (!slug || slug.trim() === '') return false
  
  // Slug sadece küçük harf, rakam ve tire içerebilir
  const slugRegex = /^[a-z0-9-]+$/
  return slugRegex.test(slug.trim())
}

/**
 * Text length validation
 */
export function validateLength(text, min = 0, max = Infinity) {
  if (!text) return text.length >= min
  
  const length = text.trim().length
  return length >= min && length <= max
}

/**
 * Form data validation helper
 */
export function validateFormData(formData, rules) {
  const errors = {}
  
  for (const [field, rule] of Object.entries(rules)) {
    const value = formData[field]
    
    // Required kontrolü
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${rule.label || field} zorunludur`
      continue
    }
    
    // Boş değerler için diğer kontrolleri atla (opsiyonel alanlar)
    if (!value || value.trim() === '') continue
    
    // Min length kontrolü
    if (rule.minLength && !validateLength(value, rule.minLength)) {
      errors[field] = `${rule.label || field} en az ${rule.minLength} karakter olmalıdır`
      continue
    }
    
    // Max length kontrolü
    if (rule.maxLength && !validateLength(value, 0, rule.maxLength)) {
      errors[field] = `${rule.label || field} en fazla ${rule.maxLength} karakter olabilir`
      continue
    }
    
    // URL kontrolü
    if (rule.isUrl && !isValidUrl(value)) {
      errors[field] = `${rule.label || field} geçerli bir URL olmalıdır`
      continue
    }
    
    // Email kontrolü
    if (rule.isEmail && !isValidEmail(value)) {
      errors[field] = `${rule.label || field} geçerli bir e-posta adresi olmalıdır`
      continue
    }
    
    // Instagram URL kontrolü
    if (rule.isInstagramUrl && !isValidInstagramUrl(value)) {
      errors[field] = `${rule.label || field} geçerli bir Instagram URL'i olmalıdır`
      continue
    }
    
    // YouTube ID kontrolü
    if (rule.isYouTubeId && !isValidYouTubeId(value)) {
      errors[field] = `${rule.label || field} geçerli bir YouTube ID olmalıdır`
      continue
    }
    
    // Custom validator
    if (rule.validator && !rule.validator(value)) {
      errors[field] = rule.errorMessage || `${rule.label || field} geçersiz`
      continue
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Form data sanitization
 */
export function sanitizeFormData(formData) {
  const sanitized = {}
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      // URL alanları için sadece trim
      if (key.includes('url') || key.includes('Url') || key.includes('permalink') || key.includes('thumbnail') || key.includes('cover')) {
        sanitized[key] = value.trim()
      } else {
        // Diğer text alanları için sanitize
        sanitized[key] = sanitizeText(value)
      }
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

