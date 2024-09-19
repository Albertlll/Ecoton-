import axios from "axios"


export const instanceAxios = axios.create({
  baseURL: 'https://ecofriend-api.ru.tuna.am',
  withCredentials: true,
  // headers: {
  //   'Origin': window.location.origin
  // }
  });