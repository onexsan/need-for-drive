<template>
  <section class="login">
    <div class="container login__container">
      <div class="login__wrapper">
        <div class="login__logo login-logo">
          <div class="login-logo__icon">
            <svg>
              <use xlink:href="#admin-logo"></use>
            </svg>
          </div>
          <div class="login-logo__title">Need for drive</div>
        </div>
        <form action="" class="login__form login-form">
          <legend class="login-form__title">Вход</legend>
          <fieldset>
            <div class="form-group">
              <label for="email" class="label login-form__label">Почта</label>
              <input type="email" name="" id="email" class="text-input" />
            </div>
            <div class="form-group">
              <label for="pass" class="label login-form__label">Пароль</label>
              <input type="password" name="" id="pass" class="text-input" />
            </div>
          </fieldset>
          <fieldset>
            <div class="form-group">
              <a href="" class="login-form__get-access">Запросить доступ</a>
            </div>
            <div class="form-group">
              <button class="btn btn-primary login-form__btn">Войти</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &__container {
    display: flex;
    justify-content: center;
  }

  &__wrapper {
    width: 100%;
    max-width: 365px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__form {
    background-color: #ffffff;
    border-radius: 9px;
    padding: 20px 17px;
    width: 100%;
    box-shadow: 0px -0.5px 0px #e0e2e8, 0px 0.5px 0px #e0e2e8;
    display: flex;
    flex-direction: column;
  }

  &-form {
    &__title {
      text-align: center;
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 36px;

      @include phones {
        font-size: 14px;
        margin-bottom: 18px;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }
  }

  &-logo {
    display: flex;
    align-items: center;
    margin-bottom: 17px;

    &__icon {
      width: 45px;
      height: 45px;
      overflow: hidden;
    }

    &__title {
      color: $dark-blue;
      font-weight: 400;
      font-size: 24px;
      margin-left: 12px;

      @include phones {
        font-size: 18px;
      }
    }
  }
}
</style>
