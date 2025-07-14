import { eventEmitter } from '../../event-emitter/index.js'
import { Sort } from '../sort/index.js'

class Filter {
  #filterFormElement
  #filterInputElements

  #filters = new Set()
  #eventEmitter = eventEmitter

  constructor(rootElement) {
    this.#filterFormElement = rootElement.querySelector('.js-filter-form')
    this.#filterInputElements = this.#filterFormElement.querySelectorAll('input[type="checkbox"]')

    this.sort = new Sort(rootElement)
    this.#addListeners()
  }

  #addListeners() {
    this.onFilterFormChange = this.onFilterFormChange.bind(this)

    this.#filterFormElement.addEventListener('change', this.onFilterFormChange)
  }

  getFilteredData(data, sortType) {
    if (!this.#filters.size) {
      return this.sort.getSortedData(data, sortType)
    }

    let filteredData = []

    data.forEach((item) => {
      for (const filter of this.#filters) {
        if (Boolean(item[filter])) {
          filteredData.push(item)
          break
        }
      }
    })

    if (sortType) {
      return this.sort.getSortedData(filteredData, sortType)
    }

    return filteredData
  }

  onFilterFormChange({ target }) {
    if (target.type !== 'checkbox') return

    if (target.checked) {
      this.#filters.add(target.value)
    } else {
      this.#filters.delete(target.value)
    }

    this.#eventEmitter.emit('filter:update')
  }
}

export { Filter }
