<template>
  <form class="order-main__form order-form">
    <fieldset>
      <div class="form-group form-group--radio-list order-form__form-group">
        <div class="form-group__radio">
          <label class="radio" for="all-models">
            <input
              type="radio"
              class="radio__input"
              name="models"
              id="all-models"
            />
            <span class="radio__text">Все модели</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="economy-models">
            <input
              type="radio"
              class="radio__input"
              name="models"
              id="economy-models"
            />
            <span class="radio__text">Эконом</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="premium-models">
            <input
              type="radio"
              class="radio__input"
              name="models"
              id="premium-models"
            />
            <span class="radio__text">Премиум</span>
            <span class="radio__icon"></span>
          </label>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <ul class="order-form__models order-models">
        <li class="order-models__item">
          <div class="order-models__title">ELANTRA</div>
          <div class="order-models__price">12 000 - 25 000 ₽</div>
          <div class="order-models__img-wrapper">
            <img
              src="~@/assets/img/car-example.png"
              alt="Изображение автомобиля"
              class="order-models__img"
            />
          </div>
        </li>
        <li class="order-models__item order-models__item--active">
          <div class="order-models__title">i30 N</div>
          <div class="order-models__price">10 000 - 32 000 ₽</div>
          <div class="order-models__img-wrapper">
            <img
              src="~@/assets/img/car-example.png"
              alt="Изображение автомобиля"
              class="order-models__img"
            />
          </div>
        </li>
        <li class="order-models__item">
          <div class="order-models__title">ELANTRA</div>
          <div class="order-models__price">12 000 - 25 000 ₽</div>
          <div class="order-models__img-wrapper">
            <img
              src="~@/assets/img/car-example.png"
              alt="Изображение автомобиля"
              class="order-models__img"
            />
          </div>
        </li>
        <li class="order-models__item">
          <div class="order-models__title">ELANTRA</div>
          <div class="order-models__price">12 000 - 25 000 ₽</div>
          <div class="order-models__img-wrapper">
            <img
              src="~@/assets/img/car-example.png"
              alt="Изображение автомобиля"
              class="order-models__img"
            />
          </div>
        </li>
        <li class="order-models__item">
          <div class="order-models__title">ELANTRA</div>
          <div class="order-models__price">12 000 - 25 000 ₽</div>
          <div class="order-models__img-wrapper">
            <img
              src="~@/assets/img/car-example.png"
              alt="Изображение автомобиля"
              class="order-models__img"
            />
          </div>
        </li>
      </ul>
    </fieldset>
  </form>
</template>
