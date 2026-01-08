import { NextResponse } from 'next/server';
import { stackServerApp } from '@/stack/server';
import { prisma } from '@/lib/prisma';
import { generateUniqueUsername } from '@/lib/username';

/**
 * API route to sync Stack Auth user data with the database
 * Called when user logs in or accesses their profile
 */
export async function POST() {
  try {
    // Get the current user from Stack Auth
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Check if user exists in database
    let dbUser = await prisma.user.findUnique({
      where: { stackAuthId: user.id },
    });

    // If user doesn't exist, create them
    if (!dbUser) {
      // Get user details from Stack Auth
      const firstName = user.displayName?.split(' ')[0] || user.primaryEmail?.split('@')[0] || 'user';
      const lastName = user.displayName?.split(' ').slice(1).join(' ') || null;
      
      // Generate unique username
      const username = await generateUniqueUsername(firstName);

      // Create user in database
      dbUser = await prisma.user.create({
        data: {
          stackAuthId: user.id,
          username,
          firstName,
          lastName,
          email: user.primaryEmail || '',
          profilePicture: user.profileImageUrl || null,
          bio: null,
        },
      });
    } else {
      // Update existing user with latest Stack Auth data
      dbUser = await prisma.user.update({
        where: { stackAuthId: user.id },
        data: {
          email: user.primaryEmail || dbUser.email,
          profilePicture: user.profileImageUrl || dbUser.profilePicture,
          firstName: user.displayName?.split(' ')[0] || dbUser.firstName,
          lastName: user.displayName?.split(' ').slice(1).join(' ') || dbUser.lastName,
        },
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: dbUser.id,
        username: dbUser.username,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        profilePicture: dbUser.profilePicture,
        bio: dbUser.bio,
      },
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Failed to sync user data' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to retrieve current user's profile data
 */
export async function GET() {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { stackAuthId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: dbUser.id,
        username: dbUser.username,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        profilePicture: dbUser.profilePicture,
        bio: dbUser.bio,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
