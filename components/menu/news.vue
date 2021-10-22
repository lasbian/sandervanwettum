<template>
<transition name="slide-fade">

  <div v-if="getnews" class="news is-gray ">
    <headercomp :title="'News'" :secondtitle="getnewscontent.title.rendered" :icon="'news'" :newsopened="true"></headercomp>
    <div class="mb-40 mt-40 ml-40 mr-40 is-size-6 androidFontBoostHack" >
      <div class="blurb" v-html="getnewscontent.acf.blurb">
      </div>
      <p class="ml-10 leesmeer is-underlined-index" @click="$store.commit('SET_NEWSOPENED',true); $store.commit('SET_NEWS',false); $store.commit('SET_READMORE', false)">Read more</p>
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
  computed: {
    ...mapGetters({
      getnews: "getnews",
      getnewscontent: "getnewscontent",
    }),
  },
  components: {
    headercomp,
  }
}
</script>



<style scoped lang="scss">
/* Enter and leave animations can use different */

/* durations and timing functions.              */

.slide-fade-enter-active {
  transition: all .4s ease;
  transition-delay: 0.4s;
}

.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */

  {
  transform: translateY(10px);
  opacity: 0;
  /* filter:blur(100); */
}

.blurb{
  display: inline;
}

.leesmeer{
  display: inline;
  cursor: pointer;
}

a {
  display: block;
}

.news {
  overflow-y: auto;
  &::-webkit-scrollbar {
      display: none;
  }
  -webkit-backface-visibility: hidden;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: 50%;
}
</style>
