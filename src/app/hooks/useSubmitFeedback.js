import { useMutation } from 'react-query';
import { submitaAppFeedback } from '../api/apiCall';

const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = submitaAppFeedback(data);
      return response.data;
    },
    onSuccess: () => {
      alert('Feedback submitted successfully!');
    },
    onError: (error) => {
      alert('Error submitting feedback. Please try again.');
    },
  });
};

export default useSubmitFeedback;
