const mongoose = require('mongoose');

const ChatHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  messages: [
    {
      role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  expertise: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  skills: {
    python: {
      type: Number,
      default: 70
    },
    statistics: {
      type: Number,
      default: 60
    },
    machineLearning: {
      type: Number,
      default: 50
    },
    visualization: {
      type: Number,
      default: 40
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChatHistory', ChatHistorySchema);