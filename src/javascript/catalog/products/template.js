export const getProductTemplate = ({ name, price, id, isAvailable, isSale, image }) => {
  return `<article tabindex="0" class="product" data-is-sale="${isSale}">
          <picture class="product__picture">
            <source srcset="./img/components/product/img-${id}.webp" type="image/webp">
            <img src="./img/components/product/img-${id}.png" width="279" height="279" alt="" class="product__img">
          </picture>

          <div class="product__content">
            <a href="#" class="product__name">${name}</a>
            <p class="product__price">${price}&nbsp;₽</p>
            <button class="product__btn js-add-cart" data-open-target="js-cart-modal" data-id="${id}" type="button" ${!isAvailable ? 'disabled' : 'aria-label="Добавить в корзину"'}>
            ${
              !isAvailable
                ? 'Недоступно'
                : '<svg width="20" height="20" viewBox="0 0 20 20">\n' +
                  '                <use' +
                  ' xlink:href="./img/sprite.svg#plus"></use>\n              </svg>'
            }

            </button>
          </div>
        </article>`
}
