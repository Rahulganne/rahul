const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const initGemini = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
};

// Generate response using Gemini
const generateResponse = async (question, profile) => {
  try {
    const model = initGemini();
    
    const prompt = `You are a friendly AI tutor specializing in Data Science. If a user asks about non-data science topics, politely inform them that you only answer data science-related questions.

    User's expertise level: ${profile}
    
    **User Question:** ${question}

    **AI Tutor Response:**`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response from Gemini:', error);
    throw new Error('Failed to generate AI response');
  }
};

// Get random images from Unsplash
const getUnsplashImage = async () => {
  try {
    const queries = [
      "3d robot assistant",
      "3d digital assistant",
      "3d chatbot render",
      "3d ai virtual assistant",
      "3d hologram ai",
      "futuristic 3d ai"
    ];
    
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    const apiUrl = `https://api.unsplash.com/photos/random?query=${randomQuery}&client_id=${process.env.UNSPLASH_API_KEY}`;
    
    const response = await axios.get(apiUrl);
    return response.data.urls.regular;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return '';
  }
};

module.exports = {
  generateResponse,
  getUnsplashImage
};