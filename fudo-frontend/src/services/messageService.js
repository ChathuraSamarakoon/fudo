import apiClient from './api';

const sendMessage = (messageData) => {
  return apiClient.post('/messages', messageData);
};

const messageService = {
  sendMessage,
};

export default messageService;