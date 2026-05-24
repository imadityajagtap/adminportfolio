import mongoose from 'mongoose';
import { config } from 'dotenv';

config({ path: '.env.local' });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true, select: false },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function checkUser() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not found');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Find user with password field
    const user = await User.findOne({ email: 'aditya.jagtap312@gmail.com' }).select('+hashedPassword');
    
    if (!user) {
      console.log('❌ User NOT found in database!');
    } else {
      console.log('✅ User found!');
      console.log('📧 Email:', user.email);
      console.log('🔑 Has password hash:', user.hashedPassword ? 'YES' : 'NO');
      console.log('👤 Role:', user.role);
      console.log('📅 Created:', user.createdAt);
      
      // Test password verification
      const bcrypt = await import('bcryptjs');
      const isValid = await bcrypt.compare('Adity@007', user.hashedPassword);
      console.log('\n🔐 Password "Adity@007" matches:', isValid ? '✅ YES' : '❌ NO');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkUser();
