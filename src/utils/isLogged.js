import jwt_decode from "jwt-decode";


const isLogged = () => {
  const token = localStorage.getItem('jwt')
  if (token) {
    const decoded = jwt_decode(token)
    const expirationDate = new Date(decoded.exp * 1000)
    let now = new Date()
    if (expirationDate < now) {
      localStorage.removeItem('jwt')
    } else {
      return true
    }
  }
}


export default isLogged