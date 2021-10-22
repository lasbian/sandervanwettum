<template>
<div>
  {{content.tables}}
  <p class="pb-20" v-html="content.title">
  </p>
  <div class="pb-20">

    <div v-for="tableitem in content.table">
      <p class="flexwrapper">
        <span class="min-width-60 pr-20" v-html="tableitem.year"></span>
        <span v-html="tableitem.description"></span>
      </p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['content']
}
</script>
<style scoped lang="scss">
.min-width-60{
  // display: inline-block;
  min-width: 60px
}
.flexwrapper{
  display: flex;
}
</style>
