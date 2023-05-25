import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const isLogged = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('jwt')
  if (token) {
    const decoded = jwt_decode(token)
    const expirationDate = new Date(decoded.exp * 1000)
    let now = new Date()
    if (expirationDate < now) {
      localStorage.removeItem('jwt')
      navigate('/login')
    } else {
      return true
    }
  }
}


export default isLogged