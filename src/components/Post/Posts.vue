<template>
  <div>
    <div class="container-fluid">
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <transition-group name="slide" appear>
            <router-link
                tag="div"
                class="card my-4 border-0 shadow-sm"
                v-for="post in posts" :key="post.id"
                :to="{ name : 'postsDetails', params : { id : post.id } }"
                style="cursor: pointer"
            >
              <div class="row no-gutters">
                <div class="col-md-8">
                  <div class="card-header border-0">
                    <img class="rounded-circle avatar-image" alt="40x40" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg">
                    <span class="font-weight-bold pl-2"> {{ post.userName }}</span>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title text-capitalize">{{ post.title }}</h5>
                    <p class="card-text">{{ post.body }}</p>
                    <small class="text-muted">{{ post.id }} numaralı post</small>
                  </div>
                </div>
                <div class="col-md-4">
                  <img :src="post.imgSrc" class="img-fluid rounded" alt="...">
                </div>
              </div>
            </router-link>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  name: "Posts",

  data(){
    return {
      posts : [],
      users : []
    }
  },
  created() {
    let posts = JSON.parse(localStorage.getItem("posts"));
    let users = JSON.parse(localStorage.getItem("users"));

    // Post içerisinde ki userID ile Users içerisindeki user id'si eşleşenleri userName olarak post'a atama
    posts.forEach(post => {
      users.forEach(user => {
        if(post.userId === user.id){
          post.userName = user.name;
        }
      })
    })
    this.posts = posts;
  }
}
</script>

<style lang="scss" scoped>

</style>