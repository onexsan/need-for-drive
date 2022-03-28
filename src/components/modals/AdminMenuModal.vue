<template>
  <b-modal
    id="admin-menu-modal"
    class="hamburger-modal"
    :hide-footer="true"
    :hide-header="true"
  >
    <aside class="admin-sidebar admin-sidebar--mobile">
      <div class="admin-sidebar__header">
        <router-link
          to="/"
          class="admin-sidebar__logo admin-logo admin-logo--sm"
        >
          <div class="admin-logo__icon">
            <svg width="22" height="22">
              <use xlink:href="#admin-logo"></use>
            </svg>
          </div>
          <div class="admin-logo__title">Need for car</div>
        </router-link>
        <button
          class="close-btn admin-sidebar__close"
          @click="$bvModal.hide(`admin-menu-modal`)"
        >
          <svg>
            <use xlink:href="#icon-close"></use>
          </svg>
        </button>
      </div>
      <nav class="admin-sidebar__nav admin-sidebar-nav">
        <ul class="admin-sidebar-nav__list">
          <li class="admin-sidebar-nav__item admin-sidebar-nav__item--active">
            <router-link to="" class="admin-sidebar-nav__link">
              <div class="admin-sidebar-nav__icon">
                <svg width="13" height="14">
                  <use xlink:href="#edit-icon"></use>
                </svg>
              </div>
              <span>Карточка автомобиля</span>
            </router-link>
          </li>
          <li class="admin-sidebar-nav__item">
            <router-link to="" class="admin-sidebar-nav__link">
              <div class="admin-sidebar-nav__icon">
                <svg width="13" height="14">
                  <use xlink:href="#posts-icon"></use>
                </svg>
              </div>
              <span>Список авто</span>
            </router-link>
          </li>
          <li class="admin-sidebar-nav__item">
            <router-link to="" class="admin-sidebar-nav__link">
              <div class="admin-sidebar-nav__icon">
                <svg width="13" height="14">
                  <use xlink:href="#add-icon"></use>
                </svg>
              </div>
              <span>Заказы</span>
            </router-link>
          </li>
          <li class="admin-sidebar-nav__item">
            <router-link to="" class="admin-sidebar-nav__link">
              <div class="admin-sidebar-nav__icon">
                <svg width="13" height="14">
                  <use xlink:href="#overview-icon"></use>
                </svg>
              </div>
              <span>Menu 4</span>
            </router-link>
          </li>
          <li class="admin-sidebar-nav__item">
            <router-link to="" class="admin-sidebar-nav__link">
              <div class="admin-sidebar-nav__icon">
                <svg width="13" height="14">
                  <use xlink:href="#forms-icon"></use>
                </svg>
              </div>
              <span>Menu 5</span>
            </router-link>
          </li>
          <li class="admin-sidebar-nav__item">
            <router-link to="" class="admin-sidebar-nav__link">
              <div class="admin-sidebar-nav__icon">
                <svg width="13" height="14">
                  <use xlink:href="#user-icon"></use>
                </svg>
              </div>
              <span>Menu 6</span>
            </router-link>
          </li>
          <li class="admin-sidebar-nav__item">
            <router-link to="" class="admin-sidebar-nav__link">
              <div class="admin-sidebar-nav__icon">
                <svg width="13" height="14">
                  <use xlink:href="#error-icon"></use>
                </svg>
              </div>
              <span>Menu 7</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside></b-modal
  >
</template>
