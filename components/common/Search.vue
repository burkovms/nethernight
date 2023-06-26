<template>
  <div class="search">
    <v-text-field
      v-model="searchText"
      placeholder="Search..."
      outlined
      hide-details
      @input="searchPackage"
    ></v-text-field>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    ...mapActions(['fetchPackages']),
    ...mapMutations(['SET_QUERY']),
    searchPackage(query) {
      this.SET_QUERY(query)
      this.fetchPackages(1)
    },
  },
}
</script>
