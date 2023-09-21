/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStorage, RemoveStorage, SetStorage } from 'app/domain/protocols/cache'

class LocalStorage implements SetStorage, GetStorage, RemoveStorage {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get<T = string>(key: string): T | null {
    const localStorageItem = localStorage.getItem(key)
    return localStorageItem ? JSON.parse(localStorageItem) as T : null
  }

  remove(key: string): void {
    return localStorage.removeItem(key)
  }
}

export default new LocalStorage()
