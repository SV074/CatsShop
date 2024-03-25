<template>
    <div class="menu__roll" :class="{ buy: rollInCart }">
        <div class="menu__roll-card">
            <div class="menu__roll-image-btn-like">
                <div class="menu__roll-image">
                    <img class="roll-image" :src="roll.url">
                </div>
                <div class="menu__btn-like">
                    <img v-if="!likeRoll" :src="heartIcon" @click="likeRoll = true"
                        :class="{ border_white: rollInCart }">
                    <img v-if="likeRoll" :src="heartIconRed" @click="likeRoll = false">
                </div>
            </div>
            <div class="menu__body">
                <div class="menu__roll-name-weight">
                    <div class="menu__roll-name">{{ roll.name.toUpperCase() }}</div>
                    <div class="menu__roll-weight">{{ roll.weight }} г</div>
                </div>
                <div class="menu__body-item">
                    <div class="menu__roll-compound">
                        {{ roll.compound }}
                    </div>
                    <div class="menu__roll-price-btn-cart">
                        <div class="menu__roll-price">{{ roll.price }} ₽</div>
                        <div class="menu__roll-btn-cart">
                            <button class="btn-cart" @click="addRoll(roll)" v-if="!rollInCart">В корзину</button>
                            <div class="menu__roll-btns" v-if="rollInCart">
                                <div class="roll__btn" @click="substractRollCount(roll)">
                                    <div class="roll__btn-minus">
                                        <img class="icon-btn" :src="iconMinus">
                                    </div>
                                </div>
                                <div class="roll__count">{{ needRoll.quantity }}</div>
                                <div class="roll__btn" @click="additionRollCount(roll)">
                                    <div class="roll__btn-plus">
                                        <img class="icon-btn" :src="iconPlus">
                                    </div>
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
import IconMinus from 'assets/logo/card-minus.svg';
import IconPlus from 'assets/logo/card-plus.svg';
import Heart from 'assets/logo/heart-icon1.png';
import HeartRed from 'assets/logo/heart-icon-red.png';
import { mapActions, mapGetters } from 'vuex';
import CatImage from 'static/cat-img.png';

export default {
    props: {
        roll: {}
    },
    computed: {
        cart() {
            return this.$store.getters['cart/cartRolls'];
        }
    },
    data() {
        return {
            needRoll: {},
            rollInCart: false,
            heartIcon: Heart,
            heartIconRed: HeartRed,
            likeRoll: false,
            iconMinus: IconMinus,
            iconPlus: IconPlus,
            rollCart: {},
            catImage: CatImage
        }
    },
    methods: {
        ...mapActions('cart', ['deleteRollFromCart']),
        addRoll(roll) {
            this.rollInCart = true;
            roll.quantity = 1;
            this.needRoll = {
                name: roll.name,
                price: roll.price,
                weight: roll.weight,
                compound: roll.compound,
                url: roll.url,
                id: roll.id,
                quantity: roll.quantity
            }
            this.$store.commit('cart/addRollToCart', roll);

        },
        substractRollCount(roll) {
            this.needRoll.quantity--;
            this.$store.commit('cart/removeRollFromCart', roll);
            if (this.needRoll.quantity < 1) {
                this.$store.commit('cart/deleteRollFromCart', roll);
                this.rollInCart = false;
            }
        },
        additionRollCount(roll) {
            this.needRoll.quantity++;
            this.$store.commit('cart/addRollToCart', roll);
        }
    },
    watch: {

    }
}

</script>

<style scoped>
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
    box-sizing: border-box;
    height: 100%;
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
    width: 175px;
    height: 130px;
}

.menu__btn-like {
    padding-left: 20px;
}

.menu__body {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.border_white {
    border-color: white;
    filter: invert(1);
}

.menu__roll-name-weight {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.menu__roll-weight {
    color: rgba(128, 128, 128, 1);
    font-size: 13px;
}

.menu__body-item {
    height: 100%;
    display: flex;
    flex-direction: column;
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
    width: 94px;
    align-items: center;
    justify-content: space-between;
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

.roll__btn-minus,
.roll__btn-plus {
    display: flex;
    color: black;
    font-size: 16px;
}

.icon-btn {
    color: rgba(42, 52, 74, 1);
}

.active {
    /* display: flex;
    background: red; */
    filter: brightness(10) invert();
}
</style>