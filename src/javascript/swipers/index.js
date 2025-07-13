import Swiper from 'swiper'
import { Navigation, Grid, Pagination } from 'swiper/modules'

class Swipers {
  init() {
    this.cardsSwiper = new Swiper('.js-cards-swiper', {
      modules: [Navigation],
      spaceBetween: 20,
      slidesPerView: 'auto',
      navigation: {
        prevEl: '.slide-btn--prev',
        nextEl: '.slide-btn--next',
      },
      breakpoints: {
        767: {
          slidesPerView: 2,
        },
        1023: {
          slidesPerView: 3,
        },
      },
    })

    this.reviewsSwiper = new Swiper('.js-reviews-swiper', {
      modules: [Navigation],
      spaceBetween: 20,
      slidesPerView: 'auto',
      navigation: {
        prevEl: '.slide-btn--prev',
        nextEl: '.slide-btn--next',
      },
      breakpoints: {
        1023: {
          slidesPerView: 3,
        },
        1399: {
          slidesPerView: 4,
        },
      },
    })

    this.servicesSwiper = new Swiper('.js-services-swiper', {
      modules: [Navigation, Grid, Pagination],
      slidesPerView: 1,
      grid: {
        fill: 'row',
        rows: 2,
      },
      spaceBetween: 17,
      navigation: {
        prevEl: '.slide-btn--prev',
        nextEl: '.slide-btn--next',
      },
      pagination: {
        el: '.slide-pagination',
        bulletActiveClass: 'active',
      },
      breakpoints: {
        767: {
          slidesPerView: 2,
        },
      },
    })

    this.productCardSwiper = new Swiper('.js-product-card-swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      navigation: {
        prevEl: '.product-card__slide-btn--prev',
        nextEl: '.product-card__slide-btn--next',
        disabledClass: 'product-card__slide-btn--disabled',
      },
      pagination: {
        el: '.product-card__pagination',
        type: 'fraction',
        bulletActiveClass: 'active',
      },
    })

    this.productSwiper = new Swiper('.js-product-swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      navigation: {
        prevEl: '.product__slide-btn--prev',
        nextEl: '.product__slide-btn--next',
      },
      pagination: {
        el: '.product__pagination',
        type: 'fraction',
        bulletClass: 'product__bullet',
        bulletActiveClass: 'active',
      },
      breakpoints: {
        1025: {
          pagination: {
            el: '.product__pagination',
            type: 'bullets',
            bulletClass: 'product__bullet',
            clickable: true,
            renderBullet: function (index, className) {
              const picture = this.slides[index]
              const source = picture.querySelector('source')
              const img = picture.querySelector('img')

              return `<picture class="${className}">
                        <source srcset="${source.srcset}">
                        <img src="${img.src}" width="108" height="87" alt="">
                      </picture>`
            },
          },
        },
      },
    })
  }
}

export { Swipers }
