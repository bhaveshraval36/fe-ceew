const url = `/api/v1`

export const apiEndpoints = {
  suggestedQuestions: `${url}/questions-master`,
  chatHistory: `${url}/questions`,
  dislikeReasons: `${url}/reasons-master`,
  askQuestion: `${url}/questions`,
  createSession: `${url}/sessions`,
  soloQuestion: `${url}/questions-answer-by-session-id/1`,
  overallFeedbacks: `${url}/overallFeedbacks`,
  questionFeedback: `${url}/feedbacks`,
}
