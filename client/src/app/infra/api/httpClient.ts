import axios from 'axios'
import { env } from '../../config/env'
import LocalStorage from '../cache/LocalStorage'
import { localStorageKeys } from '../../config/localStorageKeys'
import { sleep } from '../../utils/sleep'

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
})

httpClient.interceptors.request.use(config => {
  const accessToken = LocalStorage.get(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
})

httpClient.interceptors.response.use(async data => {
  await sleep(1000);

  return data;
})
