import axios from "axios"


export const instanceAxios = axios.create({
    baseURL: 'https://localhost:8000/api/v1/',
    headers: {'X-Custom-Header': 'foobar'}
  });