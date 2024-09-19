import axios from "axios"


export const instanceAxios = axios.create({
  baseURL: 'https://ecofriend-api.ru.tuna.am',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': window.location.origin
  }
  });