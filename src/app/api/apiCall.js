import { apiClient } from './apiClient'
import { apiEndpoints } from './apiEndpoint'


export const getSuggestedQuestions = async (params) => {
  return await apiClient.get(apiEndpoints.suggestedQuestions,params)
}

export const getChatHistory = async (params) => {
  return await apiClient.get(apiEndpoints.chatHistory,params)
}

export const getReasons = async (params) => {
  return await apiClient.get(apiEndpoints.dislikeReasons,params)
}

export const createSession = async (payload) => {
  return await apiClient.post(apiEndpoints.createSession,payload)
}

export const askQuestion = async (payload) => {
  return await apiClient.post(apiEndpoints.askQuestion,payload)
}

export const getSoloQuestionDetails = async (params) => {
  return await apiClient.get(apiEndpoints.soloQuestion,params)
}

export const submitaAppFeedback = async (payload) => {
  return await apiClient.post(apiEndpoints.overallFeedbacks,payload)
}

export const submitAnswerFeedback = async (payload) => {
  return await apiClient.post(apiEndpoints.questionFeedback,payload)
}




