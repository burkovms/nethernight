<template>
  <div class="app" data-app>
    <v-app>
      <PageHeader />
      <main
        class="main"
        :style="{
          backgroundImage: `url(${require('@/assets/img/main-bg-gradient.png')})`,
        }"
      >
        <Nuxt />
      </main>
      <PageFooter />
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  min-height: 100vh;
}

.main {
  flex-grow: 1;
  padding-block: 40px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
