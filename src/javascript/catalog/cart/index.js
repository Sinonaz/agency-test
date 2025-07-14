import axios from 'axios'
import { formattedPrice, getDeclension, renderElement } from '../../utils/utils.js'
import { getCartItemTemplate } from './template.js'
import { eventEmitter } from '../../event-emitter/index.js'

class Cart {
  #cartCountElement
  #cartListElement
  #cartAmountElement
  #cartElement
  #totalPriceElement

  #url = 'https://687389e6c75558e273547d8f.mockapi.io/api/cart/'
  #eventEmitter = eventEmitter
  #products = []
  #cart = []

  constructor(products) {
    this.#products = products
  }

  async init() {
    this.#cartElement = document.querySelector('.js-cart')
    this.#cartListElement = this.#cartElement.querySelector('.js-cart-list')
    this.#cartAmountElement = this.#cartElement.querySelector('.js-amount')
    this.#totalPriceElement = this.#cartElement.querySelector('.js-total-price')
    this.#cartCountElement = document.querySelector('.js-cart-count')

    await this.#fetchCart()
    this.#updateCartAmount()
    this.#addListeners()
  }

  #addListeners() {
    this.onDocumentClick = this.onDocumentClick.bind(this)
    this.onModalOpen = this.onModalOpen.bind(this)
    this.onModalClose = this.onModalClose.bind(this)

    document.addEventListener('click', this.onDocumentClick)
    this.#eventEmitter.on('cart-modal:open', this.onModalOpen)
    this.#eventEmitter.on('cart-modal:close', this.onModalClose)
  }

  #updateCartAmount() {
    this.#cartCountElement.dataset.count = `${this.#cart.length}`
  }

  async #deleteFromCart(id) {
    const cartItem = this.#cart.find(({ product, count }) => product.id === id)
    const cartId = cartItem.id
    const productCount = cartItem.count

    if (productCount === 1) {
      try {
        const { data } = await axios.delete(`${this.#url}${cartId}`)

        const cartItemIndex = this.#cart.findIndex((item) => item.id === cartId)
        this.#cart.splice(cartItemIndex, 1)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        cartItem.count--

        const { data } = await axios.put(`${this.#url}${cartId}`, {
          count: cartItem.count,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  async #addToCart(id) {
    if (this.#cart.length) {
      const cartItem = this.#cart.find(({ product, count }) => product.id === id)

      if (cartItem) {
        const cartId = cartItem.id
        cartItem.count++

        try {
          const { data } = await axios.put(`${this.#url}${cartId}`, {
            count: cartItem.count,
          })
        } catch (error) {
          console.log(error)
        }

        return
      }
    }

    const product = this.#products.find((item) => item.id === id)

    if (!product) return

    try {
      const { data } = await axios.post(this.#url, { product, count: 1 })

      this.#cart.push(data)
      this.#updateCartAmount()
    } catch (error) {
      console.log(error)
    }
  }

  #renderCartItems() {
    this.#cartListElement.innerHTML = ''

    for (const item of this.#cart) {
      renderElement(this.#cartListElement, getCartItemTemplate(item.product, item.count))
    }
  }

  async #fetchCart() {
    try {
      const { data } = await axios.get(this.#url)

      data.forEach((item) => this.#cart.push(item))
    } catch (error) {
      console.log(error)
    }
  }

  #updateTotalAmount() {
    const amount = this.#cart.reduce((acc, { count }) => acc + count, 0)

    this.#cartAmountElement.textContent = `${amount} ${getDeclension(amount, ['товар', 'товара', 'товаров'])}`
  }

  #updateTotalPrice() {
    const price = this.#cart.reduce((acc, { product, count }) => {
      return acc + parseFloat(product.price) * count
    }, 0)

    this.#totalPriceElement.textContent = `${formattedPrice(price)} ₽`
  }

  onDocumentClick({ target }) {
    switch (true) {
      case Boolean(target.closest('.js-add-cart')):
        void this.#addToCart(target.dataset.id)
    }
  }

  onModalClose() {
    this.#cartElement.classList.remove('side-modal__wrapper--open')
  }

  onModalOpen() {
    this.#renderCartItems()

    this.#updateTotalAmount()
    this.#updateTotalPrice()

    setTimeout(() => {
      this.#cartElement.classList.add('side-modal__wrapper--open')
    }, 200)
  }
}

export { Cart }
