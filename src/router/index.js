import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PostStart from "@/components/Post/PostStart";
import Posts from "@/components/Post/Posts";
import PostDetails from "@/components/Post/PostDetails";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts',
    component: PostStart,
    children : [
      { path : '', component : Posts, name: 'posts' },
      { path: ':id', component: PostDetails, name : 'postsDetails' }
    ]
  },
    // tanımlı olmayan bir URL girildiğinde home componentine yönlendirme
  { path: "*", redirect : "/"}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
