# Career Compass - Setup Instructions

## Stack Auth + NeonDB PostgreSQL Integration

This guide will help you set up Stack Auth authentication with NeonDB PostgreSQL database.

---

## Prerequisites

- Node.js 18+ installed
- A [Stack Auth](https://app.stack-auth.com) account
- A [NeonDB](https://neon.tech) account

---

## Step 1: Database Setup (NeonDB)

1. **Create a NeonDB Project**
   - Go to [https://neon.tech](https://neon.tech)
   - Sign in and create a new project
   - Name it "careercompass" or similar

2. **Get your connection string**
   - After creating the project, you'll see your connection string
   - It looks like: `postgresql://user:password@host/database?sslmode=require`
   - Copy this - you'll need it in Step 3

---

## Step 2: Stack Auth Setup

1. **Create a Stack Auth Project**
   - Go to [https://app.stack-auth.com](https://app.stack-auth.com)
   - Create a new project
   - Name it "Career Compass"

2. **Configure Authentication Methods**
   - Go to your project settings
   - Enable Email/Password authentication
   - Enable any other auth methods you want (Google, GitHub, etc.)

3. **Get your API keys**
   - In the Stack Auth dashboard, go to "API Keys"
   - You'll need:
     - `NEXT_PUBLIC_STACK_PROJECT_ID`
     - `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
     - `STACK_SECRET_SERVER_KEY`

---

## Step 3: Environment Variables

1. **Create `.env` file** in the root of your project:

```bash
# Copy the example file
cp .env.example .env
```

2. **Fill in your `.env` file** with your actual values:

```env
# Database Configuration (from Step 1)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Stack Auth Configuration (from Step 2)
NEXT_PUBLIC_STACK_PROJECT_ID="your_stack_project_id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your_publishable_key"
STACK_SECRET_SERVER_KEY="your_secret_key"
```

---

## Step 4: Database Migration

Run these commands to set up your database:

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

---

## Step 5: Run the Application

```bash
# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## How It Works

### Authentication Flow

1. **User Signs Up/Signs In**
   - User clicks "Get Started" or "Sign In"
   - Stack Auth handles the authentication
   - User is redirected back to the app

2. **Automatic Profile Creation**
   - When user logs in, the `useProfile` hook is called
   - It makes a POST request to `/api/profile/sync`
   - The API checks if user exists in database
   - If not, it creates a new user with:
     - Stack Auth ID (for linking)
     - Unique username (generated from first name)
     - Email, name, profile picture from Stack Auth

3. **Username Generation**
   - Usernames are generated from the first name
   - Format: `firstname` or `firstname1234` (if taken)
   - Example: "John Doe" → `john` or `john4532`

4. **Profile Page**
   - Each user gets a profile at `/{username}`
   - Example: `http://localhost:3000/john4532`
   - Profile shows user info, join date, bio, etc.

### Key Files

- **Database Schema**: `/prisma/schema.prisma`
  - Defines User model with all fields

- **Username Generator**: `/src/lib/username.ts`
  - Generates unique usernames from first names

- **Profile Sync API**: `/src/app/api/profile/sync/route.ts`
  - Syncs Stack Auth users with database
  - Creates/updates user profiles

- **Profile Hook**: `/src/lib/useProfile.ts`
  - Client-side hook to get current user's profile
  - Automatically syncs on mount

- **Profile Page**: `/src/app/[username]/page.tsx`
  - Dynamic route for user profiles
  - Shows user info, bio, join date, etc.

- **Navbar**: `/src/components/LandingPage/Navbar.tsx`
  - Shows "Profile" button when logged in
  - Links to user's profile page

---

## Database Schema

```prisma
model User {
  id              String   @id @default(cuid())
  stackAuthId     String   @unique
  username        String   @unique
  firstName       String?
  lastName        String?
  email           String   @unique
  profilePicture  String?
  bio             String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## Troubleshooting

### "Database connection failed"
- Check your `DATABASE_URL` in `.env`
- Make sure NeonDB project is active
- Verify connection string format

### "User not syncing"
- Check browser console for errors
- Verify Stack Auth keys are correct
- Make sure `/api/profile/sync` endpoint is accessible

### "Username already taken"
- The system automatically handles this
- It adds random numbers until finding a unique username

### "Prisma Client not found"
- Run `npx prisma generate`
- Restart your dev server

---

## Testing the Integration

1. **Sign Up a new user**
   - Click "Get Started"
   - Create account with Stack Auth
   - You'll be redirected to home page

2. **Check Profile**
   - Click "Profile" button in navbar
   - You should see your profile page at `/{username}`

3. **Verify Database**
   - Run `npx prisma studio`
   - Open browser to Prisma Studio
   - Check the "User" table - your user should be there

---

## Next Steps

- Customize the profile page design
- Add ability to edit profile (bio, etc.)
- Add more user features (career tracking, assessments, etc.)
- Configure Stack Auth email templates
- Set up production environment variables

---

## Support

If you encounter issues:
- Check the browser console for errors
- Check the terminal for server errors
- Verify all environment variables are set correctly
- Make sure database migrations ran successfully

---

## Security Notes

- Never commit `.env` file to git
- Keep your `STACK_SECRET_SERVER_KEY` private
- Use different keys for development and production
- NeonDB connections are SSL encrypted by default
