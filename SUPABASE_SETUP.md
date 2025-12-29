# Supabase Setup Guide for NestAid

## 🚀 Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization, project name, and region
5. Set a strong database password
6. Wait for the project to be created

### 2. Get Your API Keys

1. Go to your project dashboard
2. Click on **Settings** (gear icon) → **API**
3. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Set Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Admin Authentication (Server-side only, not exposed to client)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password-here
```

### 4. Create Database Tables

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** (left sidebar)
3. Click "New Query"
4. Copy and paste the contents of `lib/supabase/schema.sql`
5. Click "Run" to execute

### 5. Verify Setup

Run the development server:

```bash
npm run dev
```

Go to `/admin/login` and log in to test the admin dashboard.

---

## 📊 Database Schema

### Tables Created

| Table | Purpose |
|-------|---------|
| `job_postings` | Admin-created job listings with location and radius |
| `job_applications` | User submissions from "A job" flow in GetStartedModal |
| `care_applications` | User submissions from "Care for an adult" flow |

### Job Postings Table

```sql
- id (UUID, primary key)
- title (VARCHAR 255)
- description (TEXT)
- zipcode (VARCHAR 10)
- city (VARCHAR 100)
- state (VARCHAR 50)
- lat, lng (DECIMAL for geolocation)
- radius_miles (INTEGER, default 25)
- is_active (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

### Job Applications Table

Captures all answers from GetStartedModal job flow:
- `looking_for`: "job"
- `job_category`: "senior_care" or "adult_care"
- `service_type`: "In-Home Care", "Companionship", etc.
- `gender`: "Male" or "Female"
- `has_experience`: true/false
- Contact info: first_name, last_name, email, phone, postal_code

### Care Applications Table

Captures all answers from GetStartedModal care flow:
- `looking_for`: "care"
- `care_category`: "senior_care" or "adult_care"
- `service_type`: "in_home_care", "companion_care", etc.
- `who_needs_care`: "me", "parent", "spouse", "someone_else"
- Contact info: first_name, last_name, email, phone, postal_code
- sms_consent: boolean

---

## 🔐 Row Level Security (RLS)

The schema includes RLS policies:

- **Job Postings**: Anyone can read active postings; only service role can write
- **Job Applications**: Anyone can submit; only service role can read/update
- **Care Applications**: Anyone can submit; only service role can read/update

---

## 🛠️ Admin Dashboard Features

### Post Job Tab
- Create new job postings
- Set location using Google Places Autocomplete
- Configure visibility radius (5-100 miles)
- View recent postings

### Job Applications Tab
- View all job applications
- See modal flow answers (category, service, gender, experience)
- Contact information
- Status tracking

### Care Applications Tab
- View all care applications
- See modal flow answers (category, service, who needs care)
- Contact information
- SMS consent status
- Status tracking

---

## 📱 Application Flow

### Job Application Flow
1. User clicks "Get Started"
2. Selects "A job"
3. Chooses job category (Senior Care / Adult Care)
4. Selects service type
5. Answers gender question
6. Answers experience question
7. Fills contact form
8. Data saved to `job_applications` table

### Care Application Flow
1. User clicks "Get Started"
2. Selects "Care for an adult"
3. Chooses care category (Senior care / Adult care)
4. Selects service type
5. Answers "who needs care" question
6. Fills contact form
7. Data saved to `care_applications` table

---

## 🔧 Troubleshooting

### "Failed to fetch" errors
- Check that your Supabase URL is correct
- Verify your API keys are set correctly
- Check browser console for detailed errors

### RLS Policy errors
- Make sure you're using the service role key on the server
- Verify the schema was executed correctly

### Tables not found
- Run the SQL schema in Supabase SQL Editor
- Check for any execution errors

---

## 🔧 Troubleshooting

### "Failed to fetch" errors
- Check that your Supabase URL is correct
- Verify your API keys are set correctly
- Check browser console for detailed errors

### RLS Policy errors
- Make sure you're using the service role key on the server
- Verify the schema was executed correctly

### Tables not found
- Run the SQL schema in Supabase SQL Editor
- Check for any execution errors

### "value too long for type character varying(10)" error
If you see this error when posting jobs, you need to run a migration to increase the zipcode column size:
1. Go to Supabase SQL Editor
2. Run the contents of `lib/supabase/migration-zipcode-fix.sql`
3. This will increase the zipcode column from VARCHAR(10) to VARCHAR(20)

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

