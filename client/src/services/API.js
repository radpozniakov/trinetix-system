import axios from 'axios'
import {store} from '@/store/store'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth': store.getters.token
    }
  })
}