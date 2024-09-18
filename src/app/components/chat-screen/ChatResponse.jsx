import React, { useState } from 'react';
import { Box, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, Popover, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useQuery } from 'react-query';
import { getReasons } from '@/app/api/apiCall';
import { useAuth } from '@/app/context/AuthContext';
import { useAnswerFeedback } from '@/app/hooks/useAnswerFeedback';

const ChatResponse = ({ responseText }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { user } = useAuth();

  const params = {
    user_id: user?.id,
    session_name: 'someSession'
  };

  const { data, error, isLoading } = useQuery(
    ['reasonsList', params],
    () => getReasons(params),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    }
  );

  const { mutate: submitFeedback, isLoading: isSubmitting } = useAnswerFeedback();

  const handleLike = () => {
    submitFeedback({
      answer_id: responseText.data.answer.id,
      is_helpful: 'true',
      custom_reason:"Good"
    });
  };

  const handleDislikeClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handleDislike = (reasonId) => {
    submitFeedback({
      answer_id: responseText.data.answer.id,
      is_helpful: 'false',
      reason_id: reasonId,
    });
    setPopoverOpen(false);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {responseText.data?.answer?.answer}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <IconButton onClick={handleLike} disabled={isSubmitting}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton onClick={handleDislikeClick} disabled={isSubmitting}>
              <ThumbDownIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {[{ title: responseText.data.answer.id, content: responseText.data.answer.metadata }].map((item, index) => (
            <Accordion key={index} elevation={3}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{item.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>

      <Popover
        id={id}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ padding: 2 }}>
          {data?.data && data?.data.map((item, index) => (
            <MenuItem key={index} onClick={() => handleDislike(item.id)}>
              {item.reason}
            </MenuItem>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default ChatResponse;
