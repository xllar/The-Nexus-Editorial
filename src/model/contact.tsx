import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
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
  file: {
    type: String, // Store the file name or path
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  // Optionally, add a field for the publication status
  published: {
    type: Boolean,
    default: false,
  },
});

const Story = mongoose.models.Story || mongoose.model('Story', storySchema);

export default Story;
