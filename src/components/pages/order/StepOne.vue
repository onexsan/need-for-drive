<template>
  <form action="" class="order-main__form order-form">
    <fieldset>
      <div
        class="form-group order-form__form-group order-form__form-group--grid"
      >
        <label for="order-city" class="order-form__label">Город</label>
        <input
          type="search"
          name="order-city"
          id="order-city"
          class="form-control custom-input order-form__input"
          placeholder="Начните вводить город..."
        />
      </div>
      <div
        class="form-group order-form__form-group order-form__form-group--grid"
      >
        <label for="order-place" class="order-form__label">Пункт выдачи</label>
        <input
          type="search"
          name="order-place"
          id="order-place"
          class="form-control custom-input order-form__input"
          placeholder="Начните вводить пункт..."
        />
      </div>
    </fieldset>
    <fieldset>
      <div class="form-group order-form__form-group">
        <legend class="order-form__legend">Выбрать на карте:</legend>
        <div class="order-form__img-placeholder">
          <img
            src="~@/assets/img/order-map.png"
            alt=""
            class="order-form__map"
          />
        </div>
      </div>
    </fieldset>
  </form>
</template>
