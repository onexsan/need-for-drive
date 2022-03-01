<template>
  <section class="order order--confirmed">
    <Header />
    <div class="order__nav order-nav">
      <div class="container order-nav__container">
        <p class="order-nav__order-id">Заказ номер RU58491823</p>
      </div>
    </div>
    <main class="order__main order-main">
      <div class="container order-main__container">
        <div class="order-main__wrapper">
          <div class="order__summary order-summary">
            <div class="order-summary__title">Ваш заказ подтверждён</div>
            <div class="order-summary__model">Hyndai, i30 N</div>
            <div class="order-summary__license">K 761 HA 73</div>
            <div class="order-summary__extra"><span>Топливо</span> 100%</div>
            <div class="order-summary__extra">
              <span>Доступна</span> с 12.06.2019 12:00
            </div>
            <img
              src="~@/assets/img/car-example.png"
              alt="Chosen model"
              class="order-summary__img"
            />
          </div>
          <div class="order-main__details order-details">
            <h3 class="order-details__title">Ваш заказ:</h3>
            <ul class="order-details__list details-list">
              <li class="details-list__item details-item">
                <div class="details-item__title">Пункт выдачи</div>
                <div class="details-item__value">
                  Ульяновск, Нариманова&nbsp;42
                </div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Модель</div>
                <div class="details-item__value">Hyndai,&nbsp;i30 N</div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Цвет</div>
                <div class="details-item__value">Голубой</div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Длительность аренды</div>
                <div class="details-item__value">1д 2ч</div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Тариф</div>
                <div class="details-item__value">На сутки</div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Полный бак</div>
                <div class="details-item__value">Да</div>
              </li>
            </ul>
            <div class="order-details__price"><span>Цена:</span> 16 000 ₽</div>
            <button class="btn btn-danger order-details__btn">Отменить</button>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Header from '@/components/layout/Header.vue';
export default {
  components: {
    Header,
  },
};
</script>
