<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <i class="fas fa-arrow-left mt-4" @click="$router.back()"></i>
      </div>
    </div>
    <hr>
    <div class="row">
<!--      Post Detayları -->
      <div class="col-12 text-center">
        <img :src="post.imgSrc" class="img-fluid rounded" alt="...">
      </div>
      <div class="col-12 mt-3">
        <div class="card border-0 bg-transparent">
          <div class="card-header bg-transparent">
            <img class="rounded-circle avatar-image" alt="40x40" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg">
            <span class="font-weight-bold pl-2">{{ user.name}}</span>
          </div>
          <div class="card-body">
            <div class="card-title text-capitalize my-4">
              <h2> {{ post.title }} </h2>
            </div>
            <h4 class="card-subtitle mb-4 text-muted">Post ID : {{ post.id }}</h4>
            <div class="card-text my-4">
              <p>
                {{ post.body }}
              </p>
            </div>
          </div>

<!--          Post İşlemleri-->
          <div class="card-footer bg-transparent border-0">
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-primary mr-2" data-toggle="modal" data-target="#updateModal">
                Düzenle
              </button>
              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal">
                Sil
              </button>
            </div>
          </div>
        </div>
        <hr>
      </div>

<!--      Yorumları Gösterme İşlemi-->
      <div class="container mb-4" v-if="comments.length <= 0">
        <div class="row">
          <div class="col-12">
            <a style="cursor:pointer;" class="text-decoration-none text-info" @click="getComments()">Yorumları Göster</a>
          </div>
        </div>
      </div>
      <div class="container"  v-if="comments.length > 0">
        <div class="row">
          <div class="col-12">
            <h3 class="my-4">Yorumlar ({{ comments.length }})</h3>
          </div>
          <div class="col-12">
            <transition-group name="slide" appear>
              <div class="media my-4" v-for="comment in comments" :key="comment.id">
                <img class="mr-3" style="width: 70px; height: 70px;" src="https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png" alt="Generic placeholder image">
                <div class="media-body">
                  <h5 class="mt-0">{{ comment.name }}</h5>
                  {{ comment.body }}
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>

    <div style="height: 100px;"></div>

    <!-- Update Modal -->
    <div class="modal" id="updateModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Post Düzenleme</h3>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="postTitle" class="form-label">Post Title</label>
                <input v-model="updateToPost.title" type="text" class="form-control" id="postTitle">
              </div>
              <div class="form-group">
                <label for="postBody" class="form-label">Post Body</label>
                <input v-model="updateToPost.body" type="text" class="form-control" id="postBody">
              </div>
            </form>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updatePost()">Güncelle</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
          </div>
        </div>
      </div>
    </div>

<!--    Delete Modal-->

    <div class="modal" id="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Post Silme</h3>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            Gönderiyi silmek istediğinize emin misiniz?
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletePost()">Sil</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
name: "PostDetails",
  data(){
    return {
      comments : [],
      post : {},
      user : {},
      updateToPost : {
        id : null,
        userId : null,
        title : null,
        body : null,
        imgSrc : null,
      }
    }
  },
  methods : {
     updatePost(){
      let toUpdatePost = {
        id : this.post.id,
        userId : this.post.userId,
        title : this.updateToPost.title,
        body : this.updateToPost.body,
        imgSrc: this.post.imgSrc
      }
      this.$store.commit("updatePost",toUpdatePost);
      this.$router.push('/posts');

      this.$toast.success("Post güncelleme işlemi başarılı.")

    },
    deletePost(){
      this.$store.commit("deletePost",this.post);
      this.$router.push('/posts');

      this.$toast.success("Post silme işlemi başarılı.")
    },
    getComments(){
      // Post'a ait yorumları getirme
      axios.get("http://jsonplaceholder.typicode.com/posts/" + this.$route.params.id + "/comments")
          .then(res => {
            this.comments = res.data;
          })
    },
    getPostById(){
      let posts = JSON.parse(localStorage.getItem("posts"));
      // Route parametresi olarak gelen post'u localStorage'daki postlar içierisinde arama

      posts.forEach(item => {
        if(item.id == this.$route.params.id){
          this.post = item;
        }
      })
    },
    getUserByPostUserId(){
      // Post userId'si eşlesn user'i localStorage'dan getirme
      let users = JSON.parse(localStorage.getItem("users"));
      users.forEach(item => {
        if(item.id === this.post.userId){
          this.user = item;
        }
      })
    }
  },
  created() {
    this.getPostById();
    this.getUserByPostUserId();
  }
}
</script>

<style lang="scss" scoped>

</style>