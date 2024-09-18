"use client";
import { useForm } from 'react-hook-form';
import { Modal, Box, TextField, Button } from '@mui/material';
import useSubmitFeedback from '@/app/hooks/useSubmitFeedback'; // Make sure to import your custom hook
import { useAuth } from '@/app/context/AuthContext';

const FeedbackModal = ({ open, onClose }) => {
  const {user} = useAuth();
  const { register, handleSubmit } = useForm();
  const { mutate, isLoading } = useSubmitFeedback();

  const onSubmit = (data) => {
    data ={
      user_id:user?.id,
      feedback:data.feedback
    }
    mutate(data, {
      onSuccess: () => {
        onClose(); 
      }
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: '#fff', margin: 'auto', maxWidth: 400, marginTop: '10vh' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Your Feedback"
            fullWidth
            {...register('feedback')}
            sx={{ marginBottom: 2 }}
            multiline
            rows={5}
            disabled={isLoading} // Disable input when loading
          />
          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
