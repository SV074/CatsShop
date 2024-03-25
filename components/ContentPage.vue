<template>
  <div class="menu" :class="{ screen__timing: visibleCart }" >
    <div class="menu__inner">
      <div class="menu__wrapper">
        <div class="menu__tabs-header">
          <div class="menu__title">
            <img :src=point class="menu__point">
            <div class="menu__header-delivery-title">ДОСТАВКА</div>
            <h1 class="menu__header-title">МЕНЮ</h1>
            <img :src=point class="menu__point">
          </div>
          <div class="menu__tabs">
            <div class="menu__tabs-item">РОЛЛЫ</div>
            <div class="menu__tabs-item">СУШИ И ГУНКАНЫ</div>
            <div class="menu__tabs-item">СЕТЫ</div>
            <div class="menu__tabs-item"> ЛАПША И РИС</div>
            <div class="menu__tabs-item">САЛАТЫ</div>
            <div class="menu__tabs-item">ГОРЯЧИЕ БЛЮДА</div>
          </div>
          <div class="menu__rolls">
            <div class="menu__rolls-inner">
              <client-only>
              <CardCat v-for="roll in catsAll" :key="roll.id" :roll="roll" />
            </client-only>
            </div>
          </div>
        </div>
        <ButtonUp></ButtonUp>
      </div>
    </div>
  </div>
  </template>

<script>
import Dot from 'assets/logo/dot.svg';
import RollImage from 'assets/logo/ролл-ясай .svg';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Menu',
  layout: 'pageheader',
  computed: {
    ...mapGetters(['visibleCart']),
    ...mapGetters('cart', ['cartRolls']),
    // catsAll() {
    //   if(window.innerWidth < 920 && window.innerWidth > 320) {
    //       return this.catsAll = this.cats.slice(0, 3);
    //   } else if(window.innerWidth > 920) {
    //       return this.catsAll = this.cats;
    //   }
    // }
  },
  data() {
    return {
      width: 0,
      roll: {
      },
      catsAll: [],
      likeRoll: false,
      rollImage: RollImage,
      point: Dot,
      cats: [
        {
          name: 'ролл ясай', price: '200', weight: '185', compound: 'Огурец, авокадо, помидор, болгарский перец, листья, кунжут', url: '/cat-img.png', id: 1
        },
        {
          name: 'мясные роллы', price: '240', weight: '260', compound: 'Огурец, авокадо, помидор, болгарский перец, листья, кунжут', url: '/cat-img.png', id: 2
        },
        {
          name: 'ролл лайт', price: '165', weight: '190', compound: 'Листья салата, огурец, перец, помидор, сырный соус, чипсы', url: '/cat-img.png', id: 3
        },
        {
          name: 'ролл веган', price: '200', weight: '230', compound: 'Листья салата, авокадо, огурец, спаржа, сивид чука, кунжут', url: '/cat-img.png', id: 4
        },
        {
          name: 'ролл чиро', price: '210', weight: '210', compound: 'Листья салата, копченая курица, болгарский перец, твердый сыр, чесночный соус', url: '/cat-img.png', id: 5
        },
        {
          name: 'ролл тайол', price: '215', weight: '215', compound: 'Огурец, помидор, сыр творожный, бекон, сыр масадам', url: '/cat-img.png', id: 6
        },
        {
          name: 'ролл батакон', price: '230', weight: '220', compound: 'Огурец, сыр творожный, бекон', url: '/cat-img.png', id: 7
        },
        {
          name: 'ролл калипсо', price: '185', weight: '195', compound: 'Сыр творожный, огурец, мидии, стружка тунца', url: '/cat-img.png', id: 8
        },
        {
          name: 'ролл кавьяр', price: '200', weight: '240', compound: 'Сыр творожный, помидор, огурец, мидии, майонез', url: '/cat-img.png', id: 9
        },
        {
          name: 'ролл чипу', price: '180', weight: '190', compound: 'Сыр творожный, лосось, томаго, стружка тунца', url: '/cat-img.png', id: 10
        },
        {
          name: 'ролл катана', price: '250', weight: '240', compound: 'Сыр творожный, краб, огурец, черный кунжут, лососевый тат-тар, спайси соус', url: '/cat-img.png', id: 11
        },
        {
          name: 'ролл мишику', price: '260', weight: '210', compound: 'Угорь, краб, огурец, масаго, сыр творожный, сырный соус, картофельные чипсы', url: '/cat-img.png', id: 12
        },
        {
          name: 'ролл ясай', price: '200', weight: '185', compound: 'Огурец, авокадо, помидор, болгарский перец, листья, кунжут', url: '/cat-img.png', id: 1
        },
        {
          name: 'мясные роллы', price: '240', weight: '260', compound: 'Огурец, авокадо, помидор, болгарский перец, листья, кунжут', url: '/cat-img.png', id: 2
        },
        {
          name: 'ролл лайт', price: '165', weight: '190', compound: 'Листья салата, огурец, перец, помидор, сырный соус, чипсы', url: '/cat-img.png', id: 3
        },
        {
          name: 'ролл веган', price: '200', weight: '230', compound: 'Листья салата, авокадо, огурец, спаржа, сивид чука, кунжут', url: '/cat-img.png', id: 4
        }
       ],
      rollInCart: false,
    };
  },
  methods: {
    ...mapActions(['unvisibleCart']),
    watchWidth() {
      if(window.innerWidth < 920 && window.innerWidth > 320) {
          return this.catsAll = this.cats.slice(0, 3);
      } else if(window.innerWidth > 920) {
          return this.catsAll = this.cats;
      }
    }
  },
  mounted() {
    this.watchWidth();
  },
  watch: {
   
  }
}
</script>

<style scoped>
.menu {
  background-image: url('assets/BG-menu.svg');
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.screen__timing {
  height: 998px;
}

.menu__inner {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
 
  padding-left: 100px;
}

.menu__wrapper {
  width: 100%;
  display: flex;
  box-sizing: border-box;
}

.menu__tabs-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.menu__title {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  align-items: center;
  height: 66px;
  font-size: 60px;
}

.menu__header-delivery-title {
  display: none;
}

.menu__header-title {
  padding: 0 40px;
  font-weight: 400;
  font-size: 60px;
}

.menu__tabs {
  display: flex;
  font-size: 28px;
  font-weight: 400;
  align-items: center;
  padding-top: 50px;
  width: 100%;
  justify-content: center;
}

.menu__tabs-item {
  display: flex;
  align-items: center;
  font-size: 28px;
  padding: 16px 32px;
  color: #B3A296;
  letter-spacing: -3px;
  white-space: nowrap;
}

.menu__tabs-item:hover {
  border-radius: 100px;
  background: rgba(49, 37, 37, 1);
  color: white;
}

.menu__rolls {
  margin-top: 60px;
  width: 1170px;
  box-sizing: border-box;
}

.menu__rolls-inner {
  display: flex;
  gap: 30px;
  width: 100%;
  flex-wrap: wrap;
}

.menu__roll {
  background: white;
  height: 390px;
  width: 270px;
  border: 1px solid white;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px #00000040;
}

.buy {
  border: none;
  background: #312525;
  color: white;
}

.menu__roll-card {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu__roll-image-btn-like {
  width: 100%;
  display: flex;
  justify-content: center;
}

.roll-image {
  padding-left: 15px;
  width: 130px;
  height: 130px;
}

.menu__btn-like {
  padding-left: 20px;
}

.menu__roll-name-weight {
  display: flex;
  justify-content: space-between;
}

.menu__roll-compound {
  font-size: 15px;
  padding-top: 30px;
  color: #808080;
}

.menu__roll-price-btn-cart {
  display: flex;
  justify-content: space-between;
  padding-top: 60px;
  align-items: center;
}

.btn-cart {
  width: 100px;
  height: 35px;
  font-size: 15px;
  color: white;
  background-color: #312525;
  border-radius: 8px;
  border: none;
  letter-spacing: 3%;
}

.menu__roll-btns {
  display: flex;
}

.roll__btn {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  background: red;
}
/* @media (max-width: 1920px) {

} */

@media (max-width: 990px) {
  .menu {
    height: 100%;
    padding: 0;
    background-image: none;
  }

  .menu__inner {
    width: 100%;
    padding: 0;
  }

  .menu__header-title {
    font-size: 48px;
  }

  .menu__tabs-header {
    display: flex;
    flex-direction: column;
  }

  .menu__title {
    padding-top: 40px;
    font-size: 48px;
  }

  .menu__tabs {
    max-width: 940px;
    min-width: 320px;
    padding-top: 30px;
  }

  .menu__tabs-item {
    font-size: 19px;
    display: flex;
    letter-spacing: -3px;
    word-spacing: 2px;
    white-space: nowrap;
  }

  .menu__rolls {
    margin-top: 20px;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .menu__rolls-inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    justify-items: center;
  }

  .menu__block-up {
    display: none;
  }
}

@media (max-width: 320px) {
  .menu__inner {
    padding: 0;
  }

  .menu__title {
    padding: 20px 0;
    height: 24px;
    font-size: 22px;
  }

  .menu__point {
    width: 7.5px;
    height: 7.5px;
  }

  .menu__header-title,
  .menu__rolls {
    display: none;
  }

  .menu__header-delivery-title {
    display: flex;
    font-size: 22px;
    padding: 0 15px;
  }

  .menu__tabs {
    width: 320px;
    flex-wrap: wrap;
    padding: 0;
  }

  .menu__tabs-item {
    font-size: 16px;
    padding: 12px 18px;
  }
}
</style>
