<template>
<transition name="slide-fade">
  <div v-if="getreadmore" class="readmorecomp is-peach" :class="scrsize">
    <headercomp :title="'Description'" :secondtitle="getviewing" :icon="'closereadmore'"></headercomp>
    <div class="mb-20 mt-40 ml-40 mr-40 is-size-6 androidFontBoostHack" v-html="description">
    </div>
  </div>

</transition>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import headercomp from '~/components/header/headercomp.vue'



export default {


  data: function() {
    return {
      show: true
    }
  },

  props: ['description'],


  components: {
    headercomp,
  },
  computed: {
    ...mapGetters({
      getviewing: "getviewing",
      getreadmore: "getreadmore",
    }),
  },
}
</script>



<style scoped lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all 0.2s ease;
}
.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
/* .slide-fade-leave-active below version 2.1.8 */
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
    /* filter:blur(100); */
}

.readmorecomp {
    overflow-y: auto;
    z-index: 2;
    width: 50%;
    position: fixed;
    display: block;
    height: 100%;
    left: 0;
    top: 0;
    &.is-screen-s {
        width: 100%;
    }
    a {
        border-bottom: 2px solid #091540;
    }
}
a {
    display: block;
}
</style>
