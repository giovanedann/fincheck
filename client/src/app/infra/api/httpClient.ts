import axios from 'axios'
import { env } from 'app/config/env'
import LocalStorage from 'app/infra/cache/LocalStorage'
import { localStorageKeys } from 'app/config/localStorageKeys'
import { sleep } from 'app/utils'

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
