<template>
  <nav class="navbar navbar-expand-lg navbar-light ">
    <div class="container-fluid">
      <router-link
          tag="a"
          class="navbar-brand"
          to="/"
      >
        Blog Uygulaması
      </router-link>
      <ul class="navbar-nav mr-auto">
        <router-link
            tag="li"
            class="nav-item"
            to="/posts"
        >
          <a class="nav-link" aria-current="page">Posts</a>
        </router-link>
      </ul>
      </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>