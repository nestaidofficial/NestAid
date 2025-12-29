"use server"

export async function authenticateAdmin(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return { success: false, error: 'Server configuration error. Please contact administrator.' };
  }

  if (username === adminUsername && password === adminPassword) {
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials' };
}

