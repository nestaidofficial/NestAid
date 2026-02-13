"use server"

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signInAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim(),
  })

  if (error) {
    return { success: false, error: 'Invalid email or password' }
  }

  // Check if user has admin role
  if (data.user?.user_metadata?.role !== 'admin') {
    // Sign out the user if they're not an admin
    await supabase.auth.signOut()
    return { success: false, error: 'Access denied. Admin privileges required.' }
  }

  return { success: true }
}

export async function signOutAdmin() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export async function getAdminSession() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { isAdmin: false, user: null }
  }

  const isAdmin = user.user_metadata?.role === 'admin'
  
  return { isAdmin, user: isAdmin ? user : null }
}


