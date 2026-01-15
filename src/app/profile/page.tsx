import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { stackServerApp } from '@/stack/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, User, Phone, MapPin, Cake } from 'lucide-react';
import { EditProfileDialog } from '@/components/Profile/EditProfileDialog';
import { UserBookings } from '@/components/Profile/UserBookings';
import { Navbar } from '@/components/common/Navbar';

export default async function ProfilePage() {
  // Get current user from Stack Auth
  const currentUser = await stackServerApp.getUser();
  if (!currentUser) notFound();

  // Fetch user from database by stackAuthId
  const user = await prisma.user.findUnique({
    where: { stackAuthId: currentUser.id },
  });
  if (!user) notFound();

  // Format date
  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Calculate age from date of birth
  const calculateAge = (dob: Date | null): number | null => {
    if (!dob) return null;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const age = user.dateOfBirth ? calculateAge(user.dateOfBirth) : null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-10 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
                  {user.firstName || 'Not set'} {user.lastName || ''}
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
              <div className="sm:self-start">
                <EditProfileDialog user={user} isOwnProfile={true} />
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
          {/* Personal Information Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic details about the user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">Email</p>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cake className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">Date of Birth</p>
                    <p className="text-muted-foreground">
                      {user.dateOfBirth 
                        ? `${new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })} ${age !== null ? `(${age} years old)` : ''}`
                        : 'Not provided'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">Phone Number</p>
                    <p className="text-muted-foreground">
                      {user.phone || 'Not provided'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">Address</p>
                    <p className="text-muted-foreground">
                      {(() => {
                        if (!user.address) return 'Not provided';
                        try {
                          const addr = JSON.parse(user.address);
                          const parts = [
                            addr.flat,
                            addr.area,
                            addr.city,
                            addr.state,
                            addr.pincode
                          ].filter(Boolean);
                          return parts.length ? parts.join(', ') : 'Not provided';
                        } catch {
                          return user.address;
                        }
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Counseling Sessions */}
          <UserBookings />

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
    </>
  );
}
