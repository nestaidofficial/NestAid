# Neon Database Setup for NestAid

## 🚀 Quick Setup Guide

### 1. Create a Neon Database
1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Copy your connection string

### 2. Set Environment Variables
Create a `.env.local` file in your project root:

```env
# Neon Database Configuration
DATABASE_URL="postgresql://username:password@your-neon-host/database-name?sslmode=require"

# Optional: Separate variables for more control
NEON_HOST="your-neon-host"
NEON_DATABASE="your-database-name"
NEON_USERNAME="your-username"
NEON_PASSWORD="your-password"
```

### 3. Run Database Migration
1. Connect to your Neon database using the SQL editor
2. Copy and paste the contents of `lib/migrations.sql`
3. Execute the migration to create all tables

### 4. Test the Connection
Run the development server:
```bash
npm run dev
```

## 📊 Database Schema

The database includes the following tables:

- **users** - Store user information
- **family_caregiver_applications** - Family caregiver program applications
- **care_applications** - Care service applications
- **job_applications** - Job applications

## 🔧 Usage Examples

### In Server Actions:
```typescript
import { submitFamilyCaregiverApplication } from '@/app/actions/database-forms';

// Submit a family caregiver application
const result = await submitFamilyCaregiverApplication({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  postalCode: "12345",
  state: "Massachusetts",
  lookingFor: "Care for a Family/Friend",
  relationship: "Parent",
  liveWith: "Yes",
  dailyHelp: "Yes",
  guardian: "No",
  medicaid: "Yes",
  language: "English",
  smsConsent: true
});
```

### Direct Database Queries:
```typescript
import { sql } from '@/lib/database';

// Get all pending applications
const pendingApps = await sql`
  SELECT * FROM family_caregiver_applications 
  WHERE status = 'pending' 
  ORDER BY created_at DESC
`;
```

## 🔒 Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive data
- Consider using Neon's connection pooling for production

## 📈 Performance Tips

- The database includes indexes for common queries
- Use connection pooling in production
- Monitor query performance using Neon's dashboard

## 🆘 Troubleshooting

### Common Issues:
1. **Connection refused**: Check your DATABASE_URL format
2. **SSL required**: Ensure `?sslmode=require` is in your connection string
3. **Table not found**: Run the migration script first

### Getting Help:
- Check Neon's documentation: https://neon.tech/docs
- Review the migration script in `lib/migrations.sql`
- Test with a simple query first


