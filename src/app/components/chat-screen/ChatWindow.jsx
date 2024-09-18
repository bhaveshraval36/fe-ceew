"use client"
import React, { useState } from 'react';
import { Box } from '@mui/material';
import ChatSidebar from './ChatSidebar';
import ChatPanel from './ChatPanel';
import ChatResponse from './ChatResponse';
import FeedbackModal from './FeedbackModal';

const ChatWindow = () => {
  const [showChat, setShowChat] = useState(true);
  const [answerObject, setAnswer] = useState({});
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleNewQuery = () => {
    setShowChat(true);
  };

  const handleOpenFeedback = () => {
    setFeedbackOpen(true);
  };

  const handleCloseFeedback = () => {
    setFeedbackOpen(false);
  };

  const handleSubmitQuery = (answerObject) => {
    setAnswer(answerObject);
    setShowChat(false);
  };

  const handleSelectAnswer = (answer) => {
    setAnswer(answer);
    setShowChat(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ChatSidebar onNewQuery={handleNewQuery} onOpenFeedback={handleOpenFeedback} onSelectAnswer={handleSelectAnswer} />
      <Box sx={{ flexGrow: 1 }}>
        {showChat ? <ChatPanel onSubmit={handleSubmitQuery} /> : <ChatResponse responseText={answerObject} />}
      </Box>
      <FeedbackModal open={feedbackOpen} onClose={handleCloseFeedback} />
    </Box>
  );
};

export default ChatWindow;
