import {KeyboardKeys} from "../utils/constants.js";

class Modals {
  #modalElement

  #body = document.body
  #focusedElement = null
  #lastElement = null

  constructor() {
    document.addEventListener('click', this.onDocumentClick)
  }

  #setLastElement() {
    const elements = this.#modalElement.querySelectorAll(`a, button, [tabindex]:not([tabindex='-1'])`)
    this.#lastElement = elements[elements.length - 1]
  }

  /**
   * Фокусируем первый элемент меню после его открытия
   */
  #focusMenuElement() {
    if (!this.#modalElement) return

    setTimeout(() => {
      this.#modalElement.focus()
    }, 300)
  }

  #setModalTabIndex() {
    if (!this.#modalElement) {
      this.#modalElement.removeAttribute('tabindex')
    } else {
      this.#modalElement.setAttribute('tabindex', `0`)
    }
  }

  /**
   * Возвращаем фокус на элемент откуда было произведено открытие меню
   */
  #returnFocusOnButtonElement() {
    if (this.#modalElement) return

    this.#focusedElement.focus()
  }

  #hideModal() {
    if (!this.#modalElement) return

    this.#fadeOut(this.#modalElement)

    this.#modalElement.dataset.isModalOpen = 'false'

    this.#body.style.overflow = ''

    this.#returnFocusOnButtonElement()
    this.#focusedElement = null

    document.removeEventListener('keydown', this.onKeyboardPress)
  }

  #showModal() {
    if (!this.#modalElement) return

    this.#fadeIn(this.#modalElement, this.#modalElement.dataset.displayType)

    this.#modalElement.dataset.isModalOpen = 'true'

    this.#body.style.overflow = 'hidden'

    this.#setModalTabIndex()
    this.#focusMenuElement()
    this.#setLastElement()

    document.addEventListener('keydown', this.onKeyboardPress)
  }

  onKeyboardPress = (evt) => {
    if (evt.code === KeyboardKeys.ESCAPE) {
      if (this.#modalElement) {
        this.#hideModal()
      }
      return
    }

    const currentFocusedElement = document.activeElement

    if (evt.shiftKey && evt.code === KeyboardKeys.TAB) {
      if (currentFocusedElement === this.#modalElement) {
        evt.preventDefault()
        this.#modalElement.focus()
      }
    }

    if (evt.code === KeyboardKeys.TAB) {
      if (currentFocusedElement === this.#lastElement) {
        evt.preventDefault()
        this.#modalElement.focus()
      }
    }
  }

  onDocumentClick = ({ target }) => {
    switch (true) {
      case Boolean(target.dataset.isModalOpen):
        this.#hideModal()
        break
      case Boolean(target.closest('[data-open-target]')):
        const openBtnElement = target.dataset.openTarget
          ? target
          : target.closest('[data-open-target]')
        this.#modalElement = document.querySelector(`.${openBtnElement.dataset.openTarget}`)
        this.#focusedElement = openBtnElement
        this.#showModal()
        break
      case Boolean(target.closest('[data-close-target]')):
        const closeBtnElement = target.dataset.closeTarget
          ? target
          : target.closest('[data-close-target]')
        this.#modalElement = document.querySelector(`.${closeBtnElement.dataset.closeTarget}`)
        this.#hideModal()
        break
      default:
        return
    }
  }

  #fadeIn(element, display, timeout = 200) {
    element.style.opacity = '0'
    element.style.display = display || 'flex'
    element.style.transition = `opacity ${timeout}ms`
    setTimeout(() => {
      element.style.opacity = '1'
    }, 10)
  }

  #fadeOut(element, timeout = 200) {
    element.style.opacity = '1'
    element.style.transition = `opacity ${timeout}ms`
    element.style.opacity = '0'

    setTimeout(() => {
      element.style.display = 'none'
    }, timeout)
  }
}

export { Modals }
