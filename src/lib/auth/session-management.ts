import { createClient as createClientClient } from '@/lib/supabase/client'
import { createUserProfile } from './user-creation'
import { apiLogger } from '@/lib/monitoring/logger'

// Note: Server-side session management should be handled in server components
// These functions are kept for backward compatibility but should be used carefully

export async function signIn(email: string, password: string) {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      apiLogger.warn('Sign in failed', {
        email,
        error: error.message,
        action: 'sign_in'
      })
      return { success: false, error: error.message }
    }

    if (data.user) {
      // Ensure user profile exists
      const profileResult = await createUserProfile(
        data.user.id,
        data.user.email || email,
        data.user.user_metadata?.name
      )

      if (!profileResult.success) {
        apiLogger.error('Failed to create user profile during sign in', {
          userId: data.user.id,
          error: profileResult.error,
          action: 'sign_in'
        })
      }

      apiLogger.info('User signed in successfully', {
        userId: data.user.id,
        email,
        action: 'sign_in'
      })
    }

    return { success: true, data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.error('Unexpected error during sign in', {
      email,
      error: errorMessage,
      action: 'sign_in'
    })
    return { success: false, error: errorMessage }
  }
}

export async function signUp(email: string, password: string, name?: string) {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || null
        }
      }
    })

    if (error) {
      apiLogger.warn('Sign up failed', {
        email,
        error: error.message,
        action: 'sign_up'
      })
      return { success: false, error: error.message }
    }

    if (data.user) {
      // Create user profile
      const profileResult = await createUserProfile(
        data.user.id,
        data.user.email || email,
        name
      )

      if (!profileResult.success) {
        apiLogger.error('Failed to create user profile during sign up', {
          userId: data.user.id,
          error: profileResult.error,
          action: 'sign_up'
        })
        return { success: false, error: profileResult.error }
      }

      apiLogger.info('User signed up successfully', {
        userId: data.user.id,
        email,
        action: 'sign_up'
      })
    }

    return { success: true, data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.error('Unexpected error during sign up', {
      email,
      error: errorMessage,
      action: 'sign_up'
    })
    return { success: false, error: errorMessage }
  }
}

export async function signOut() {
  try {
    const supabase = createClientClient()
    
    const { error } = await supabase.auth.signOut()

    if (error) {
      apiLogger.error('Sign out failed', {
        error: error.message,
        action: 'sign_out'
      })
      return { success: false, error: error.message }
    }

    apiLogger.info('User signed out successfully', {
      action: 'sign_out'
    })

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.error('Unexpected error during sign out', {
      error: errorMessage,
      action: 'sign_out'
    })
    return { success: false, error: errorMessage }
  }
}

export async function refreshSession() {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase.auth.refreshSession()

    if (error) {
      apiLogger.error('Session refresh failed', {
        error: error.message,
        action: 'refresh_session'
      })
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.error('Unexpected error during session refresh', {
      error: errorMessage,
      action: 'refresh_session'
    })
    return { success: false, error: errorMessage }
  }
}