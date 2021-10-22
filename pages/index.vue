<template>
<div class="">
  <!-- <aboutcomp></aboutcomp> -->
  <indeximages :content="indexImagesContent"></indeximages>
  <!-- {{content}} -->
</div>
</template>

<script>
import indeximages from '~/components/index/indeximages.vue'
// import aboutcomp from '~/components/menu/aboutcomp.vue'
import axios from 'axios'
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    indeximages,
    // aboutcomp,
  },
  computed: {
    ...mapGetters({
      getmenu: "getmenu",
      getabout: "getabout",
      scrsize: "scrsize",
    })
  },

  async asyncData({
    params,
    query,
    error,
    store,
    route,
    redirect
  }) {


    const indexImagesRes = await axios.get(store.state.apiRoot + 'wp/v2/pages&slug=index')
    return {
      // confetti : pop,
      indexImagesContent: indexImagesRes.data[0],
    }


  },


}
</script>

<style>

</style>
