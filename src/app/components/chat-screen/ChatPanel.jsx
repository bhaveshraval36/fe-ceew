"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useSuggestedQuestions } from "@/app/hooks/useQuestions";
import { useAuth } from "@/app/context/AuthContext";
import { useMutation } from "react-query";
import { createSession, askQuestion } from "@/app/api/apiCall";

const ChatPanel = ({ onSubmit }) => {
  const { user } = useAuth();
  const { data, error, isLoading } = useSuggestedQuestions({
    user_id: user?.id,
    session_name: "test session",
  });

  const [selectedChip, setSelectedChip] = useState("");
  const [questionValue, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // Mutation for creating session
  const createSessionMutation = useMutation(createSession);

  // Mutation for asking a question
  const askQuestionMutation = useMutation(askQuestion, {
    onSuccess: (data) => {
      onSubmit(data); // Handle the success response
    },
    onError: (error) => {
      console.error("An error occurred while asking the question:", error);
    },
  });

  const handleSendButtonClick = async () => {
    if (!user?.id || !questionValue || !selectedOption) return;

    try {
      // Step 1: Create the session
      const sessionPayload = {
        user_id: user.id,
        session_name: questionValue,
      };

      const sessionResponse = await createSessionMutation.mutateAsync(sessionPayload);
      const sessionId = sessionResponse.data.id;

      // Step 2: Ask the question
      const questionPayload = {
        question: questionValue,
        session_id: sessionId,
        source: selectedOption,
      };

      await askQuestionMutation.mutateAsync(questionPayload);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChipClick = (chip) => {
    setQuestion(chip);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "left" }}>
        <TextField
          sx={{ maxWidth: 400 }}
          fullWidth
          variant="outlined"
          label="Ask something..."
          value={questionValue}
          size="small"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSendButtonClick}
          sx={{ml:2}}
          disabled={!selectedOption || createSessionMutation.isLoading || askQuestionMutation.isLoading}
        >
          {createSessionMutation.isLoading || askQuestionMutation.isLoading ? (
            <CircularProgress size={24} />
          ) : (
            "Send"
          )}
        </Button>
      </Box>

{createSessionMutation.isLoading || askQuestionMutation.isLoading ? <Box sx={{width:"50%",mt:3}}>
  <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '100%' }} />
  <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '100%' }} />
  <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '95%' }} />
  <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '90%' }} />
</Box> : <Box>
<RadioGroup
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        sx={{ marginTop: 2 }}
      >
        <FormControlLabel value="policy" control={<Radio />} label="policy" />
        <FormControlLabel value="ceew-website" control={<Radio />} label="ceew-website" />
      </RadioGroup>

      <Box sx={{ marginTop: 2 }}>
        {isLoading ? (
          <Box display={"flex"}>
            <Skeleton sx={{ borderRadius: 30, height: 45, width: 200, ml: 2 }} />
            <Skeleton sx={{ borderRadius: 30, height: 45, width: 200, ml: 2 }} />
          </Box>
        ) : (
          data?.data &&
          data?.data.map((item) => (
            <Chip
              key={item.question}
              label={item.question}
              onClick={() => handleChipClick(item.question)}
              sx={{ marginRight: 1 }}
            />
          ))
        )}
      </Box>
</Box>}


      
    </Box>
  );
};

export default ChatPanel;
