import { Products } from './products/index.js'
import { Counter } from './counter/index.js'

export function initCatalog() {
  const rootElement = document.querySelector('.js-catalog')

  if (!rootElement) return

  const products = new Products(rootElement)
  products.init()
  new Counter().init()
}
