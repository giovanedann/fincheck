/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStorage, RemoveStorage, SetStorage } from '../../data/protocols/cache'

class LocalStorage implements SetStorage, GetStorage, RemoveStorage {
  set(key: string, value: any): void {
    if (!value) {
      localStorage.removeItem(key)
      return
    }

    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): string | null {
    const localStorageItem = localStorage.getItem(key)
    return localStorageItem ? JSON.parse(localStorageItem) : null
  }

  remove(key: string): void {
    return localStorage.removeItem(key)
  }
}

export default new LocalStorage()
