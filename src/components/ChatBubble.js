
import React from 'react';
import { motion } from 'framer-motion';

const ChatBubble = ({ message, isUser }) => {
  const bubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const bubbleClass = isUser ? 'user-bubble' : 'ai-bubble';
  const floatingClass = isUser ? '' : 'chat-bubble';
  
  return (
    <motion.div 
      className={`${bubbleClass} ${floatingClass}`}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
    >
      <strong>{isUser ? 'You:' : 'DataSage:'}</strong> {message}
    </motion.div>
  );
};

export default ChatBubble;