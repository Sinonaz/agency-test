export const getProductTemplate = ({
  name,
  price,
  id,
  isAvailable,
  isSale,
  isExclusive,
  isContract,
  isNew,
  image,
}) => {
  return `<article tabindex="0" class="product" data-is-available="${isAvailable}" data-is-sale="${isSale}" data-is-exclusive="${isExclusive}" data-is-contract="${isContract}" data-is-new="${isNew}">
          <picture class="product__picture">
            <img src="${image}" width="279" height="279" alt="" class="product__img">
          </picture>

          <div class="product__content">
            <a href="#" class="product__name">${name}</a>
            <p class="product__price">${price} ₽</p>
            <button class="product__btn js-add-cart" data-id="${id}" type="button" aria-label="Добавить в корзину" disabled="${!isAvailable}">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <use xlink:href="/img/sprite.svg#plus"></use>
              </svg>
            </button>
          </div>
        </article>`
}
