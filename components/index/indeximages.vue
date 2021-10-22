<template>
<div>
  <!--  DESKTOP/TABLET LAYOUT-->
<!-- {{getnewsopened}} -->
  <div v-if="showindeximages" class="columns is-gapless fadein-on-load is-hidden-mobile">
    <div class="first column flex-column">

      <nuxt-link v-for="item in colI" :key="item.id" v-if="!item.disable" :to="'projects/'+item.linkto.post_name" class="" :class="[imgposition(item.index_image_position),imgsize(item.index_image_size),imgpadding(item.index_image_padding)]">
        <div class="imginner">
          <!-- <img :src="pickrandomimage(item).sizes.large" :srcset="pickrandomimage(item).sizes.large+' 1000w, '+pickrandomimage(item).sizes.x_large+' 2000w'"/> -->
          <img class="" v-lazy="pickrandomimage(item).sizes.large" :data-srcset="pickrandomimage(item).sizes.medium+' 1000w, '+pickrandomimage(item).large + ' 2000w'" />
          <!-- <img class="slidein-on-load" v-lazy="pickrandomimage(item).sizes.large" :data-srcset="pickrandomimage(item).sizes.large+' 1000w, '+pickrandomimage(item).x_large + ' 2000w'" /> -->
          <span class="is-size-6 imgcaption p-40 is-peach-opacity">{{item.linkto.post_title}}</span>
        </div>
      </nuxt-link>

    </div>
    <div class="second column flex-column">
      <nuxt-link v-for="item in colII" :key="item.id" v-if="!item.disable" :to="'projects/'+item.linkto.post_name" class="" :class="[imgposition(item.index_image_position),imgsize(item.index_image_size),imgpadding(item.index_image_padding)]">
        <div class="imginner">
          <!-- <img :src="pickrandomimage(item).sizes.large"  :srcset="pickrandomimage(item).sizes.large+' 1000w, '+pickrandomimage(item).sizes.x_large+' 2000w'"/> -->
          <img class="" v-lazy="pickrandomimage(item).sizes.large" :data-srcset="pickrandomimage(item).sizes.medium+' 1000w, '+pickrandomimage(item).large + ' 2000w'" />
          <!-- <img class="slidein-on-load" v-lazy="pickrandomimage(item).sizes.large" :data-srcset="pickrandomimage(item).sizes.large+' 1000w, '+pickrandomimage(item).x_large + ' 2000w'" /> -->
          <span class="is-size-6 imgcaption p-40 is-peach-opacity">{{item.linkto.post_title}}</span>
        </div>
      </nuxt-link>

    </div>
  </div>

  <!--  MOBILE LAYOUT-->
  <div class="fadein-on-load is-hidden-tablet">
    <div v-for="(item, index) in imagecontent" :key="index">
      <nuxt-link v-for="itemsingle in item" :key="item.id" v-if="!itemsingle.disable" :to="'projects/'+itemsingle.linkto.post_name" class="pb-20" :class="">
        <div class="mobilelayout">
          <img v-if="!isOldSafari" class="slidein-on-load is-horizontal-center" v-lazy="pickrandomimage(itemsingle).sizes.medium">
          <img v-else class="slidein-on-load is-horizontal-center" :src="pickrandomimage(itemsingle).sizes.medium">
        </div>
      </nuxt-link>

    </div>

  </div>

</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import _ from 'lodash'

export default {
  // mounted(){
  //   console.log(  this.$Lazyload)
  // },

  data: function() {
    return {
      imagecontent: this.content.acf.index_images,
      showindeximages: true
    }
  },
  computed: {
    ...mapGetters({
      getmenu: "getmenu",
      getabout: "getabout",
      getnewsopened: "getnewsopened",
      getnews: "getnews",
      getnewscontent: "getnewscontent",
    }),
    isOldSafari: function() {
      if (process.browser) {

        navigator.sayswho= (function(){
            var ua= navigator.userAgent, tem,
            M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if(/trident/i.test(M[1])){
                tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE '+(tem[1] || '');
            }
            if(M[1]=== 'Chrome'){
                tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
                if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
            if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
            return M;

        })();
        if(navigator.sayswho[0]==='Safari' && parseInt(navigator.sayswho[1])<9 ){
        return  true;
        }

        // return navigator.sayswho // outputs: `Chrome 62`
        // var is_safari =  /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
        // return is_safari
      }
    },
    colI() {
      return _.map(this.imagecontent, 'col_i');
    },
    colII() {
      return _.map(this.imagecontent, 'col_ii');
    }
  },
  methods: {
    pickrandomimage: function(input) {
      var rand = input.single_image_random[Math.floor(Math.random() * input.single_image_random.length)];
      return rand
    },
    imgsize: function(input) {
      if (input === 'large') {
        return 'is-large'
      }
      if (input === 'medium') {
        return 'is-medium'
      }
      if (input === 'small') {
        return 'is-small'
      }
    },
    imgposition: function(input) {
      if (input === 'left') {
        return 'is-horizontal-left'
      }
      if (input === 'right') {
        return 'is-horizontal-right'
      }
    },
    imgpadding: function(input) {
      if (input === 'no-padding') {
        return 'p-20'
      }
      if (input === 'padding') {
        return 'p-60'
      }
    }
  },
  props: ['content'],
  watch:{
    "getmenu":function(){
      var vm = this
    },
    "getabout":function(){
      if(this.getabout){
        this.showindeximages = false
      }else{
        this.showindeximages = true

      }

    },
    "getnewsopened":function(){
      if(this.getnewsopened){
        this.showindeximages = false
      }else{
        this.showindeximages = true

      }
    },

  }

}
</script>



<style scoped lang="scss">
* {
    box-sizing: border-box;
}
a {
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.columns.is-gapless:not(:last-child) {
    margin-bottom: 0;
}

@keyframes slidein {
    0% {
        transform: translateY(5px);
    }
    100% {
        transform: translateY(0px);
    }
}

img[lazy=loaded] {
    &.slidein-on-load {
        animation: 1s ease-in-out slidein;
        animation-fill-mode: forwards;

    }
}

.imginner {
    position: relative;
    display: table;
    .imgcaption {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        top: 0;
        transition: opacity 0.2s;
    }
    &:hover {
        .imgcaption {
            opacity: 1;
            transition-delay: 0.35s;
        }
    }
}

/*.column,.outerwrap{
  border: 1px dashed red;
}*/

a {
    display: block;
}

img {
    display: block;
}
.mobilelayout {
    img {
        // width: 100%;
        max-width: 100%;
    }
}

.is-small {
    width: 60%;
}

.is-medium {
    width: 80%;
}

.is-large {
    width: 100%;
}

.flex-column {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}

.is-horizontal-center {
    margin-right: auto;
    margin-left: auto;
}

.is-horizontal-left {
    margin-right: auto;
}

.is-horizontal-right {
    margin-left: auto;
}

.is-vertical-center {
    margin-top: auto;
    margin-bottom: auto;
}

.is-vertical-bottom {
    margin-top: auto;
}

.is-vertical-top {
    margin-bottom: auto;
}
</style>
