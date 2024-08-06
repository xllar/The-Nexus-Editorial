import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter your first name."],
  },
  lastname: {
    type: String,
    required: [true, "Please enter your last name."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: true,
    lowercase: true, // Ensure email is stored in lowercase
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png",
  },
  bio: {
    type: String,
    maxlength: 160, // Limit bio length
  },
  dateOfBirth: {
    type: Date,
  },
  dateCreated: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
  roles: {
    type: [String], // Array of roles
    default: ['reader'], // Default role
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
