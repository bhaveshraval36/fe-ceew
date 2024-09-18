import { useQuery } from 'react-query';
import { getSuggestedQuestions,getChatHistory, getSoloQuestionDetails } from '../api/apiCall';

export function useAllQuestions(params) {
  return useQuery(
    ['allQuestions', params],
    () => getChatHistory(params),
    // {
    //   staleTime: 1000 * 60 * 5, 
    //   cacheTime: 1000 * 60 * 10, 
    // }
  );
}

export function useSuggestedQuestions(params) {
    return useQuery(
      ['suggestedQuestions', params],
      () => getSuggestedQuestions(params),
      // {
      //   staleTime: 1000 * 60 * 5, 
      //   cacheTime: 1000 * 60 * 10, 
      // }
    );
  }
