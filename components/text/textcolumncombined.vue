<template>
<div class="fadein-on-load androidFontBoostHack">
  <!-- MOBILE -->
  <div class="is-hidden-tablet mb-10 ">
    <div class="mb-80" v-for="item in content" :id="scrsize === 'is-screen-s' ? item.slug : ''">
      <p v-if="!item.acf.ignore_title"class="is-size-6 pb-20" v-html="item.title.rendered">
      </p>
      <div class="is-size-6" v-html="item.content.rendered"></div>
      <div v-if="item.slug==='cv'">
        <tableitem v-for="table in item.acf.cv_tables" :content="table.tables"></tableitem>
      </div>
    </div>
  </div>
  <!-- DESKTOP -->

  <div class="is-hidden-mobile mb-40 mt-20 ml-20 mr-20">


    <div class="mb-80" v-for="item in content" :id="scrsize != 'is-screen-s' ? item.slug : ''">
      <div class="is-half pr-40">
        <p v-if="!item.acf.ignore_title"class="is-size-6 pb-20" v-html="item.title.rendered">
        </p>

        <div class="is-size-6" v-html="item.content.rendered">
        </div>
        <div v-if="item.slug==='cv'">
          <tableitem v-for="table in item.acf.cv_tables" :content="table.tables"></tableitem>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import tableitem from '~/components/text/tableitem.vue'

export default {
  components: {
    tableitem
  },
  computed: {
    ...mapGetters({
      scrsize: "scrsize",
    }),
  },
  methods: {
    offset: function(elem) {
      var rect = elem.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      }
    }
  },
  mounted() {
    if (this.$route.query.part === 'info') {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {

      window.scroll({
        top: this.offset(this.$el.querySelector('#' + this.$route.query.part)).top - 40,
        left: 0,
        behavior: 'smooth'
      });
    }

  },
  watch: {
    '$route' (to, from) {
      if (this.$route.query.part === 'info') {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } else {
        window.scroll({
          top: this.offset(this.$el.querySelector('#' + to.query.part)).top - 40,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  },
  props: ['content']
}
</script>

<style scoped lang="scss">

</style>
