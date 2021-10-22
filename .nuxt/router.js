import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _1d65c1d0 = () => import('../pages/projects/_slug.vue' /* webpackChunkName: "pages/projects/_slug" */).then(m => m.default || m)
const _5ffdcf07 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



const scrollBehavior = function(to, from, savedPosition) {
      if (to.name === 'projects-slug') {
        window.setTimeout(function() {
          window.scroll(0, 0)
        }, 400)
      }
      if (to.path === '/about' && from.path === '/about') {

      } else {

        if (savedPosition) {
          window.setTimeout(function() {
            window.scroll(0, savedPosition.y)
          }, 10)
          window.setTimeout(function() {
            window.scroll(0, savedPosition.y)
          }, 50)
          window.setTimeout(function() {
            window.scroll(0, savedPosition.y)
          }, 100)
          // return savedPosition
        } else {
          return {
            x: 0,
            y: 0
          }
        }
      }
    }


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/projects/:slug?",
			component: _1d65c1d0,
			name: "projects-slug"
		},
		{
			path: "/",
			component: _5ffdcf07,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
