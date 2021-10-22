<template>
<div>

  <div v-if="!mobilereadmore" class="headerComp mb-20 mt-40 ml-40 mr-40">
    <div class="columns is-gabless">
      <div class="column">
        <p class="is-size-6 header">
          <template v-if="icon != 'loading'">
              <span class="androidFontBoostHack is-pulled-left pr-40">
                <span v-if="title ==='Sander van Wettum'">
                  <nuxt-link v-if="$route.path === '/' "style="display:inline-block; border:0" class="ignoreborder" to="/">Sander van Wettum</nuxt-link>
                  <nuxt-link v-else class="is-underlined-index" to="/">Sander van Wettum</nuxt-link>

                </span>
                <span v-else v-html="title"></span>
                <span v-if="secondtitle && !ignore_secondtitle" class="pr-10">
                  <br class="is-hidden-tablet"/>
                  <span class="is-hidden-mobile pr-10 pl-10 emdash-logostyle"><span></span></span>
                  <span class="" v-html="secondtitle"></span>
                </span>
              </span>
              <!-- @click="$store.commit('SET_NEWSOPENED',true); $store.commit('SET_NEWS',false);" -->
              <span @click="$store.commit('SET_ABOUT', false); resetHash(); $store.commit('SET_VIEWING', getviewingproject); setAboutQuery(false)" v-if="icon === 'closereadmore' && isAbout" class="is-absoulute-icon is-pulled-right menu-toggle-btn open"><span></span><span></span><span></span></span>

              <span @click="$store.commit('SET_NEWSOPENED', false);" v-if="icon === 'closereadmore' && isNewsopened" class="is-absoulute-icon is-pulled-right menu-toggle-btn open"><span></span><span></span><span></span></span>

              <span @click="$store.commit('SET_READMORE', true); setReadmoreQuery(true)" v-if="icon === 'openreadmore' && isprojects" class="is-absoulute-icon is-pulled-right menu-toggle-btn menu-readmore"><span></span><span></span><span></span></span>
              <span @click="$store.commit('SET_READMORE', false); setReadmoreQuery(false)" v-if="icon === 'closereadmore' && isprojects && !isAbout && !isNewsopened" class="is-absoulute-icon is-pulled-right menu-toggle-btn open"><span></span><span></span><span></span></span>

              <span @click="$store.commit('SET_MENU', false); resetHash();" v-if="icon === 'close'" :class="scrsize" class="is-absoulute-icon is-hidden-mobile is-pulled-right menu-toggle-btn open"><span></span><span></span><span></span></span>
              <span @click="$store.commit('SET_MENU', false); resetHash()" v-if="icon === 'close'" :class="scrsize"  class="is-absoulute-icon is-hidden-tablet is-hidden-desktop is-pulled-right menu-toggle-btn open"><span></span><span></span><span></span></span>

              <span @click="$store.commit('SET_NEWS', false)" v-if="icon === 'news'" class="is-absoulute-icon is-pulled-right menu-toggle-btn open"><span></span><span></span><span></span></span>
              <span @click="$store.commit('SET_NEWS', false)" v-if="icon === 'news'" class="is-absoulute-icon is-pulled-right menu-toggle-btn open"><span></span><span></span><span></span></span>

              <span @click="$store.commit('SET_MENU', true)" v-if="icon === 'menu'" class="is-hidden-mobile is-pulled-right menu-toggle-btn"><span></span><span></span><span></span></span>
              <span @click="$store.commit('SET_MENU', true)" v-if="icon === 'menu'" class="is-absoulute-icon is-hidden-desktop is-pulled-right menu-toggle-btn"><span></span><span></span><span></span></span>
            </template>
          <template v-else>
            <span class="is-pulled-left pr-40">
              <span>
                <span style="display:inline-block; border:0" to="/">Loading...</span >
              </span>
            </span>
            </template>

        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <span @click="$store.commit('SET_READMORE', true); setReadmoreQuery(true)" v-if="isprojects" class="is-pulled-right menu-toggle-btn menu-readmore"><span></span><span></span><span></span></span>
  </div>

</div>
</template>

<script>
// import vuex from 'vuex'
// import store from 'vuex'
import {
  mapGetters
} from 'vuex'

export default {
  components: {},


  props: ['title', 'secondtitle','ignore_secondtitle', 'icon', 'mobilereadmore', 'passedSrcsize','isAbout','isNewsopened'],

  computed: {
    ...mapGetters({

      getviewingproject: "getviewingproject",
    }),
    isprojects: function() {
      if (this.$route.fullPath.replace(/^\/+/g, '').split("/")[0] === 'projects') {
        return true;
      }
    },
    isreadmore: function() {
      if (this.$route.hash === '#read') {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {

    resetHash: function() {
      this.$router.push({ query: {}})

      // this.$router.push('/')
      // if (this.isprojects) {
      //   return;
      // } else {
      //   this.$router.push('/')
      //
      // }
    },


    UpdateQueryString: function(url, key, value) {
      if (!url) url = window.location.href;
      var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;
      if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
          return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
          hash = url.split('#');
          url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
          if (typeof hash[1] !== 'undefined' && hash[1] !== null)
            url += '#' + hash[1];
          return url;
        }
      } else {
        if (typeof value !== 'undefined' && value !== null) {
          var separator = url.indexOf('?') !== -1 ? '&' : '?';
          hash = url.split('#');
          url = hash[0] + separator + key + '=' + value;
          if (typeof hash[1] !== 'undefined' && hash[1] !== null)
            url += '#' + hash[1];
          return url;
        } else
          return url;
      }
    },

    setReadmoreQuery: function(toggle) {
      if (toggle) {
        window.history.replaceState('', '', this.UpdateQueryString(window.location.href, 'read', 'true'));
      } else {
        window.history.replaceState('', '', this.UpdateQueryString(window.location.href, 'read', 'false'));
      }


    },

    setAboutQuery: function(toggle) {

      // this.$router.push({ path: '/' })
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
          var clean_uri = uri.substring(0, uri.indexOf("?"));
          window.history.replaceState({}, document.title, clean_uri);
      }
    }

  },

  // mounted(){
  //   if(this.isreadmore){
  //     this.$store.commit('SET_READMORE', true);
  //   }
  // }



}
</script>




<style lang="scss" scoped>

.ignoreborder {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
.headerComp {
    position: relative;
    -webkit-user-select: none;
    /* Safari 3.1+ */
    -moz-user-select: none;
    /* Firefox 2+ */
    -ms-user-select: none;
    /* IE 10+ */
    user-select: none;
    /* Standard syntax */
    .is-absoulute-icon {
        position: absolute;
        right: 0;
    }
}

.header {
    width: 100%;
    display: inline-block;
}
p {
    line-height: 1;
}

.loading {
    span {
        // visibility: hidden;
    }
}

.emdash-logostyle {

    span {
        background: #091540;
        display: inline-block;
        width: 20px;
        height: 2px;
        border-radius: 5px;
        margin-bottom: 5px;
        // -webkit-transition: all 0.5s linear;
        // transition: all 0.3s linear;
    }
}
.menu-toggle-btn {
    // margin: 15px;
    margin-top: 3px;
    cursor: pointer;
    width: 20px;
    height: 20px;

    span {
        background: #091540;
        display: block;
        width: 20px;
        height: 2px;
        border-radius: 5px;
        margin-bottom: 5px;
        // -webkit-transition: all 0.5s linear;
        // transition: all 0.3s linear;
    }
    &.menu-readmore {
        span {
            &:nth-child(1) {
                // display: none;
                width: 85%;

            }
            &:nth-child(2) {
                width: 100%;
            }
            &:nth-child(3) {
                width: 35%;
            }
        }
    }
    &.open {
        span {
            &:nth-child(1),
            &:nth-child(3) {
                transform: translate(0px, 12px) rotate(-45deg) scalex(1.2);
                margin-top: -5px;
            }
            &:nth-child(2) {
                height: 0;
                margin: 0;
            }
            &:nth-child(3) {
                transform: translate(0px, 10px) rotate(45deg) scalex(1.2);
            }
        }
    }
}

.is-white-text {
    opacity: 0;

    color: #FFFFFF;
    a {
        color: #FFFFFF;
    }

    .emdash-logostyle {
        span {
            background: white;
        }
    }

    .menu-toggle-btn {
        span {
            background: white;
        }
    }
}
</style>
