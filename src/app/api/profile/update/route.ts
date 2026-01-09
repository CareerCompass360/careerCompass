import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stackServerApp } from '@/stack/server';

export async function PATCH(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await stackServerApp.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { firstName, lastName, bio, dateOfBirth, phone, address, username, profilePicture } = body;

    // Validate dateOfBirth if provided
    let parsedDateOfBirth: Date | undefined;
    if (dateOfBirth) {
      parsedDateOfBirth = new Date(dateOfBirth);
      if (isNaN(parsedDateOfBirth.getTime())) {
        return NextResponse.json(
          { error: 'Invalid date format' },
          { status: 400 }
        );
      }
    }

    // Check if username is already taken (if username is being changed)
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      
      if (existingUser && existingUser.stackAuthId !== user.id) {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 400 }
        );
      }
    }

    // Update Stack Auth fields (firstName, lastName, profilePicture)
    // These fields are managed by Stack Auth
    const stackAuthUpdateData: any = {};
    if (firstName !== undefined) stackAuthUpdateData.displayName = firstName;
    if (lastName !== undefined) stackAuthUpdateData.clientMetadata = { lastName };
    if (profilePicture !== undefined) stackAuthUpdateData.profileImageUrl = profilePicture;

    if (Object.keys(stackAuthUpdateData).length > 0) {
      await user.update(stackAuthUpdateData);
    }

    // Update user in Prisma database
    // These include both synced fields and Prisma-only fields
    const updatedUser = await prisma.user.update({
      where: {
        stackAuthId: user.id,
      },
      data: {
        ...(firstName !== undefined && { firstName: firstName || null }),
        ...(lastName !== undefined && { lastName: lastName || null }),
        ...(username && { username }),
        ...(bio !== undefined && { bio: bio || null }),
        ...(dateOfBirth !== undefined && { dateOfBirth: parsedDateOfBirth || null }),
        ...(phone !== undefined && { phone: phone || null }),
        ...(address !== undefined && { address: address || null }),
        ...(profilePicture !== undefined && { profilePicture: profilePicture || null }),
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
