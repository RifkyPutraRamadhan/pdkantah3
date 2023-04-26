import { supabase } from '../supabase'

export const requireAuth = (to, from, next) => {
  const user = supabase.auth.user()
  
  if (!user) {
    next({ path: '/login' })
  } else {
    next()
  }
}