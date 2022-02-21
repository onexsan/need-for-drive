<template>
  <b-modal
    id="hamburger-modal"
    class="hamburger-modal"
    :hide-footer="true"
    :hide-header="true"
  >
    <div class="hamburger-modal__wrapper">
      <button
        class="hamburger-modal__close hamburger-modal-close"
        @click="$bvModal.hide(`hamburger-modal`)"
      >
        <IconClose />
      </button>
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
              <IconSocialTg />
            </a>
          </li>
          <li class="socials__item">
            <a href="#" class="socials__link">
              <IconSocialFb />
            </a>
          </li>
          <li class="socials__item">
            <a href="#" class="socials__link">
              <IconSocialIg />
            </a>
          </li>
        </ul>
      </div>
      <button class="hamburger-modal__lang-btn link link--lang">Eng</button>
    </div>
  </b-modal>
</template>

<script>
import IconSocialTg from '@/components/icons/IconSocialTg.vue';
import IconSocialIg from '@/components/icons/IconSocialIg.vue';
import IconSocialFb from '@/components/icons/IconSocialFb.vue';
import IconClose from '@/components/icons/IconClose.vue';
export default {
  components: {
    IconSocialTg,
    IconSocialIg,
    IconSocialFb,
    IconClose,
  },
};
</script>
