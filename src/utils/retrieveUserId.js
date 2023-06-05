import jwt_decode from "jwt-decode";

export const retrieveUserId = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const decoded = jwt_decode(token)
    const userId = decoded.id;
    return userId;
  } else {
    console.log('pas de token')
  }


}