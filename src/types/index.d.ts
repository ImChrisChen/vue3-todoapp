import { Store } from 'vuex'

Array.prototype.lastItem = function () {
  return this[this.length - 1]
}

Array.prototype.deleteItem = function (i: number) {
  this.splice(i, 1)
  return this
}

Array.prototype.addItem = function <T>(i: number, ...items: Array<T>): Array<T> {
  const lastIndex = this.length - 1
  const tempArr: Array<T> = []

  for (let j = i; j <= lastIndex; j++) {
    tempArr.push(this[j])
  }

  const arr = [...items, ...tempArr]
  for (let j = 0; j < arr.length; j++) {
    this[i] = arr[j]
    i++
  }

  return this
}

declare global {
  interface Window {
    store: Store<any>
  }

  interface Array<T> {
    lastItem: () => T
    deleteItem: (i: number) => Array<T>
    addItem: (i: number, item: Array<T>) => Array<T>
    addItem: (i: number, item: T) => Array<T>
  }
}

window.store = window.store || {}
