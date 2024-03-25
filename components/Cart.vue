<template>
    <div class="cart" v-if="visibleCart">
        <div class="cart__inner" v-if="!visibleOrder">
            <div class="cart__header">
                <img :src=point class="menu__point">
                <div class="cart__header-title">
                    КОРЗИНА
                </div>
                <img :src=point class="menu__point">
            </div>
            <div class="cart__list-roll">
                <CardCatInCart v-for="roll in cartRolls" :key="roll.id" :roll="roll" />
            </div>
            <div class="cart__footer">
                <div class="cart__footer-sum">
                    Общая сумма заказа {{ sumAllRolls }} ₽
                </div>
                <div class="cart__footer-delivery-info" v-if="sumAllRolls < 500">
                    * Сумма заказа для доставки курьером должна составлять не менее 500 ₽
                </div>
                <div class="cart__footer-btns">
                    <button class="cart__footer-btn-back" @click="backToShoping()">
                        Вернуться к покупкам
                    </button>
                    <button class="cart__footer-btn-checkout" @click="showPlacingOrder()">
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
        <div class="cart__placing-order" v-if="visibleOrder">
            <div class="cart__placing-order-inner">
                <div class="cart__placing-order-header">
                    <img :src=point class="menu__point">
                    <div class="placing-order__header-title">
                        Оформление заказа
                    </div>
                    <img :src=point class="menu__point">
                </div>
                <div class="placing-order__list">
                    <div class="placing-order__item-delivery">
                        <div class="item-delivery__inner">
                            <div class="item-delivery__title">
                                <div class="ellipse red">
                                    <span class="ellipse-number">1</span>
                                </div>
                                <div class="title__text">
                                    Способ доставки
                                </div>
                            </div>
                            <div class="item-delivery__choice">
                                <div class="choice__delivery">
                                    <div v-for="item in deliveryMethods" :key="item.id" class="item__delivery">
                                        <div class="delivery__icon-title">
                                            <div class="delivery__ellipse-icon">
                                                <div class="ellipse border" @click="pushEllipse(item)" :class="{ check: item.checked&&!item.disabled }">
                                                    <img class="ellipse-check-mark" :src="iconCheckMark">
                                                </div>
                                                <div class="delivery-icon" :class="{ grey: item.disabled, black: !item.disabled }">
                                                    <img class="icon-courier" :src="item.icon_src">
                                                </div>
                                            </div>
                                            <div class="delivery__title">
                                                {{ item.name }}
                                            </div>
                                        </div>
                                        <div class="delivery__details">
                                            <div v-if="item.disabled" class="delivery__unavailable">Временно недоступно</div>
                                            <div v-if="!item.disabled" class="delivery__discount">Скидка - {{ discount }}%<span class="discount-text">на стоимость товара</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="placing-order__item-delivery-details">
                        <div class="item-delivery__inner">
                            <div class="item-delivery__title">
                                <div class="ellipse red">
                                    <span class="ellipse-number">2</span>
                                </div>
                                <div class="title__text">
                                    Данные для доставки
                                </div>
                            </div>
                            <form class="item-delivery__form">
                                <div class="form__input input-user">
                                    <div class="form__input-inner">
                                        <div class="form__input-icon">
                                            <img class="input-icon" :src="iconUser">
                                        </div>
                                        <div>
                                            <input class="item-input" v-model="nameUser" type="text" placeholder="Имя"
                                                :class="{ invalid: ($v.nameUser.$dirty && !$v.nameUser.required) || ($v.nameUser.$dirty && !$v.nameUser.minLength) }">
                                        </div>
                                    </div>
                                    <div class="input__line" :class="{ line: $v.nameUser.$error }"></div>
                                    <small class="form-input__message"
                                        v-if="($v.nameUser.$dirty && !$v.nameUser.required)">
                                        Это обязательное поле
                                    </small>
                                    <small class="form-input__message"
                                        v-else-if="($v.nameUser.$dirty && !$v.nameUser.minLength)">
                                        Минимум 3 буквы
                                    </small>
                                </div>
                                <div class="form__input input-phone">
                                    <div class="form__input-inner">
                                        <div class="form__input-icon">
                                            <img class="input-icon" :src="iconPhone">
                                        </div>
                                        <div>
                                            <input class="item-input" v-model="phoneUser" type="tel"
                                                placeholder="Телефон">
                                        </div>
                                    </div>
                                    <div class="input__line"
                                        :class="{ invalid: ($v.phoneUser.$dirty && !$v.phoneUser.required) || ($v.phoneUser.$dirty && !$v.phoneUser.numeric) }">
                                    </div>
                                    <small class="form-input__message"
                                        v-if="($v.phoneUser.$dirty && !$v.phoneUser.required)">
                                        Введите номер
                                    </small>
                                    <samll class="form-input__message"
                                        v-else-if="($v.phoneUser.$dirty && !$v.phoneUser.numeric)">
                                        Должен состоять из цифр
                                    </samll>
                                </div>
                                <div class="form__input input-info">
                                    <div class="form__input-inner">
                                        <div class="form__input-icon">
                                            <img class="input-icon" :src="iconInfo">
                                        </div>
                                        <div>
                                            <input class="item-input" type="text"
                                                placeholder="Дополнительная информация">
                                        </div>
                                    </div>
                                    <div class="input__line"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="placing-order__item-total">
                        <div class="item-delivery__inner center">
                            <div class="placing-order__price-total">
                                <div class="item-price">
                                    <div class="price-info">Стоимость товаров</div>{{ sumAllRolls }} ₽
                                </div>
                                <div class="input__line"></div>
                                <div class="item-total">
                                    <div class="total-info">Итого к оплате</div>{{ totalPayment }} ₽
                                </div>
                            </div>
                            <div class="placing-order__btn-footer">
                                <button @click="buySushi()" class="placing-order__btn">Купить и оплатить</button>
                                <div class="placing-order__btn-info">
                                    Создавая заказ, вы соглашаетесь
                                    <a>с полтикой обработки персональных данных</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Dot from 'assets/logo/dot.svg';
import Heart from 'assets/logo/heart-icon.svg';
import IconMinus from 'assets/logo/icon-cart-minus.svg';
import IconPlus from 'assets/logo/icon-cart-plus.svg';
import IconCart from 'assets/logo/icon-cart-in-cart.svg';
import IconCourier from 'assets/logo/icon-courier.svg';
import IconPickup from 'assets/logo/shopping-bag.svg';
import IconUser from 'assets/logo/icon-user.svg';
import IconPhone from 'assets/logo/icon-phone-grey.svg';
import IconInfo from 'assets/logo/icon-info.svg';
import { required, minLength, numeric } from 'vuelidate/lib/validators';
import IconCheck from 'assets/logo/icon-check-mark.svg';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
    props: {

    },
    computed: {
        ...mapGetters(['visibleCart']),
        ...mapGetters('cart', ['cartRolls', 'sumAllRolls']),
        totalPayment() {
            console.log((this.sumAllRolls * this.discount) / 100);
            return this.sumAllRolls - (this.sumAllRolls * this.discount) / 100;
        }
    },
    data() {
        return {
            changeVisibility: null,
            rollsArray: [],
            checkMark: false,
            likeBtn: Heart,
            point: Dot,
            cartRollsItems: {},
            // rolls: [
            //     {
            //         name: 'РОЛЛ ЯСАЙ', price: '200', weight: '185', compound: 'Огурец, авокадо, помидор, болгарский перец, листья, кунжут', url: 'assets/images/roll-yasai.png', id: 1
            //     },
            //     {
            //         name: 'МЯСНЫЕ РОЛЛЫ', price: '240', weight: '260', compound: 'Огурец, авокадо, помидор, болгарский перец, листья, кунжут', url: 'public/images/roll baked.png', id: 2
            //     },
            //     {
            //         name: 'РОЛЛ ЛАЙТ', price: '165', weight: '190', compound: 'Листья салата, огурец, перец, помидор, сырный соус, чипсы', url: 'static/roll light.png', id: 3
            //     }
            // ],
            minus: IconMinus,
            plus: IconPlus,
            iconCart: IconCart,
            priceSeveralPieces: 1,
            visibleOrder: false,
            iconCourier: IconCourier,
            iconPickup: IconPickup,
            iconUser: IconUser,
            iconPhone: IconPhone,
            iconInfo: IconInfo,
            nameUser: '',
            phoneUser: '',
            iconCheckMark: IconCheck,
            discount: 10,
            deliveryMethods: [
                { name: 'Курьер', id: 1, icon_src: '/delivery.png', disabled: true, checked: false },
                { name: 'Самовывоз', id: 2, icon_src: '/shopping-bag.png', disabled: false, checked: false },
            ]
        }
    },
    validations: {
        nameUser: { required, minLength: minLength(3) },
        phoneUser: { required, numeric },
    },
    methods: {
        showPlacingOrder() {
            this.visibleOrder = true;
        },
        buySushi() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                this.message = 'Пожайлуста заполните необходимые поля!';
                return
            } else {
                this.message = 'Форма создана!';
            }
        },
        pushEllipse(item) {
            item.checked = !item.checked;
        },
        backToShoping() {
            this.$store.commit('unvisibleCart');
        }
    },
    mounted() {

    },
    watch: {
        cartRolls: {
            handler(newValue) {
                if (newValue) {
                    this.$store.commit('cart/setSumRolls');
                }
            },
            deep: true
        }
    }

}

</script>

<style lang="scss" scoped>
@mixin flexible-direction () {
    display: flex;
    flex-direction: column;
}

@mixin bg-red () {
    background: rgba(211, 74, 68, 1);
}

@mixin border-grey () {
    border: 0.3px solid rgba(165, 165, 165, 1);
}

.cart {
    width: 613px;
    height: 1080px;
    position: absolute;
    float: right;
    right: 0px;
    z-index: 9998;
    background: rgba(179, 162, 150, 1);
    transition: opacity .10s ease;
    backdrop-filter: blur(8px);
}

.cart__inner {
    padding: 40px;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
}

.cart__header {
    display: flex;
    font-size: 48px;
    font-weight: 400;
    justify-content: center;
    align-items: center;
    line-height: 52.88px;
}

.cart__header-title {
    padding: 0 40px;
}

.cart__list-roll {
    display: flex;
    flex-flow: column;
    flex-direction: column;
    height: 100%;
    margin-top: 30px;
}

.block-price__btns {
    display: flex;
    justify-content: space-between;
}

.block-price__sum {
    display: flex;
}

.cart__footer-delivery-info {
    margin-top: 40px;
    width: 360px;
}

.cart__footer-btns {
    margin-top: 40px;
    font-size: 18px;
}

.cart__footer-btn-back {
    border: 1px solid transparent;
    border-radius: 8px;
    height: 58px;
    padding: 0 23px;
}

.cart__footer-btn-checkout {
    margin-left: 30px;
    border: 1px solid transparent;
    border-radius: 8px;
    height: 58px;
    background: black;
    color: white;
    padding: 0 25px;
}

.cart__placing-order-inner {
    padding: 36px;
}

.cart__placing-order-header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.placing-order__header-title {
    font-size: 32px;
    padding: 0 15px;
}

.placing-order__list {
    display: flex;
    flex-direction: column;
    margin-top: 27px;
}

.placing-order__item-delivery,
.placing-order__item-delivery-details,
.placing-order__item-total {
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin-bottom: 14px;
    font-family: 'Ubuntu';
}

.item-delivery__inner {
    @include flexible-direction();
    padding: 16px;
    justify-content: center;
}

.item-delivery__title {
    display: flex;
    align-items: center;
}

.item-delivery__choice {
    margin-top: 12px;
}

.choice__delivery {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.ellipse {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.red {
    @include bg-red()
}

.border {
    @include border-grey();
}

.check {
    background: rgba(10, 207, 131, 1);
}

.ellipse-number {
    color: white;
    font-size: 20px;
}

.delivery-icon {
    margin-left: 20px;
}

path {
    fill: inherit;
    stroke: inherit;
}

.grey {
    //color: rgba(165, 165, 165, 1);
   filter: invert(2);
}

.black {

}

.title__text {
    margin-left: 14px;
    font-size: 22px;
    font-weight: 300;
}

.delivery__ellipse-icon {
    display: flex;
}

.item__delivery {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 44px;
    gap: 14px;
}

.delivery__icon-title {
    display: flex;
    align-items: center;
    width: 220px;
}

.delivery__title {
    font-size: 18px;
    font-weight: 300;
    padding-left: 40px;
}

.delivery__details {
    font-size: 12px;
}

.delivery__details-discount {
    @include flexible-direction();
    align-items: flex-start;
    width: 114px;
}

.delivery__unavailable {
    color: red;
}

.delivery__discount {
    font-size: 14px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
}

.discount-text {
    font-size: 8px;
    font-weight: 700;
    line-height: 9px;
    letter-spacing: 0em;
}

.delivery__discount-info {
    font-size: 8px;
}

.item-delivery__form {
    @include flexible-direction();
    margin-top: 33px;
}

.form__input {
    display: flex;
    flex-direction: column;
    max-width: 430px;
    width: 100%;
    margin-left: 46px;
}

.form__input-inner {
    display: flex;
    margin-bottom: 6px;
}

.input-icon {
    color: rgba(71, 71, 71, 1);
}

.item-input {
    border: none;
    outline: none;
    padding-left: 21px;
    font-size: 16px;
    font-weight: 300;
}

.input__line {
    height: 1px;
    width: 100%;
    background: rgba(217, 217, 217, 1);
}

.input-user,
.input-phone {
    margin-bottom: 40px;
}

.line {
    background: rgba(255, 0, 0, 1);
}

.form-input__message {
    margin-top: 4px;
    color: rgba(255, 0, 0, 1);
    font-family: Ubuntu;
    font-size: 12px;
    font-weight: 300;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
}

.input-info {
    margin-bottom: 12px;
}

.placing-order__item-total {
    justify-content: center;
}

.placing-order__price-total {
    margin-top: 16px;
    max-width: 430px;
    width: 100%;
    @include flexible-direction();
    font-size: 18px;
}

.center {
    align-items: center;
}

.item-price {
    display: flex;
    margin-bottom: 20px;
}

.item-total {
    display: flex;
    margin-top: 20px;
}

.price-info {
    font-weight: 300;
    width: 162px;
    padding-right: 45px;
}

.total-info {
    font-weight: 400;
    width: 162px;
    padding-right: 45px;
}

.placing-order__btn-footer {
    @include flexible-direction();
    margin-top: 53px;
    width: 100%;
}

.placing-order__btn {
    border-radius: 4px;
    background: rgba(12, 51, 74, 1);
    color: white;
    font-family: 'Neucha', cursive;
    display: flex;
    padding: 14px 0;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.05em;
    text-align: left;
}

.placing-order__btn-info {
    margin-top: 20px;
    margin-bottom: 12px;
    font-family: 'Ubuntu';
    font-size: 12px;
    font-weight: 300;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
}
</style>