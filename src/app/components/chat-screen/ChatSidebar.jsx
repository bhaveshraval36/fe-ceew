"use client"
import { useAuth } from '@/app/context/AuthContext';
import { useAllQuestions } from '@/app/hooks/useQuestions';
import { getSoloQuestionDetails } from '@/app/api/apiCall';
import { List, ListItem, Box, Skeleton, Tooltip, Typography, Button } from '@mui/material';

const ChatSidebar = ({ onNewQuery, onOpenFeedback, onSelectAnswer }) => {
  const { user } = useAuth()
  const { data: data, error, isLoading } = useAllQuestions({
    user_id: user?.id,
    session_name: "test session"
  });
  if (error) return <p>Error: {error.message}</p>


  const handleItemClick = async (item) => {
    try {
      const params = {
        user_id: user?.id,
        session_id: item.session_id
      }
      const response = await getSoloQuestionDetails(params);
      console.log(response)
      const { data } = response;
      onSelectAnswer({ data:{answer: data[0].answers[0]} });
    } catch (error) {
      console.error('Error fetching single question details:', error);
      throw error;
    }
  };

  return (
    <Box sx={{ width: 250, display: 'flex', width: '250px', flexDirection: 'column', justifyContent: 'space-between', height: "100%", backgroundColor: '#f4f4f4', padding: 2 }}>
      <Box sx={{ overflow: "auto", height: "100%" }}>
        <Button variant="contained" fullWidth onClick={onNewQuery}>
          New Query
        </Button>
        <List>
          {
            isLoading && <Box sx={{ width: "100%" }}>
              <Skeleton height={40} animation="wave" />
              <Skeleton height={40} animation="wave" />
              <Skeleton height={40} animation="wave" />
            </Box>
          }
          {data?.data && data?.data.map((item) => (
            <ListItem
              sx={{
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)", // Add hover effect
                },
              }}
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <Tooltip title={item.question} placement="bottom" slotProps={{
                tooltip: {
                  sx: {
                    width: 230
                  },
                },
              }}>
                <Typography
                  noWrap
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    whiteSpace: "pre-wrap", // Ensure text wraps correctly
                    wordBreak: "break-word", // Ensure long words break correctly
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      bottom: 0,
                      left: 0,
                    },
                  }}
                >
                  {item.question}
                </Typography>
              </Tooltip>
            </ListItem>

          ))}
        </List>
      </Box>

      <Button variant="outlined" fullWidth onClick={onOpenFeedback}>
        Feedback
      </Button>
    </Box>
  );
};

export default ChatSidebar;
