<template>
  <section class="home">
    <div class="home__wrapper">
      <main class="home__main">
        <Header />
        <div class="home__content">
          <div class="home__intro">
            <h1 class="title home__title">
              Каршеринг <span>Need for drive</span>
            </h1>
            <div class="home__desc">Поминутная аренда авто твоего города</div>
          </div>
          <a href="#" class="btn home__btn">Забронировать</a>
        </div>
        <Footer />
      </main>
      <div class="home__slider">
        <div class="slider">
          <div class="slider__slide slide">
            <img
              src="~@/assets/img/slide-1.jpg"
              alt="Slider image"
              class="slide__img"
            />
            <div class="slide__content">
              <div class="slide__title">Бесплатная парковка</div>
              <div class="slide__desc">
                Оставляйте машину на платных городских парковках и разрешенных
                местах, не нарушая ПДД, а также в аэропортах.
              </div>
              <a href="#" class="btn btn--color-reverse slide__btn"
                >Подробнее</a
              >
            </div>
          </div>
        </div>
        <div class="slider__controls">
          <button class="slider__arrow slider__arrow--left"></button>
          <button class="slider__arrow slider__arrow--right"></button>
        </div>
        <div class="slider__dots">
          <button class="slider__dot"></button>
          <button class="slider__dot active"></button>
          <button class="slider__dot"></button>
          <button class="slider__dot"></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
export default {
  name: 'Home',
  components: {
    Header,
    Footer,
  },
};
</script>
