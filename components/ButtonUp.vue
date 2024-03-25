<template>
    <div class="menu__block-up">
        <div class="menu__icon-up-wrapper" @click="upPage()">
            <img class="icon-up" :src="iconUp">
        </div>
    </div>
</template>

<script>
import IconUp from 'assets/logo/icon-up.svg';

export default {
    data() {
        return {
            iconUp: IconUp,
        }
    },
    methods: {
        upPage() {
            window.scrollTo(0, 10);
        },
    }
}

</script>

<style scoped>
.menu__block-up {
    display: flex;
    align-items: flex-end;
    margin-bottom: 200px;
    margin-left: 60px;
    
}

.menu__icon-up-wrapper {
    width: 60px;
    height: 60px;
    background: #312525;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-up {
    width: 25px;
    height: 25px;
    color: white;
}

</style>