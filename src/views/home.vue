<template>
  <div>
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import tabBar from "../components/tabBar.vue"
export default {
    components: {
        tabBar,
    }
}
</script>

<style>

</style>