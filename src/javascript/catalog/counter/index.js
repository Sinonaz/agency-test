import { eventEmitter } from '../../event-emitter/index.js'

class Counter {
  #counterElement

  #eventEmitter = eventEmitter

  init() {
    this.#addListeners()
  }

  #addListeners() {
    this.onDocumentClick = this.onDocumentClick.bind(this)

    document.addEventListener('click', this.onDocumentClick)
  }

  #increment(input, id) {
    input.value = parseFloat(input.value) + 1

    this.#eventEmitter.emit('cart:add', id)
  }

  #decrement(input, id) {
    if (parseFloat(input.value) > 1) {
      input.value = parseFloat(input.value) - 1
    }

    this.#eventEmitter.emit('cart:delete', id)
  }

  onDocumentClick({ target }) {
    this.#counterElement = target.closest('.js-counter')

    if (this.#counterElement) {
      const inputElement = this.#counterElement.querySelector('input[type="number"]')
      const id = this.#counterElement.dataset.id

      switch (true) {
        case target.hasAttribute('data-increment'):
          this.#increment(inputElement, id)
          break
        case target.hasAttribute('data-decrement'):
          this.#decrement(inputElement, id)
          break
      }
    }
  }
}

export { Counter }
