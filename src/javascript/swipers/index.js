import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

const navigationOptions = {
  prevEl: '.slide-btn--prev',
  nextEl: '.slide-btn--next',
}

const paginationOptions = {
  el: '.pagination',
  bulletClass: 'pagination__item',
  bulletActiveClass: 'pagination__item--active',
}

class Swipers {
  init() {
    this.promoSwiper = new Swiper('.js-promo-swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 1000,
      navigation: navigationOptions,
      pagination: paginationOptions,
      slideActiveClass: 'slider__item--active',
    })
  }
}

export { Swipers }
