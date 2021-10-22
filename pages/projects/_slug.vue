<template>
<div class="">
  <!-- <textcolumn :content="content"></textcolumn> -->
  <readmorecomp :description="description"></readmorecomp>
  <!-- {{srcsize}} -->

  <readmoremobilebutton></readmoremobilebutton>
  <slideshow :slides="slides"></slideshow>
</div>
</template>

<script>
import textcolumn from '~/components/text/textcolumn.vue'
import readmorecomp from '~/components/menu/readmorecomp.vue'
import readmoremobilebutton from '~/components/menu/readmoremobilebutton.vue'
import slideshow from '~/components/project/slideshow.vue'
import axios from 'axios'
export default {
  components: {
    textcolumn,
    readmorecomp,
    readmoremobilebutton,
    slideshow
  },

    async asyncData({
        params,
        query,
        error,
        store,
        route,
        redirect
    }) {


      //hide menu
      store.commit('SET_MENU', false)
      if(query.read ==="true"){
        store.commit('SET_READMORE', true)
      }

      //hide about
      store.commit('SET_ABOUT', false);

      const contentLangRes = await axios.get(store.state.apiRoot+'wp/v2/projects&slug='+params.slug)
      if(contentLangRes.data.length>0){

        store.commit('SET_VIEWING', '' + contentLangRes.data[0].title.rendered)
        store.commit('SET_VIEWING_PROJECT', '' + contentLangRes.data[0].title.rendered)
        // store.commit('SET_VIEWING', 'Project: ' + contentLangRes.data[0].title.rendered)

        return {
          content: contentLangRes.data[0],
          description: contentLangRes.data[0].acf.project_description,
          slides: contentLangRes.data[0].acf.project_slideshow,
        }
      }else{
        redirect('/')
      }
    },


}
</script>

<style>

</style>
