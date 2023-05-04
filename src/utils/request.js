import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_SERVER_URL,
  timeout: 3000,
})

request.interceptors.request.use((request) => {
  const { userState } = JSON.parse(localStorage.getItem('recoil-persist'))
  if (userState.token) {
    request.headers['Authorization'] = `Bearer ${userState.token}`
  }
  return request
})

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
    return response
  },
  async (error) => {
    // if (error.response.status === 403) {
    //   localStorage.removeItem('recoil-persist')
    //   alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
    //   window.location.href = '/'
    // } else {
    //   alert(error.response.data.msg)
    // }
    return Promise.reject(error)
  },
)

export default request
