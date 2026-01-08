import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, User } from 'lucide-react';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  // Fetch user from database by username
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // If user not found, show 404
  if (!user) {
    notFound();
  }

  // Format date
  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Profile Header Card */}
        <Card className="mb-8">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-6">
            <Avatar className="h-32 w-32 border-4 border-primary/10">
              <AvatarImage 
                src={user.profilePicture || undefined} 
                alt={`${user.firstName}'s profile`} 
              />
              <AvatarFallback className="text-3xl">
                {user.firstName?.charAt(0).toUpperCase() || 'U'}
                {user.lastName?.charAt(0).toUpperCase() || ''}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <CardTitle className="text-3xl mb-2">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="text-lg mb-3">
                @{user.username}
              </CardDescription>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="secondary" className="gap-2">
                  <User className="h-3 w-3" />
                  Member
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <Calendar className="h-3 w-3" />
                  Joined {joinDate}
                </Badge>
              </div>
            </div>
          </CardHeader>

          {user.bio && (
            <CardContent>
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-2">About</h3>
                <p className="text-muted-foreground">{user.bio}</p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Contact Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5" />
              <span>{user.email}</span>
            </div>
          </CardContent>
        </Card>

        {/* Career Activities Card - Placeholder for future features */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Career Journey</CardTitle>
            <CardDescription>
              Track your career exploration and assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Start exploring careers to see your activity here!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params;
  
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return {
      title: 'User Not Found',
    };
  }

  return {
    title: `${user.firstName} ${user.lastName || ''} (@${user.username}) | Career Compass`,
    description: user.bio || `View ${user.firstName}'s profile on Career Compass`,
  };
}
