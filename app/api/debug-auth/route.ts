import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { compare } from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check MongoDB connection
    await connectDB();

    // Try to find the user
    const user = await User.findOne({ email: 'aditya.jagtap312@gmail.com' }).select('+hashedPassword');

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found in database',
        mongoUri: process.env.MONGODB_URI ? 'Set ✅' : 'Missing ❌',
        nextAuthUrl: process.env.NEXTAUTH_URL || 'Missing ❌',
        nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Set ✅' : 'Missing ❌',
      });
    }

    // Test password
    const passwordMatches = await compare('Adity@007', user.hashedPassword);

    return NextResponse.json({
      success: true,
      userExists: true,
      email: user.email,
      role: user.role,
      passwordMatches,
      hasHashedPassword: !!user.hashedPassword,
      mongoUri: process.env.MONGODB_URI ? 'Set ✅' : 'Missing ❌',
      nextAuthUrl: process.env.NEXTAUTH_URL || 'Missing ❌',
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Set ✅' : 'Missing ❌',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      mongoUri: process.env.MONGODB_URI ? 'Set ✅' : 'Missing ❌',
      nextAuthUrl: process.env.NEXTAUTH_URL || 'Missing ❌',
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Set ✅' : 'Missing ❌',
    });
  }
}
