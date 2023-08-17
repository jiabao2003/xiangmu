
export function setToken(token) {
  localStorage.setItem('my_token', token)
}

export function getToken() {
  return localStorage.getItem('my_token')
}

export function removeToken() {
  localStorage.removeItem('my_token')
}