#!/usr/bin/env node

import { config } from 'dotenv'

// Load .env.local so Supabase keys are available
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import * as readline from 'readline'

// Admin client with service role key for creating users
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing required environment variables')
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
    process.exit(1)
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

function promptInput(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function createAdminUser() {
  console.log('🔧 NestAid Admin User Creation Script\n')

  // Get email and password from command line args or prompt
  let email = process.argv[2]
  let password = process.argv[3]

  if (!email) {
    email = await promptInput('Enter admin email: ')
  }

  if (!password) {
    password = await promptInput('Enter admin password (min 6 characters): ')
  }

  // Validate inputs
  if (!email || !email.includes('@')) {
    console.error('❌ Error: Invalid email address')
    process.exit(1)
  }

  if (!password || password.length < 6) {
    console.error('❌ Error: Password must be at least 6 characters')
    process.exit(1)
  }

  console.log('\n📝 Creating admin user...')

  const supabase = createAdminClient()

  try {
    // Create the admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    })

    if (error) {
      console.error('❌ Error creating admin user:', error.message)
      process.exit(1)
    }

    console.log('\n✅ Admin user created successfully!')
    console.log(`📧 Email: ${email}`)
    console.log(`🔑 User ID: ${data.user.id}`)
    console.log(`👤 Role: admin`)
    console.log('\nYou can now log in at /admin/login with these credentials.')
  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

createAdminUser()
