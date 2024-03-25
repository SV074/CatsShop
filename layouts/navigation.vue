<template>
  <div class="container" :class="{ screen__timing: visibleCart }">
    <div class="header" :class="{ blur: visibleCart }">
      <div class="header__wrapper">
        <div class="header__inner">
          <div class="header__block-small">
            <div class="header__icon-burger">
              <img :src=iconBurger>
            </div>
            <div class="header__icon-logo">
              <img class="header__small-logo-img" :src=logoSmall>
            </div>
          </div>
          <div class="header__logo">
            <div class="header__logo-inner">
              <img class="header__logo-img" :src=logo>
              <img class="header__logo-img-text" :src=logoText>
            </div>
          </div>
          <div class="header__navigation">
            <div class="header__navigation-links">
              <div class="header__navigation-link"><nuxt-link to="/menu">Меню</nuxt-link></div>
              <img class="header__navigation-link" :src="dot">
              <div class="header__navigation-link"><nuxt-link to="/delivery">Доставка</nuxt-link></div>
              <img class="header__navigation-link" :src="dot">
              <div class="header__navigation-link"><nuxt-link to="/stock">Акции</nuxt-link></div>
              <img class="header__navigation-link" :src="dot">
              <div class="header__navigation-link"><nuxt-link to="/reviews">Отзывы</nuxt-link></div>
              <img class="header__navigation-link" :src="dot">
              <div class="header__navigation-link"><nuxt-link to="/contacts">Контакты</nuxt-link></div>
            </div>
          </div>
          <div class="header__phone">
            <div class="header__phone-icon">
              <img class="phone-icon" :src=iconPhone>
            </div>
            <div class="pnone-number">
              +7 979 700 97 91
            </div>
          </div>
          <div class="header__block-cart">
            <div class="header__btn-cart-personal">
              <div class="header__btn-cart">
                <div class="header__btn-cart-inner" @click="changeVisibleCart()">
                  <img class="header__icon-cart" :src=iconCart>
                </div>
              </div>
              <div class="header__account">
                <button class="btn-account"><nuxt-link to="/auth">Войти</nuxt-link></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Nuxt />
    <Cart />
  </div>
</template>

<script>
import Logo from '/static/cat-logo.png';
import LogoText from '/static/cat-shop.png';
import LogoPhone from '/assets/logo/icon-phone.svg';
import IconCart from '/assets/logo/icon-cart.svg';
import IconBurger from '/assets/logo/burger-icon.svg';
import DotWhite from '/assets/logo/ellipse-white.svg';
import LogoSmall from '/static/cat-logo-small.png';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'navigation',
  computed: {
        ...mapGetters(['visibleCart']),
    },
  data() {
    return {
      logo: Logo,
      logoText: LogoText,
      logoSmall: LogoSmall,
      iconPhone: LogoPhone,
      iconCart: IconCart,
      iconBurger: IconBurger,
      dot: DotWhite,
    }
  },
  methods: {
    ...mapActions(['changeVisibleCart']),
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
}

.screen__timing {
  height: 998px;
}

.header {
  width: 100%;
  height: 82px;
}

.header__wrapper {
  background-color: #062D4E;
  display: flex;
  justify-content: center;
  height: 100%;
}

.header__inner {
  width: 1170px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.header__block-small {
  display: none;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.header__logo {
  height: 182px;
  width: 182px;
}

.header__logo-inner {
  background: white;
  height: 162px;
  width: 162px;
  border-radius: 50%;
  position: relative;
  top: 25px;
  box-shadow: inset 0px 1px 1px 0px;
  display: flex;
  flex-direction: column;
}

.header__logo-img {
  height: 67px;
  width: 56px;
  position: relative;
  top: 30px;
  left: 60px;
}

.header__logo-img-text {
  height: 42px;
  width: 76px;
  position: relative;
  top: 37px;
  left: 45px;
}

.header__navigation-links {
  display: flex;
  letter-spacing: 5px;
}

.header__navigation-link {
  margin-right: 10px;
  font-size: 16px;
  color: white;
}

.header__phone {
  display: flex;
  align-items: center;
  color: white;
  gap: 2.5px;
}

.header__phone-icon {
  padding-top: 3px;
  width: 24px;
  height: 24px;
}

.header__btn-cart-personal {
  display: flex;
  align-items: center;
}

.header__btn-cart-inner {
  background: white;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
}

.header__icon-cart {
  width: 24px;
  height: 24px;
}

.header__account {
  margin-left: 20px;
}

.btn-account {
  height: 42px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  font-weight: 400;
  padding: 5px 20px;
}

@media (max-width: 990px) {
  .container {
    width: 990px;
    height: 780px;
  }

  .header {
    width: 100%;
    min-height: 66px;
  }

  .header__inner {
    padding: 0 20px;
    justify-content: space-between;
  }

  .header__block-small {
    display: flex;
  }

  .header__logo,
  .header__navigation {
    display: none;
  }
}

@media (max-width: 320px) {
  .container {
    width: 320px;
    height: 289px;
  }

  .header {
    width: 320px;
    height: 60px;
  }

  .pnone-number,
  .header__block-cart {
    display: none;
  }

  .header__icon-logo {
    padding-left: 60px;
  }
}
</style>