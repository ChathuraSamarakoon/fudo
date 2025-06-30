import apiClient from './api';

const updateUserProfile = (userId, profileData) => {
  return apiClient.put(`/users/${userId}/profile`, profileData);
};

const updateUserPassword = (userId, passwordData) => {
  return apiClient.put(`/users/${userId}/password`, passwordData);
};

const userService = {
  updateUserProfile,
  updateUserPassword,
};

export default userService;