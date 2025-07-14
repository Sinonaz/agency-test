export function renderElement(parent, template) {
  const element = createElement(template)
  parent.append(element)

  return element
}

export function createElement(template) {
  const newElement = document.createElement('div')
  newElement.innerHTML = template

  return newElement.firstChild
}

export const getDeclension = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}

export const formattedPrice = (price) => new Intl.NumberFormat(`ru-RU`).format(price)
