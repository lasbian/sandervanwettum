<template>
<!-- You can find this swiper instance object in current component by the "mySwiper"  -->
<span>
  <div v-swiper:mySwiper="swiperOption" class="swiper-outer swiper-desktop fadein-on-load">
    <div class="swiper-nav swiper-nav-prev" @click="prevSlide()">
    </div>
    <div class="swiper-nav swiper-nav-next" @click="nextSlide()">
    </div>
    <div class="swiper-wrapper">
      <div class="swiper-slide " v-for="slide in slides">
        <div class="columns is-gapless">
          <div v-if="slide.photo_video === true" class="column Aligner" v-for="(singleslide,index) in slide.single_slide" :key="singleslide.id">
            <template v-if="slide.single_slide.length > 1">
              <span class="mr-20" v-if="index === 0">
                <img :data-src="singleslide.sizes.medium" class="swiper-lazy"><div class="swiper-lazy-preloader"><span class="is-darkblue"></span></div>
</span>
<span class="ml-20" v-else-if="index === slide.single_slide.length - 1">
                <img :data-src="singleslide.sizes.medium" class="swiper-lazy"><div class="swiper-lazy-preloader"><span class="is-darkblue"></span></div>
</span>
<span class="mr-10 ml-10" v-else>
                <img :data-src="singleslide.sizes.medium" class="swiper-lazy"><div class="swiper-lazy-preloader"><span class="is-darkblue"></span></div>
</span>
</template>
<template v-else>
<span>
                <img :data-src="singleslide.sizes.large"  class="swiper-lazy"><div class="swiper-lazy-preloader"><span class="is-darkblue"></span></div>
</span>
</template>
</div>
<div v-if="slide.photo_video === false" v-html="slide.single_slide_video">



</div>
</div>
</div>
</div>
</div>
<div class="m-40 slideshow-caption" :class="nighttime ? 'is-white-text':''">
  <span v-if="slides.length>1" class="pr-40 ">{{slideIndex+1}} / {{slides.length}} </span>
  <span class=""> {{caption}} </span>
</div>
</span>
</template>

<script>
export default {

  data: function() {
    var vm = this
    return {

      slideIndex: '',
      caption: '',

      swiperOption: {
        lazy: {
          loadPrevNext: true,
        },
        loop: true,
        effect: 'fade',
        preloadImages: true,
        wrapperClass: 'swiper-wrapper',
        slideClass: 'swiper-slide',
        on: {

          init() {
            // vm.test='hey'
          },
          slideChange() {
            vm.slideIndex = this.realIndex

            if ('caption' in vm.slides[vm.slideIndex]) {
              vm.caption = vm.slides[vm.slideIndex].caption
            } else {
              vm.caption = ''
            }
          },
          tap() {}
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted: function() {
    if (process.browser) {

      // $(document).ready(function() {
      // Target your .container, .wrapper, .post, etc.
      // $('iframe[src*="youtube"]').parent().fitVids();
      // });
    }

  },
  props: ['slides', 'nighttime'],
  methods: {
    nextSlide: function() {
      this.mySwiper.slideNext()
    },
    prevSlide: function() {
      this.mySwiper.slidePrev()
    },

  },

}
</script>

<style lang="scss">
  .swiper-desktop{
    iframe {
        position: absolute;
        top: 0;
        left: 12%;
        width: 76%;
        height: 100%;
    }
  }
</style>

<style lang="scss" scoped>
.slideshow-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    -webkit-user-select: none;
    /* Safari 3.1+ */
    -moz-user-select: none;
    /* Firefox 2+ */
    -ms-user-select: none;
    /* IE 10+ */
    user-select: none;
    /* Standard syntax */
}
.swiper-outer {

    height: calc(100% - 120px);
    margin-top: 60px;

    @media screen and (max-height: 800px) {
        height: calc(100% - 80px);
        margin-top: 40px;
    };

    .swiper-nav {
        height: 100%;
        width: 25%;
        position: absolute;
        z-index: 2;

    }
}
.projectSlideshow:not(.is-darkgray) {
    .swiper-nav-next {
        right: 0;
        cursor: url('/arrowRight.png'), auto;
    }
    .swiper-nav-prev {
        cursor: url('/arrowLeft.png'), auto;
    }
}

.projectSlideshow.is-darkgray {
    .swiper-nav-next {
        right: 0;
        cursor: url('/arrowRightWhite.png'), auto;

    }
    .swiper-nav-prev {
        cursor: url('/arrowLeftWhite.png'), auto;
    }
}

.projectSlideshow {

    .Aligner {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .Aligner-item {
        max-width: 50%;
    }

    .Aligner-item--top {
        align-self: flex-start;
    }

    .Aligner-item--bottom {
        align-self: flex-end;
    }

    // height: calc(100vh - 100px);
    width: 100%;
    // z-index: -1;

    img {
        margin: 0 auto;
        width: auto;
        max-height: calc(100vh - 200px);
        @media screen and (max-height: 800px) {
            max-height: calc(100vh - 150px);

        };

        display: block;
    }
    .swiper-lazy {
        opacity: 0;
        transition: opacity 0.4s;
    }
    .swiper-lazy-loaded {
        opacity: 1;
    }

    @keyframes rotateanimation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    &.is-darkgray {
        .swiper-lazy-preloader {
            span {
                background: white;
            }
        }
    }
    .swiper-lazy-preloader {
        animation: rotateanimation 1s infinite;
        animation-fill-mode: forwards;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;

        span {
            width: 20px;
            height: 2px;
            display: block;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            // position: absolute;
        }
        &:after {
            background: none !important;
            background-image: none !important;
        }
    }

    .swiper-slide {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0 !important;
    }
    .swiper-slide-active {
        opacity: 1 !important;
    }
    .swiper-pagination {

        > .swiper-pagination-bullet {}
    }
}
</style>
