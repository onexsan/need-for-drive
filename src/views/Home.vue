<template>
  <section class="home">
    <div class="home__wrapper">
      <div class="home__desc">
        <Header />
        <main class="home__main">
          <div class="home__intro">
            <h1 class="title home__title">
              Каршеринг <span>Need for drive</span>
            </h1>
            <div class="home__desc">Поминутная аренда авто твоего города</div>
          </div>
          <a href="#" class="btn home__btn">Забронировать</a>
        </main>
        <Footer />
      </div>
      <div class="home__slider">
        <slider class="slider--custom" :autoplay="false" :height="'100%'">
          <slider-item v-for="slide in slides" :key="slide.id">
            <div class="slider__slide slide">
              <div class="slide__content">
                <div class="slide__title">{{ slide.title }}</div>
                <div class="slide__desc">
                  {{ slide.desc }}
                </div>
                <a href="#" class="btn btn--color-reverse slide__btn"
                  >Подробнее</a
                >
              </div>
            </div>
          </slider-item>
        </slider>
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
  data() {
    return {
      slides: [
        {
          title: 'Бесплатная парковка',
          desc: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
        },
        {
          title: 'Страховка',
          desc: 'Полная страховка автомобиля',
        },
        {
          title: 'Бензин',
          desc: 'Полный бак на любой заправке города за наш счёт',
        },
        {
          title: 'Обслуживание',
          desc: 'Автомобиль проходит еженедельное ТО',
        },
      ],
    };
  },
};
</script>
