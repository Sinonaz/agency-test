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
