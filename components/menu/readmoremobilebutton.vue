<template>
  <div class="is-hidden-desktop readmoremobilebutton mb-40 mt-40 ml-40" :class="scrsize">
    <headercomp :class="nighttime ? 'is-white-text':''" :mobilereadmore="'true'" ></headercomp>
  </div>

</template>

<script>
import {
  mapGetters
} from 'vuex'

import headercomp from '~/components/header/headercomp.vue'



export default {

  computed: {
    ...mapGetters({
      nighttime: 'nighttime',
    }),
  },

  components: {
    headercomp,
  },

}


</script>



<style scoped lang="scss">
.readmoremobilebutton{
  position: absolute;
  bottom:0px;
  left: 0px;
}
</style>
