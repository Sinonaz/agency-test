export const getCartItemTemplate = (cartId, { name, id, price, image }, count) => {
  return `<article class="cart-item" data-id="${cartId}">
          <picture class="cart-item__picture">
            <source srcset="./img/components/product/img-${id}.webp" type="image/webp">
            <img src="./img/components/product/img-${id}.png" width="96" height="96" alt="">
          </picture>

          <a href="#" class="cart-item__name">${name}</a>
          <p class="cart-item__price">${price} ₽</p>

          <div class="cart-item__counter counter js-counter" data-id="${id}">
            <button type="button" class="counter__btn" data-decrement aria-label="Увеличить счётчик на единицу">
              <svg width="16" height="16" viewBox="0 0 20 20">
                <use xlink:href="./img/sprite.svg#minus"></use>
              </svg>
            </button>
            <label class="counter__label">
              <span class="visually-hidden">Количество товаров в корзине</span>
              <input type="number" class="counter__input" readonly value="${count}" min="1">
            </label>
            <button type="button" class="counter__btn" data-increment aria-label="Уменьшить счётчик на единицу">
              <svg width="16" height="16" viewBox="0 0 20 20">
                <use xlink:href="./img/sprite.svg#plus"></use>
              </svg>
            </button>
          </div>

          <div class="cart-item__actions">
            <button class="cart-item__action cart-item__action--remove js-remove" data-cart-id="${cartId}" data-id="${id}" type="button"
                    aria-label="Удалить товар из корзины">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <use xlink:href="./img/sprite.svg#cross"></use>
              </svg>
            </button>
            <button class="cart-item__action cart-item__action--restore js-restore" data-cart-id="${cartId}" data-id="${id}" type="button" aria-label="Восстановить товар">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <use xlink:href="./img/sprite.svg#repeat"></use>
              </svg>
            </button>
          </div>
        </article>`
}

export const getEmptyStateTemplate = () => {
  return `<div class="cart__empty">
      <img src="./img/icons/empty-box.svg" width="100" height="100" alt="">
  <p>Корзина пуста</p>
</div>`
}
