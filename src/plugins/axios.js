import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://example-app.test/api'
})

export { axiosInstance }
