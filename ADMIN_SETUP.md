# Admin Authentication Setup Guide

## Overview

The admin authentication system has been migrated from environment variable-based auth to proper Supabase Auth with secure session management.

## What Changed

### Before
- Admin credentials stored in `ADMIN_USERNAME` and `ADMIN_PASSWORD` env vars
- Insecure cookie-based session (`adminAuthenticated=true`)
- No middleware protection
- Anyone could forge the admin cookie

### After
- Real Supabase Auth users with `role: 'admin'` in user_metadata
- Secure Supabase sessions stored in httpOnly cookies
- Middleware automatically refreshes sessions and protects admin routes
- Proper sign-in/sign-out flow

## Setup Instructions

### Step 1: Create Your First Admin User

Run the admin creation script:

```bash
npm run create-admin
```

You'll be prompted to enter:
- **Email**: Your admin email address
- **Password**: A secure password (minimum 6 characters)

Or pass them as arguments:

```bash
npm run create-admin admin@nestaid.com mySecurePassword123
```

### Step 2: Test the Login

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/login`

3. Enter the email and password you just created

4. You should be redirected to `/admin/dashboard`

## How It Works

### Authentication Flow

1. **Login**: User enters email/password at `/admin/login`
2. **Verification**: Server calls `signInWithPassword()` and checks for `role: 'admin'` in user_metadata
3. **Session**: Supabase creates a secure session stored in httpOnly cookies
4. **Protection**: Middleware on every request:
   - Refreshes the session if needed
   - Redirects non-admin users away from `/admin/dashboard`
   - Redirects logged-in admins away from `/admin/login`

### Key Files

- **`middleware.ts`**: Protects admin routes and refreshes sessions
- **`app/actions/admin-auth.ts`**: Server actions for sign-in, sign-out, and session checks
- **`scripts/create-admin.ts`**: Script to create admin users
- **`app/admin/login/page.tsx`**: Admin login page
- **`app/admin/dashboard/page.tsx`**: Admin dashboard with auth check

## Creating Additional Admin Users

To create more admin users, simply run the script again:

```bash
npm run create-admin another-admin@nestaid.com anotherPassword123
```

## Security Features

✅ **Secure Sessions**: httpOnly cookies prevent XSS attacks  
✅ **Role-Based Access**: Only users with `role: 'admin'` can access admin routes  
✅ **Middleware Protection**: Server-side route protection  
✅ **Auto Session Refresh**: Sessions automatically refresh before expiring  
✅ **Proper Sign-Out**: Clears all session data on logout  

## Troubleshooting

### "Invalid email or password"
- Verify the email/password are correct
- Check that the user was created successfully in Supabase Auth dashboard

### "Access denied. Admin privileges required."
- The user exists but doesn't have `role: 'admin'` in user_metadata
- Recreate the user with the script or manually add the role in Supabase dashboard

### Redirected to login immediately after signing in
- Check browser console for errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
- Make sure middleware.ts is in the project root

### Script fails with "Missing required environment variables"
- Ensure `.env.local` contains:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Restart your terminal/IDE after adding env vars

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Note**: `ADMIN_USERNAME` and `ADMIN_PASSWORD` are no longer used and have been removed.
