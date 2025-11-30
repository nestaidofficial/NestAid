import { neon } from '@neondatabase/serverless';

// Get the database URL from environment variables
const sql = neon(process.env.DATABASE_URL!);

export { sql };

// Example usage:
// const result = await sql`SELECT * FROM users WHERE id = ${userId}`;


