import axios from 'axios';

// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API methods
export const getChatHistory = async (userId) => {
  try {
    const response = await apiClient.get(`/chat/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};

export const sendMessage = async (userId, message, expertise) => {
  try {
    const response = await apiClient.post('/chat', {
      userId,
      message,
      expertise
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const updateProfile = async (userId, profileData) => {
  try {
    const response = await apiClient.put(`/profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const getRandomImage = async () => {
  try {
    const response = await apiClient.get('/image');
    return response.data;
  } catch (error) {
    console.error('Error getting random image:', error);
    throw error;
  }
};