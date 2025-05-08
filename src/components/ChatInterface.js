import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatBubble from './ChatBubble';
import { sendMessage, getRandomImage } from '../api';

const ChatInterface = ({ userId, expertise }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiImage, setAiImage] = useState('');
  const chatContainerRef = useRef(null);

  // Fetch random AI image on component mount
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await getRandomImage();
        setAiImage(response.data.imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Add user message to chat history
    setChatHistory(prev => [
      ...prev,
      { role: 'user', content: message }
    ]);

    // Clear input field
    setMessage('');

    // Show loading state
    setIsLoading(true);

    try {
      // Send message to API
      const response = await sendMessage(userId, message, expertise);

      // Add AI response to chat history
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: response.data.response }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);

      // Show error message
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: '⚠️ Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Welcome message suggestions
  const suggestions = [
    "How do I handle missing data in pandas?",
    "Explain random forest algorithm",
    "What's the difference between classification and regression?"
  ];

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <img src={aiImage} alt="AI Avatar" className="ai-avatar" />
        <h2>AI Assistant</h2>
      </div>
      <div className="chat-container" ref={chatContainerRef}>
        {chatHistory.map((chat, index) => (
          <ChatBubble key={index} role={chat.role} content={chat.content} />
        ))}
      </div>
      <div className="chat-footer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
        <div className="suggestions">
          <p>Suggestions:</p>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => setMessage(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;