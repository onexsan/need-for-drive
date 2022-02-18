<template>
  <b-modal
    id="hamburger-modal"
    class="hamburger-modal"
    :hide-footer="true"
    :hide-header="true"
  >
    <div class="hamburger-modal__wrapper">
      <button
        class="hamburger-modal__button"
        @click="$bvModal.hide(`hamburger-modal`)"
      ></button>
      <nav class="hamburger-modal__nav hamburger-nav">
        <ul class="hamburger-nav__list">
          <li class="hamburger-nav__item">
            <a href="#" class="hamburger-nav__link">Парковка</a>
          </li>
          <li class="hamburger-nav__item active">
            <a href="#" class="hamburger-nav__link">Страховка</a>
          </li>
          <li class="hamburger-nav__item">
            <a href="#" class="hamburger-nav__link">Бензин</a>
          </li>
          <li class="hamburger-nav__item">
            <a href="#" class="hamburger-nav__link">Обслуживание</a>
          </li>
        </ul>
      </nav>
      <div class="socials hamburger-modal__socials">
        <ul class="socials__list">
          <li class="socials__item">
            <a href="#" class="socials__link">
              <img
                src="~@/assets/icons/tg-icon.svg"
                alt=""
                class="socials__icon"
              />
            </a>
          </li>
          <li class="socials__item">
            <a href="#" class="socials__link">
              <img
                src="~@/assets/icons/fb-icon.svg"
                alt=""
                class="socials__icon"
              />
            </a>
          </li>
          <li class="socials__item">
            <a href="#" class="socials__link">
              <img
                src="~@/assets/icons/ig-icon.svg"
                alt=""
                class="socials__icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {};
</script>

<style lang="scss">
#hamburger-modal {
  .modal-dialog {
    margin: auto 0;
    max-width: none;
    width: calc(50% + 35px);
    height: 100%;

    @include tablets {
      width: 100%;
    }

    @include phones {
      margin: 0;
    }
  }

  .modal-content {
    border-radius: 0px;
    background-color: $black;
    height: 100%;
    border: none;
  }
}

.hamburger-modal {
  position: relative;
  &__button {
    position: absolute;
    top: 28px;
    left: 17px;
    width: 32px;
    height: 32px;
    background-color: transparent;
    border: 1px solid transparent;
    background-image: url('~@/assets/icons/close-btn.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &:hover,
    &:focus {
      filter: invert(58%) sepia(33%) saturate(6558%) hue-rotate(114deg)
        brightness(105%) contrast(89%);
    }
  }

  &__wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.hamburger-nav {
  &__list {
    list-style-type: none;
  }

  &__link {
    text-decoration: none;
    font-weight: 500;
    font-size: 32px;
    color: $white;
    text-transform: uppercase;

    &:hover {
      color: $green;
    }
  }

  &__item {
    &.active {
      .hamburger-nav__link {
        color: $green;
        text-decoration: none;
      }
    }
  }
}

.socials {
  &__list {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 25px;
    width: fit-content;
  }

  &__link {
    width: 32px;
    height: 32px;
    display: block;
  }

  &__icon {
    width: 100%;
    height: auto;
  }

  &__item {
    width: fit-content;

    &:hover {
      .socials__icon {
        filter: invert(58%) sepia(33%) saturate(6558%) hue-rotate(114deg)
          brightness(105%) contrast(89%);
      }
    }
  }
}
</style>
