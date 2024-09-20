import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
