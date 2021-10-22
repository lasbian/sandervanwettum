<template>
  <div class="projectSlideshow p-40 " :class="nighttime ? 'is-darkgray':''">
    <!-- <transition name="slide-fade"> -->

    <slideshowswipermobile v-show="scrsize != 'is-screen-l'" :nighttime="nighttime" class="is-hidden-desktop" :slides="slides"></slideshowswipermobile>
    <slideshowswiperdesktop v-show="scrsize === 'is-screen-l' || scrsize === 'is-screen-xl'" :nighttime="nighttime" class="is-hidden-touch" :slides="slides"></slideshowswiperdesktop>
  <!-- </transition> -->
    <div class="nighttime mb-40 mr-40">
      <div v-if="nighttime" @click="$store.commit('SET_NIGHTTIME', false);" class="fullCircle is-white"></div>
      <div class="halfCircleOuter" v-else @click="$store.commit('SET_NIGHTTIME', true);" >
        <div class="halfCircle is-darkgray"></div>
      </div>
    </div>
  </div>
</template>
<script>
import slideshowswiperdesktop from '~/components/project/slideshow-swiper-desktop.vue'
import slideshowswipermobile from '~/components/project/slideshow-swiper-mobile.vue'
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    slideshowswiperdesktop,
    slideshowswipermobile
  },
  computed: {
    ...mapGetters({
      nighttime: "nighttime",
    }),
  },
  props: ['slides']
}
</script>
<style lang="scss" scoped>

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-leave-active {
  transition: all 8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.projectSlideshow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: background 0.2s;
}
.nighttime {
    right: 0;
    bottom: 0;
    position: absolute;
    z-index: 1;


    .halfCircleOuter{
      cursor: pointer;
    }
    .halfCircle {
        display: inline-block;
        height: 10px;
        width: 20px;
        transform: rotate(45deg);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .fullCircle {
        margin-bottom: -3px;
        // margin-right: -1px;
        display: inline-block;
        height: 20px;
        width: 20px;
        cursor: pointer;
        border-radius: 100%;
        -webkit-box-shadow: 0 0 1px 0 white;
        -moz-box-shadow: 0 0 1px 0 white;
        box-shadow: 0 0 1px 0 white;
    }

}
</style>
