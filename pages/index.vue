<template>
  <div class="main" :class="{ blur: visibleCart, screen__timing: visibleCart }" @click="unvisibleCart()">
    <ContentPage />
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default ({
  layout: 'navigation',
    computed: {
    ...mapGetters(['visibleCart']),
  },
  data() {
    return {
     
    }
  },
  methods: {
    ...mapActions(['unvisibleCart']),
    
  },
  mounted() {

  },
})
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  height: 2231px;
}

.screen__timing {
  height: 998px;
}

.blur {
  filter: blur(5px);
}

@media (max-width: 990px) {

  body {
    width: 990px;
    height: 780px;
  }

  .main {
    width: 990px;
  }
}

@media (max-width: 320px) {
  
  body {
    width: 320px;
    height: 289px;
  }

  .main {
    width: 320px;
    height: 289px;
  }
}
</style>
