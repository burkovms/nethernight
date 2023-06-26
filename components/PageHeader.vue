<template>
  <header>
    <div class="container-fluid">
      <search></search>
    </div>
  </header>
</template>

<script>
import Search from '@/components/common/Search'

export default {
  components: {
    Search,
  },
}
</script>

<style lang="scss">
header {
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: $dark;
  font-size: $font-size-root;
  color: $white;
  border-bottom: 1px solid $dark;
}
</style>
