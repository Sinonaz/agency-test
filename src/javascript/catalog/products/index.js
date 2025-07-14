import axios from 'axios'
import { getDeclension, renderElement } from '../../utils/utils.js'
import { getProductTemplate } from './template.js'
import { Filter } from '../filter/index.js'
import { eventEmitter } from '../../event-emitter/index.js'

class Products {
  #productListElement
  #countElement

  #url = 'https://687389e6c75558e273547d8f.mockapi.io/api/products'
  #eventEmitter = eventEmitter
  #products = null
  #sortType = 'cheap'

  constructor(rootElement) {
    this.rootElement = rootElement
  }

  init() {
    this.#productListElement = this.rootElement.querySelector('.js-products')
    this.#countElement = this.rootElement.querySelector('.js-total')
    this.filter = new Filter(this.rootElement)

    void this.fetchProducts()
    this.#addListeners()
  }

  async fetchProducts() {
    try {
      const { data } = await axios.get(this.#url)

      if (data) {
        this.#products = data

        this.#renderProducts(this.#products)
      }
    } catch (error) {
      console.log(error)
    }
  }

  #renderProducts(products) {
    this.#productListElement.innerHTML = ''
    const filteredProducts = this.filter.getFilteredData(products, this.#sortType)
    const productLength = filteredProducts.length

    for (const product of filteredProducts) {
      renderElement(this.#productListElement, getProductTemplate(product))
    }

    this.#countElement.textContent = `${productLength} ${getDeclension(productLength, ['товар', 'товара', 'товаров'])}`
  }

  #addListeners() {
    this.#eventEmitter.on('filter:update', () => {
      this.#renderProducts(this.#products)
    })

    this.#eventEmitter.on('sort:change', (sortType) => {
      this.#sortType = sortType
      this.#renderProducts(this.#products)
    })
  }
}

export { Products }
