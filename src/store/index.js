import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts : [],
    users : []
  },
  getters : {
    getPosts(state){
      return state.posts;
    },
    getPost(state){
      return key => state.posts.filter(post => {
        return post.id === key;
      })
    },
    getUsers(state){
      return state.users;
    },
    getUser(state){
      return key => state.users.filter(user => {
        return user.id === key;
      })
    }
  },
  mutations: {
    addPosts(state, post){
      // State'deki posts liste verileri atarken sabit bir resim yüklüyorum tasarım için
      let updatedPost = {
        ...post,
        imgSrc : "https://miro.medium.com/max/1000/1*o2eID2zFRcsjMOHDogZ1Xw.jpeg"
      }
      state.posts.push(updatedPost);
    },
    updatePost(state,post){
      // State post listesini güncelleme
      state.posts.forEach((item,index) => {
        // Gönderilen post ile statedeki post id'ler karşılaştırılıyor eşit ise statedeki post silinip gönderilen poost listeye ekleniyor.
        if(item.id === post.id){
          state.posts.splice(index,1,post);
        }
      })
      // Local Stograge posts listesini güncelleme
      let postsLocalStroge = JSON.parse(localStorage.getItem("posts"));
      postsLocalStroge.forEach((item,index) => {
        if(item.id === post.id){
          postsLocalStroge.splice(index,1,post);
        }
      })
      localStorage.setItem("posts", JSON.stringify(postsLocalStroge));
    },
    deletePost(state,post){
      // State post listesini silme
      state.posts.forEach((item, index) => {
        // Gönderilen post ile statedeki post id'ler karşılaştırılıyor eşit ise statedeki post siliniyor.
        if(item.id === post.id){
          state.posts.splice(index,1);
        }
      })
      // Local Stroage posts listesini silme
      let postsLocalStroge = JSON.parse(localStorage.getItem("posts"));
      postsLocalStroge.forEach((item, index) => {
        if(item.id === post.id){
          postsLocalStroge.splice(index,1);
        }
      })
      localStorage.setItem("posts", JSON.stringify(postsLocalStroge));
    },
  },
  actions: {
    initApp({ state, commit }){
      // API'den Post'lar çekiliyor
      axios.get("https://jsonplaceholder.typicode.com/posts")
          .then(res => {
            const posts = res.data;
            posts.forEach(post => {
             commit("addPosts", post);
            })
            localStorage.setItem("posts", JSON.stringify(state.posts))
          })
      // API'den User'lar çekiliyor
      axios.get("https://jsonplaceholder.typicode.com/users")
          .then(res => {
            state.users = res.data;
            localStorage.setItem("users", JSON.stringify(state.users))
          })
    }
  },
  modules: {
  }
})
