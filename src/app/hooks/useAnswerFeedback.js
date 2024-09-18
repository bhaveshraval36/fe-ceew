import { useMutation } from 'react-query';
import { submitAnswerFeedback } from '../api/apiCall';

export const useAnswerFeedback = () => {
  return useMutation(submitAnswerFeedback);
};
