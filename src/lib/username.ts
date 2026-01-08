import { prisma } from './prisma';

/**
 * Generates a unique username from the user's first name
 * Format: firstname + random numbers (e.g., john1234)
 */
export async function generateUniqueUsername(firstName: string): Promise<string> {
  // Clean and lowercase the first name
  const cleanFirstName = firstName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove special characters
    .slice(0, 15); // Limit to 15 chars

  if (!cleanFirstName) {
    // If first name is empty or invalid, use a default
    return generateUniqueUsername('user');
  }

  // Try the base username first
  let username = cleanFirstName;
  let exists = await checkUsernameExists(username);

  // If exists, add random numbers until we find a unique one
  let attempts = 0;
  while (exists && attempts < 100) {
    const randomNum = Math.floor(Math.random() * 10000);
    username = `${cleanFirstName}${randomNum}`;
    exists = await checkUsernameExists(username);
    attempts++;
  }

  // If still can't find unique username after 100 attempts, add timestamp
  if (exists) {
    username = `${cleanFirstName}${Date.now()}`;
  }

  return username;
}

/**
 * Checks if a username already exists in the database
 */
async function checkUsernameExists(username: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user !== null;
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
}
