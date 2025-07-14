import { eventEmitter } from '../../event-emitter/index.js'

class Sort {
  #sortFormElement
  #sortBtnElement

  #eventEmitter = eventEmitter

  constructor(rootElement) {
    this.#sortFormElement = rootElement.querySelector('.js-sort-form')
    this.#sortBtnElement = this.#sortFormElement.querySelector('.js-sort-btn')

    this.#addListeners()
  }

  getSortedData(data, sortType = 'cheap') {
    switch (sortType) {
      case 'expensive':
        return data.toSorted((prevItem, nextItem) => {
          return Math.round(prevItem.price) < Math.round(nextItem.price)
        })
      case 'cheap':
        return data.toSorted((prevItem, nextItem) => {
          return Math.round(prevItem.price) > Math.round(nextItem.price)
        })
      case 'new':
        return data.toSorted((prevItem, nextItem) => {
          return Boolean(prevItem.isNew) < Boolean(nextItem.isNew)
        })
      case 'sale':
        return data.toSorted((prevItem, nextItem) => {
          return Boolean(prevItem.isSale) < Boolean(nextItem.isSale)
        })
    }
  }

  onSortFormChange({ target }) {
    this.#eventEmitter.emit('sort:change', target.value)

    this.#sortBtnElement.textContent = target.dataset.value
  }

  #addListeners() {
    this.onSortFormChange = this.onSortFormChange.bind(this)

    this.#sortFormElement.addEventListener('change', this.onSortFormChange)
  }
}

export { Sort }
