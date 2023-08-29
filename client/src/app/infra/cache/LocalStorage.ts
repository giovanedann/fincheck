/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStorage, SetStorage } from "../../data/protocols/cache"

class LocalStorage implements SetStorage, GetStorage {
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
}

export default new LocalStorage()
