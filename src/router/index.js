import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Anasayfa',
    component: Home,
    meta:{
      title:"Anasayfa"
    },

  },
  {
    path:'/aboutus',
    name:"Hakkımızda",
 
    component:About,
    meta:{
      title:"Hakkımızda"
    }
  },
  {
    path:'/contact',
    name:"İletişim",
    component:Contact,
   

    meta:{
      title:"İletişim"
    }
  },
  {
    path:'/admin',
    name:'Admin',
    component:() => import('../views/admin/Home.vue'),
  },
  {
    path:'/admin/articles',
    name:'Yazılar',
    component:() => import('../views/admin/Articles.vue')
  },
  {
    path:'/admin/articles/add',
    name:'Yazı Ekle',
    component:() => import('../views/admin/AddArticle.vue')
  },
  {
    path:'/admin/articles/update/:id',
    name:'Yazı Güncelle',
    component:() => import('../views/admin/UpdateArticle.vue')
  },
  {
    path:'/admin/users',
    name:'Kullanıcılar',
    component:() => import('../views/admin/Users.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
