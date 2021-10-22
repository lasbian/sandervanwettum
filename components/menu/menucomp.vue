<template>
<transition name="slide-fade">
  <div v-if="getmenu" class="menucomp is-green" :class="scrsize">
    <headercomp :title="'Menu'" :icon="'close'"></headercomp>
    <div class="mb-20 mt-40 ml-40 mr-40">
      <nuxt-link class="is-size-6" to="/">Index</nuxt-link>
      <span class="is-size-6">
        Projects:
      </span>
      <div class="projects projectswrapper mb-20 mt-20 ml-20">
        <nuxt-link  class="is-size-6" v-for="project in getprojects" :key="project.id" :to="'/projects/'+project.slug" ><span class="is-underlined" v-html='project.title.rendered'></span></nuxt-link>
      </div>
      <template>
        <p><nuxt-link class="is-inline is-size-6" to="?about=true&part=info">Info</nuxt-link></p>
        <p><nuxt-link class="is-inline is-size-6" to="?about=true&part=cv" >CV</nuxt-link></p>
        <p><nuxt-link class="is-inline is-size-6" to="?about=true&part=newsletter">Newsletter</nuxt-link></p>
        <p><nuxt-link class="is-inline is-size-6" to="?about=true&part=footer">About</nuxt-link></p>
      </template>

    </div>
    <news></news>
    <newsreopen></newsreopen>
  </div>
</transition>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import headercomp from '~/components/header/headercomp.vue'
import news from '~/components/menu/news.vue'
import newsreopen from '~/components/menu/newsreopen.vue'

export default {
  computed: {
    ...mapGetters({
      getprojects: "getprojects",
      getmenu: "getmenu",
      getnews: "getnews",
      getappinitated: "getappinitated",
    })
  },
  data:function(){
    return{
      aboutmenu:[
        {}
      ]
    }
  },
  components: {
    headercomp,
    news,
    newsreopen,
  },

  mounted() {
    if (this.scrsize === 'is-screen-s') {
      this.$store.commit('SET_MENU', false)
    }
  },

  methods:{
    test: function(part){
      // this.$store.commit('SET_ABOUT', true)

    }
  }

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

.menucomp {
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    z-index: 2;
    width: 50%;
    position: fixed;
    display: block;
    height: 100%;
    right: 0;
    top: 0;
    &.is-screen-s {
        width: 100%;
    }
}

a {
    display: table;
}

.projectswrapper{

  .nuxt-link-exact-active{
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

}
</style>
