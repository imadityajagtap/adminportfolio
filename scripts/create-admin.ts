import { hash } from 'bcryptjs';
import { config } from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
config({ path: '.env.local' });

// User schema (inline to avoid imports)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true, select: false },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Admin credentials
    const email = 'aditya.jagtap312@gmail.com';
    const password = 'Adity@007';

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️  Admin user already exists. Updating password...');

      // Hash new password
      const hashedPassword = await hash(password, 12);

      // Update user
      await User.updateOne(
        { email },
        { $set: { hashedPassword, role: 'admin' } }
      );

      console.log('✅ Admin password updated successfully!');
    } else {
      console.log('Creating new admin user...');

      // Hash password
      const hashedPassword = await hash(password, 12);

      // Create user
      await User.create({
        email,
        hashedPassword,
        role: 'admin',
      });

      console.log('✅ Admin user created successfully!');
    }

    console.log('\n📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('\nYou can now log in to the admin dashboard.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdminUser();
