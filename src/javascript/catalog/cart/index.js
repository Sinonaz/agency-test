import axios from 'axios'
import { formattedPrice, getDeclension, renderElement } from '../../utils/utils.js'
import { getCartItemTemplate, getEmptyStateTemplate } from './template.js'
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
    this.#renderCartData()
    this.#updateCartAmount()
    this.#updateTotalAmount()
    this.#updateTotalPrice()
    this.#addListeners()
  }

  #addListeners() {
    this.onDocumentClick = this.onDocumentClick.bind(this)
    this.onModalOpen = this.onModalOpen.bind(this)
    this.onModalClose = this.onModalClose.bind(this)

    document.addEventListener('click', this.onDocumentClick)
    this.#eventEmitter.on('cart-modal:open', this.onModalOpen)
    this.#eventEmitter.on('cart-modal:close', this.onModalClose)
    this.#eventEmitter.on('cart:add', (id) => this.#addToCart(id))
    this.#eventEmitter.on('cart:delete', (id) => this.#deleteFromCart(id))
  }

  #updateCartAmount() {
    this.#cartCountElement.dataset.count = `${this.#cart.length}`
  }

  async #deleteFromCart(id, all = false) {
    const cartItem = this.#cart.find(({ product, count }) => product.id === id)
    const cartId = cartItem.id
    const productCount = cartItem.count

    if (productCount === 1 || all) {
      try {
        const { data } = await axios.delete(`${this.#url}${cartId}`)

        const cartItemIndex = this.#cart.findIndex((item) => item.id === cartId)
        this.#cart.splice(cartItemIndex, 1)

        this.#setRemovedClass(cartId)
        this.#updateTotalAmount()
        this.#updateTotalPrice()

        return data
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        cartItem.count--

        const { data } = await axios.put(`${this.#url}${cartId}`, {
          count: cartItem.count,
        })

        this.#updateTotalAmount()
        this.#updateTotalPrice()

        return data
      } catch (error) {
        console.log(error)
      }
    }
  }

  async #addToCart(id, initialCount = 1) {
    if (this.#cart.length) {
      const cartItem = this.#cart.find(({ product, count }) => product.id === id)

      if (cartItem) {
        const cartId = cartItem.id
        cartItem.count++

        try {
          const { data } = await axios.put(`${this.#url}${cartId}`, {
            count: cartItem.count,
          })

          this.#renderCartData()
          this.#updateTotalAmount()
          this.#updateTotalPrice()

          return data
        } catch (error) {
          console.log(error)
        }
      }
    }

    const product = this.#products.find((item) => item.id === id)

    if (!product) return

    try {
      const { data } = await axios.post(this.#url, { product, count: initialCount })

      this.#cart.push(data)
      this.#renderCartData()
      this.#updateTotalAmount()
      this.#updateTotalPrice()

      return data
    } catch (error) {
      console.log(error)
    }
  }

  #renderCartData() {
    this.#cartListElement.innerHTML = ''

    if (this.#cart.length) {
      for (const { id, product, count } of this.#cart) {
        renderElement(this.#cartListElement, getCartItemTemplate(id, product, count))
      }
    } else {
      renderElement(this.#cartListElement, getEmptyStateTemplate())
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

    this.#cartCountElement.dataset.count = amount
  }

  #updateTotalPrice() {
    const price = this.#cart.reduce((acc, { product, count }) => {
      return acc + parseFloat(product.price) * count
    }, 0)

    this.#totalPriceElement.textContent = `${formattedPrice(price)} ₽`
  }

  #setRemovedClass(id) {
    const removedItemElement = this.#cartListElement.querySelector(`article[data-id="${id}"]`)

    removedItemElement.classList.add('cart-item--removed')
  }

  #deleteRemovedClass(id) {
    const removedItemElement = this.#cartListElement.querySelector(`article[data-id="${id}"]`)

    removedItemElement.classList.remove('cart-item--removed')
  }

  async #clearCart() {
    if (this.#cart.length > 0) {
      try {
        this.#setLoadingStatus()
        for (const item of this.#cart) {
          await axios.delete(`${this.#url}${item.id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }

    this.#setLoadingStatus(false)
    this.#cart = []
    this.#updateTotalAmount()
    this.#updateTotalPrice()
    this.#renderCartData()
  }

  #setLoadingStatus(status = true) {
    this.#cartElement.setAttribute('data-loading', status)
  }

  async onDocumentClick({ target }) {
    switch (true) {
      case Boolean(target.closest('.js-add-cart')):
        await this.#addToCart(target.dataset.id)
        break
      case Boolean(target.closest('.js-restore')):
        const cartItemElement = target.closest('article')
        const countInputElement = cartItemElement.querySelector('input[type="number"]')

        await this.#addToCart(target.dataset.id, parseFloat(countInputElement.value))
        break
      case Boolean(target.closest('.js-remove')):
        await this.#deleteFromCart(target.dataset.id, true)

        this.#setRemovedClass(target.dataset.cartId)
        break
      case Boolean(target.closest('.js-clear')):
        await this.#clearCart()
        break
    }
  }

  onModalClose() {
    this.#cartElement.classList.remove('side-modal__wrapper--open')
  }

  onModalOpen() {
    setTimeout(() => {
      this.#cartElement.classList.add('side-modal__wrapper--open')
    }, 200)
  }
}

export { Cart }
