<template>
    <div class="cart__roll-card">
        <div class="roll-card__inner">
            <div class="roll-card__img">
                <img class="roll__img"  :src="roll.url" alt="">
            </div>
            <div class="roll-card__name-compound-weight">
                <div class="roll-card__name-heart">
                    <div class="roll-card__name">
                        {{ roll.name }}
                    </div>
                    <div class="roll-card__heart">
                        <img :src="likeBtn">
                    </div>
                </div>
                <div class="roll-card__compound">
                    {{ roll.compound }}
                </div>
                <div class="roll-card__weight">
                    ({{ roll.weight }}) г
                </div>
            </div>
            <div class="roll-card__block-price">
                <div class="roll__price">
                    <div class="word-price">Цена </div>
                    <div class="roll-card__price">
                        {{ roll.price }} ₽
                    </div>
                </div>
                <div class="block-price__btns">
                    <img :src="minus" @click="substractRollCount(roll)">
                    <div class="roll-one-price">{{ needRoll.quantity }}</div>
                    <img :src="plus" @click="additionRollCount(roll)">
                </div>
                <div class="block-price__sum">
                    <div class="word-price">Сумма </div>
                    <div class="roll-card__price">
                        {{ sumRolls }} ₽
                    </div>
                </div>
            </div>
            <div class="roll-card__block-delete" @click="removeRoll(roll)">
                <div class="roll-card__btn-delete">
                    <img class="icon-delete" :src="iconCart">
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
import IconInfo from 'assets/logo/icon-info.svg';
import IconCheck from 'assets/logo/icon-check-mark.svg';
import { mapGetters, mapActions } from 'vuex';

export default {
    props: {
        visibleCart: Boolean,
        roll: {}
    },
    computed: {
        ...mapGetters(['sumAllRolls']),
        cart() {
            return this.$store.getters['cart/cartRolls'];
        },
    },
    data() {
        return {
            needRoll: 0,
            sumRolls: 0,
            likeBtn: Heart,
            point: Dot,
            minus: IconMinus,
            plus: IconPlus,
            iconCart: IconCart,
            priceSeveralPieces: 1,
            visibleOrder: false,
            iconInfo: IconInfo,
            totalSum: 450,
        }
    },
    methods: {
        ...mapActions('cart', ['removeRollFromCart', 'deleteRollFromCart', 'setSumRolls']),
        showPlacingOrder() {
            this.visibleOrder = true;
        },
        substractRollCount(roll) {
            this.needRoll.quantity--;
            this.$store.commit('cart/removeRollFromCart', roll);
            if(this.needRoll.quantity < 1) {
                this.$store.commit('cart/deleteRollFromCart', roll);
            }
            this.$store.commit('cart/setSumRolls');
            this.findAllSum();
        },
        additionRollCount(roll) {
            this.needRoll.quantity++;
            this.$store.commit('cart/addRollToCart', roll);
            this.$store.commit('cart/setSumRolls');
            this.findAllSum();
        },
        removeRoll(roll) {
            this.$store.commit('cart/deleteRollFromCart', roll);
            this.$store.commit('cart/setSumRolls');
        },
        findAllSum() {
            this.sumRolls = this.needRoll.price*this.needRoll.quantity;
        }
    },
    mounted() {
        this.needRoll = {
            name: this.roll.name,
            price: this.roll.price,
            weight: this.roll.weight,
            compound: this.roll.compound,
            url: this.roll.url,
            id: this.roll.id,
            quantity: this.roll.quantity
        }
        this.findAllSum();
    },
    watch: {
       
    }
}

</script>

<style lang="scss" scoped >
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

.cart__roll-card {
    background: #FAFAFA;
    border-radius: 8px;
    margin: 5px 0;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
}

.roll-card__inner {
    display: flex;
    padding: 15px 15px;
    padding-right: 0;
    position: relative;
}

.roll-card__img {
    width: 80px;
    height: 60px;
}

.roll__img {
    width: 100%;
    height: 100%;
}

.roll-card__name-compound-weight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 25px;
    width: 211px;
}

.roll-card__name-heart {
    display: flex;
    justify-content: space-between;
}

.roll-card__name {
    font-size: 16px;
    color: rgba(20, 20, 20, 1);
}

.roll-card__compound,
.roll-card__weight {
    font-size: 13px;
    display: flex;
    flex-wrap: wrap;
    color: rgba(175, 175, 175, 1);
}

.roll-card__block-price {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 35px;
}

.roll__price {
    display: flex;
    align-items: center;
}

.word-price {
    font-size: 13px;
}

.roll-card__price {
    font-size: 16px;
    margin-left: 10px;
}

.block-price__btns {
    display: flex;
    justify-content: space-between;
}

.block-price__sum {
    display: flex;
}

.roll-card__block-delete {
    width: 41px;
    height: 64px;
    border-top-left-radius: 200px;
    border-bottom-left-radius: 200px;
    background: rgba(49, 37, 37, 1);
    margin-left: 23px;
    position: absolute;
    right: 0;
    top: 25px;
}

.roll-card__btn-delete {
    position: absolute;
    display: flex;
    width: 15px;
    height: 15px;
    background: rgba(49, 37, 37, 1);
    color: white;
    top: 25px;
    left: 15px;
}

</style>