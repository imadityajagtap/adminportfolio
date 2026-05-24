import { hash } from 'bcryptjs';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config({ path: '.env.local' });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true, select: false },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createSimpleAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not found');

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected\n');

    // Delete ALL existing users first
    await User.deleteMany({});
    console.log('🗑️  Deleted all existing users\n');

    // Create SIMPLE admin with SIMPLE password
    const email = 'admin@admin.com';
    const password = 'admin123';
    const hashedPassword = await hash(password, 12);

    await User.create({
      email,
      hashedPassword,
      role: 'admin',
    });

    console.log('✅ NEW ADMIN CREATED!\n');
    console.log('============================');
    console.log('📧 Email: admin@admin.com');
    console.log('🔑 Password: admin123');
    console.log('============================\n');
    console.log('Use these credentials to login!');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createSimpleAdmin();
