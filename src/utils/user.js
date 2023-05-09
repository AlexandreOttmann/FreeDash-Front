export const getUserDataFromLocalStorage = () => {
  const userDataStr = localStorage.getItem('user');
  const userData = userDataStr ? (JSON.parse(userDataStr)) : null;
  return userData;
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('user');
};