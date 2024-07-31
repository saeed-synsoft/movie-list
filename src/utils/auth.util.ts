import { removeCookie, setCookie } from './cookie.util'



export const handleLogout = () => {
  removeCookie('token')
  window.location.replace('/auth/login')
}


export const setUser = (token: string) => {
  setCookie('token', token, 30)
  window.location.replace('/my-movies')
}