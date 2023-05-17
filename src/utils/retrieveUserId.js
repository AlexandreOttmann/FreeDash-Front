import jwt_decode from "jwt-decode";
import { axiosInstance } from '../api/axios'


export const retrieveUserId = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const decoded = jwt_decode(token)
    const userId = decoded.id;
    return userId;
  } else {
    console.log('pas de token')
  }

  // const token = localStorage.getItem('jwt')
  // if (token) {
  //   const decoded = jwt_decode(token)
  //   const id = decoded.id
  //   try {
  //     const userData = await axiosInstance.get(`/user/${id}`)
  //     console.log(userData.data)
  //   } catch (err) {
  //     console.log('Impossible de récupérer les données ou utilisateur non connecté', err)
  //   }
  // }
}