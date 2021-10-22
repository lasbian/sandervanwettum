<template>
<div v-swiper:mySwiperMobile="swiperOptionMobile" class="swiper-mobile swiper-outer">
  <!-- <div class="swiper-nav swiper-nav-prev" @click="prevSlide()">
  </div>
  <div class="swiper-nav swiper-nav-next" @click="nextSlide()">
  </div> -->
  <div class="swiper-wrapper">
    <div class="swiper-slide " v-for="slide in mobileSlides" :key="slide.id">
      <!-- {{slide}} -->
      <img v-if="typeof(slide.photo_video) === 'undefined'" :data-src="slide.sizes.large" class="swiper-lazy">
      <div v-if="typeof(slide.photo_video) !== 'undefined'" v-html="slide.single_slide_video">
      </div>

      <div v-if="typeof(slide.photo_video) === 'undefined'" class="swiper-lazy-preloader"><span class="is-darkblue"></span></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: function() {
    return {

      swiperOptionMobile: {
        loop: true,
        lazy: {
          loadPrevNext: true,
        },
        effect: 'fade',
        preloadImages: true,
        wrapperClass: 'swiper-wrapper',
        slideClass: 'swiper-slide',
        // pagination: {
        //   el: '.swiper-pagination',
        //   dynamicBullets: true
        // },
        on: {
          slideChange() {},
          tap() {}
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiperMobile.swiper
    },
    mobileSlides() {

      var mobileSlides = []
      var slides = this.slides
      for (var i = 0, len = slides.length; i < len; i++) {
        // someFn();
        if(slides[i].photo_video === false){
          mobileSlides.push(slides[i])
        }
        for (var iSingle = 0, lenSingle = slides[i].single_slide.length; iSingle < lenSingle; iSingle++) {
          // someFn();
          mobileSlides.push(slides[i].single_slide[iSingle])
        }
      }
      return mobileSlides;
    }
  },
  props: ['slides', ],
  methods: {
    nextSlide: function() {
      this.mySwiperMobile.slideNext()
    },
    prevSlide: function() {
      this.mySwiperMobile.slidePrev()
    },

  },

  mounted() {
    // this.mobileSlides()
  }

}
</script>

<style lang="scss">
  .swiper-mobile{
    @media screen and (orientation:portrait) {
      iframe {
          position: absolute;
          top: 25%;
          left: 5%;
          width: 90%;
          height: 50%;
      }
    }
    @media screen and (orientation:landscape) {
      iframe {
          position: absolute;
          top: 0%;
          left: 20%;
          width: 60%;
          height: 100%;
      }
    }
  }


</style>
<style lang="scss" scoped>
.swiper-outer {

    height: calc(100% - 80px);
    margin-top: 50px;

    .swiper-nav {
        height: 100%;
        width: 50%;
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

    // .Aligner {
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    // }
    //
    // .Aligner-item {
    //     max-width: 50%;
    // }
    //
    // .Aligner-item--top {
    //     align-self: flex-start;
    // }
    //
    // .Aligner-item--bottom {
    //     align-self: flex-end;
    // }

    // height: calc(100vh - 100px);
    width: 100%;
    // z-index: -1;

    img {
        // margin: 0 auto;
        // width: auto;
        // max-width: 100%;
        // max-height: calc(100vh - 160px);
        // display: block;
        max-height: 100%;
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
        display: -webkit-box;
        /* OLD - iOS 6-, Safari 3.1-6, BB7 */
        display: -ms-flexbox;
        /* TWEENER - IE 10 */
        display: -webkit-flex;
        /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center; /* Safari 7.0+ */
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
