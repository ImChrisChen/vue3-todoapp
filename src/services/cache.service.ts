interface CacheOptions {
  time?: number
  id?: string
}

interface CacheContent extends CacheOptions {
  value: unknown
}

// 需要使用Key时需要在这里注册
type CacheKey = 'todolist'

class CacheService {
  cacheKey = 'TodoAppCache:'
  defaultExpireTime = 1000 * 60 * 15 // 默认缓存时间15分钟

  private getKey(key: string) {
    return this.cacheKey + key
  }

  setItem(key: CacheKey, value, options: CacheOptions = {}) {
    try {
      const finalKey = this.getKey(key)
      const content: CacheContent = {
        time: (options.time || this.defaultExpireTime) + Date.now(),
        id: options.id || '',
        value: value,
      }
      localStorage.setItem(finalKey, JSON.stringify(content))
      return true
    } catch (e) {
      return false
    }
  }

  getItem(key: CacheKey, options: Omit<CacheOptions, 'time'> = {}) {
    if (!key) {
      new Error('key为必须')
      return null
    }

    let content = {} as CacheContent

    try {
      const finalKey = this.getKey(key)
      const jsonStr: string = localStorage.getItem(finalKey) || '{}'
      content = JSON.parse(jsonStr)
    } catch (e) {
      console.error(e)
    }

    // id mismatch
    if (options.id && content.id && options.id !== content.id) {
      return null
    }

    // availability time
    if (!content.time || content.time < Date.now()) {
      return null
    }

    return content.value
  }

  removeItem(key: string) {
    return localStorage.removeItem(key)
  }
}

export const cacheService = new CacheService()
