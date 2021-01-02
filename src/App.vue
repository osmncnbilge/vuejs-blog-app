<template>
  <div id="app">
    <Navbar/>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar";
export default {
  components : {
    Navbar
  },
  created() {
    // Sayfa yüklendiğinde API'daki postları state ve local stroge ekleme
    this.$store.dispatch("initApp");
  }
}
</script>

<style lang="scss" scoped>

</style>
