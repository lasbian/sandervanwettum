import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../assets/marginpaddinghelpers.css'

import '../assets/bulmaCustom/custom/custom.css'

import '../assets/fonts/okomito/stylesheet.css'

import '../assets/main.css'

import '../assets/font-awesome-4.7.0/css/font-awesome.min.css'

import '../assets/swiper.css'


let layouts = {

  "_default": () => import('../layouts/default.vue'  /* webpackChunkName: "layouts/default" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"Sander van Wettum","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Sander van Wettum"},{"name":"msapplication-TileColor","content":"#FFFFFF"},{"name":"msapplication-TileImage","content":"\u002Fmstile-144x144.png"},{"name":"msapplication-square70x70logo","content":"\u002Fmstile-70x70.png"},{"name":"msapplication-square150x150logo","content":"\u002F\"mstile-150x150.png"},{"name":"msapplicationn-wide310x150logo","content":"\u002Fmstile-310x150.png"},{"name":"msapplication-square310x310logo","content":"\u002Fmstile-310x310.png"}],"link":[{"rel":"apple-touch-icon-precomposed","sizes":"57x57","href":"\u002Fapple-touch-icon-57x57.png"},{"rel":"apple-touch-icon-precomposed","sizes":"114x114","href":"\u002Fapple-touch-icon-114x114.png"},{"rel":"apple-touch-icon-precomposed","sizes":"72x72","href":"\u002Fapple-touch-icon-72x72.png"},{"rel":"apple-touch-icon-precomposed","sizes":"144x144","href":"\u002Fapple-touch-icon-144x144.png"},{"rel":"apple-touch-icon-precomposed","sizes":"60x60","href":"\u002Fapple-touch-icon-60x60.png"},{"rel":"apple-touch-icon-precomposed","sizes":"120x120","href":"\u002Fapple-touch-icon-120x120.png"},{"rel":"apple-touch-icon-precomposed","sizes":"76x76","href":"\u002Fapple-touch-icon-76x76.png"},{"rel":"apple-touch-icon-precomposed","sizes":"152x152","href":"\u002Fapple-touch-icon-152x152.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"196x196","href":"\u002Ffavicon-196x196.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"96x96","href":"\u002Ffavicon-96x96.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Ffavicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Ffavicon-16x16.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"128x128","href":"\u002Ffavicon-128.png"}],"script":[{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery\u002F3.1.1\u002Fjquery.min.js"},{"src":"\u002Fjquery.fitvids.js"},{"src":"\u002Fpolyfill\u002Fpolyfill.min.js"}],"style":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}

