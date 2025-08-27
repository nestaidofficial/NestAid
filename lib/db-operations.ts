import { Client } from 'pg';
import { User, FamilyCaregiverApplication, CareApplication, JobApplication } from './schema';

// Database connection function
async function getClient() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();
  return client;
}

// User operations
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  const client = await getClient();
  try {
    const result = await client.query(`
      INSERT INTO users (email, first_name, last_name, phone, postal_code)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, first_name, last_name, phone, postal_code, created_at, updated_at
    `, [userData.email, userData.firstName, userData.lastName, userData.phone, userData.postalCode]);
    return result.rows[0];
  } finally {
    await client.end();
  }
}

export async function getUserByEmail(email: string) {
  const client = await getClient();
  try {
    const result = await client.query(`
      SELECT id, email, first_name, last_name, phone, postal_code, created_at, updated_at
      FROM users WHERE email = $1
    `, [email]);
    return result.rows[0];
  } finally {
    await client.end();
  }
}

// Family Caregiver Application operations
export async function createFamilyCaregiverApplication(
  userId: string,
  applicationData: Omit<FamilyCaregiverApplication, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
) {
  const client = await getClient();
  try {
    const result = await client.query(`
      INSERT INTO family_caregiver_applications (
        user_id,
        state,
        looking_for,
        relationship,
        live_with,
        daily_help,
        guardian,
        medicaid,
        language,
        applicant_first_name,
        applicant_last_name,
        applicant_email,
        applicant_postal_code,
        status
      )
      SELECT
        $1 AS user_id,
        $2 AS state,
        $3 AS looking_for,
        $4 AS relationship,
        $5 AS live_with,
        $6 AS daily_help,
        $7 AS guardian,
        $8 AS medicaid,
        $9 AS language,
        u.first_name AS applicant_first_name,
        u.last_name AS applicant_last_name,
        u.email AS applicant_email,
        u.postal_code AS applicant_postal_code,
        'pending' AS status
      FROM users u
      WHERE u.id = $1
      RETURNING *
    `, [
      userId,
      applicationData.state,
      applicationData.lookingFor,
      applicationData.relationship,
      applicationData.liveWith,
      applicationData.dailyHelp,
      applicationData.guardian,
      applicationData.medicaid,
      applicationData.language
    ]);
    return result.rows[0];
  } finally {
    await client.end();
  }
}

// Care Application operations
export async function createCareApplication(
  userId: string,
  applicationData: Omit<CareApplication, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
) {
  const client = await getClient();
  try {
    const result = await client.query(`
      INSERT INTO care_applications (
        user_id,
        service_type,
        who_needs_care,
        applicant_first_name,
        applicant_last_name,
        applicant_email,
        applicant_postal_code,
        status
      )
      SELECT
        $1 AS user_id,
        $2 AS service_type,
        $3 AS who_needs_care,
        u.first_name AS applicant_first_name,
        u.last_name AS applicant_last_name,
        u.email AS applicant_email,
        u.postal_code AS applicant_postal_code,
        'pending' AS status
      FROM users u
      WHERE u.id = $1
      RETURNING *
    `, [userId, applicationData.serviceType, applicationData.whoNeedsCare]);
    return result.rows[0];
  } finally {
    await client.end();
  }
}

// Job Application operations
export async function createJobApplication(
  userId: string,
  applicationData: Omit<JobApplication, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
) {
  const client = await getClient();
  try {
    const result = await client.query(`
      INSERT INTO job_applications (
        user_id,
        gender,
        experience,
        care_types,
        applicant_first_name,
        applicant_last_name,
        applicant_email,
        applicant_postal_code,
        status
      )
      SELECT
        $1 AS user_id,
        $2 AS gender,
        $3 AS experience,
        $4 AS care_types,
        u.first_name AS applicant_first_name,
        u.last_name AS applicant_last_name,
        u.email AS applicant_email,
        u.postal_code AS applicant_postal_code,
        'pending' AS status
      FROM users u
      WHERE u.id = $1
      RETURNING *
    `, [userId, applicationData.gender, applicationData.experience, applicationData.careTypes]);
    return result.rows[0];
  } finally {
    await client.end();
  }
}
