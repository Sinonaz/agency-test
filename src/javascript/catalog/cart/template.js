export const getCartItemTemplate = ({ name, id, price, image }, count) => {
  return `<article class="cart-item">
          <picture class="cart-item__picture">
            <img src="${image}" width="96" height="96" alt="">
          </picture>

          <a href="#" class="cart-item__name">${name}</a>
          <p class="cart-item__price">${price} ₽</p>

          <div class="cart-item__counter counter js-counter">
            <button type="button" class="counter__btn" data-id="${id}" data-increment aria-label="Увеличить счётчик на единицу">
              <svg width="16" height="16" viewBox="0 0 20 20">
                <use xlink:href="/img/sprite.svg#minus"></use>
              </svg>
            </button>
            <label class="counter__label">
              <span class="visually-hidden">Количество товаров в корзине</span>
              <input type="number" class="counter__input" readonly value="${count}" min="1">
            </label>
            <button type="button" class="counter__btn" data-id="${id}" data-decrement aria-label="Уменьшить счётчик на единицу">
              <svg width="16" height="16" viewBox="0 0 20 20">
                <use xlink:href="/img/sprite.svg#plus"></use>
              </svg>
            </button>
          </div>

          <div class="cart-item__actions">
            <button class="cart-item__action cart-item__action--remove" type="button"
                    aria-label="Удалить товар из корзины">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <use xlink:href="/img/sprite.svg#cross"></use>
              </svg>
            </button>
            <button class="cart-item__action cart-item__action--restore" type="button" aria-label="Восстановить товар">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <use xlink:href="/img/sprite.svg#repeat"></use>
              </svg>
            </button>
          </div>
        </article>`
}
