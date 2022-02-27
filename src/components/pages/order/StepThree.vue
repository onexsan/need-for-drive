<template>
  <form action="" class="order-main__form order-form">
    <fieldset>
      <legend class="order-form__legend">Цвет</legend>
      <div class="form-group form-group--radio-list order-form__form-group">
        <div class="form-group__radio form-group-radio">
          <label class="radio" for="all-colors">
            <input
              type="radio"
              class="radio__input"
              name="color"
              id="all-colors"
            />
            <span class="radio__text">Любой</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="red-color">
            <input
              type="radio"
              class="radio__input"
              name="color"
              id="red-color"
            />
            <span class="radio__text">Красный</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="blue-color">
            <input
              type="radio"
              class="radio__input"
              name="color"
              id="blue-color"
            />
            <span class="radio__text">Голубой</span>
            <span class="radio__icon"></span>
          </label>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <legend class="order-form__legend">Дата аренды</legend>
      <div
        class="form-group order-form__form-group order-form__form-group--grid"
      >
        <label for="order-from" class="order-form__label">С</label>
        <input
          type="search"
          name="order-from"
          id="order-from"
          class="form-control custom-input order-form__input"
          placeholder="Введите дату и время"
        />
        <label for="order-to" class="order-form__label">По</label>
        <input
          type="search"
          name="order-to"
          id="order-to"
          class="form-control custom-input order-form__input"
          placeholder="Введите дату и время"
        />
      </div>
    </fieldset>
    <fieldset>
      <legend class="order-form__legend">Тариф</legend>
      <div class="form-group order-form__form-group">
        <div class="form-group__radio form-group-radio">
          <label class="radio" for="rate-minute">
            <input
              type="radio"
              class="radio__input"
              name="rate"
              id="rate-minute"
            />
            <span class="radio__text">Поминутно, 7₽/мин</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="rate-day">
            <input
              type="radio"
              class="radio__input"
              name="rate"
              id="rate-day"
            />
            <span class="radio__text">На сутки, 1999 ₽/сутки</span>
            <span class="radio__icon"></span>
          </label>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <legend class="order-form__legend">Доп. услуги</legend>
      <div class="form-group order-form__form-group">
        <div class="form-group__checkbox form-group-checkbox">
          <label class="checkbox" for="extra-fuel">
            <input
              type="checkbox"
              class="checkbox__input"
              name="extra-fuel"
              id="extra-fuel"
            />
            <span class="checkbox__text">Полный бак, 500р</span>
            <span class="checkbox__icon"></span>
          </label>
        </div>
        <div class="form-group__checkbox form-group-checkbox">
          <label class="checkbox" for="extra-baby-chair">
            <input
              type="checkbox"
              class="checkbox__input"
              name="extra-baby-chair"
              id="extra-baby-chair"
            />
            <span class="checkbox__text">Детское кресло, 200р</span>
            <span class="checkbox__icon"></span>
          </label>
        </div>
        <div class="form-group__checkbox form-group-checkbox">
          <label class="checkbox" for="extra-right-side">
            <input
              type="checkbox"
              class="checkbox__input"
              name="extra-right-side"
              id="extra-right-side"
            />
            <span class="checkbox__text">Правый руль, 1600р</span>
            <span class="checkbox__icon"></span>
          </label>
        </div>
      </div>
    </fieldset>
  </form>
</template>
