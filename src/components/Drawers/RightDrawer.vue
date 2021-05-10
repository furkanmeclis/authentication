<template>
    <div class="rightdrawer">
         <q-drawer
        v-model="drawerright"
        side="right"
        :width="320"
        :breakpoint="700"
        elevated
        content-class="bg-primary text-white"
      >
        <q-scroll-area class="fit">
           <q-btn class="buton" icon="arrow_back" @click="drawerright = !drawerright" flat /> 
          <Login v-if="login == false"/>
          <Profile v-else />
        </q-scroll-area>
        
      </q-drawer>
    </div>
</template>
<script>
import Login from './Login.vue'
import Profile from './Profile.vue'

export default {
    components:{
        Login,
        Profile
    },
    data(){
        return{
            drawerright:false,
            login:false
        }
    },
    created(){
        this.login = this.auth.isAuthanticated()
        
        this.emitter.on('rightdrawer',() => {
            this.drawerright = !this.drawerright
        })
        this.emitter.on('logined',(e) => this.login = e)
    }
}
</script>
<style>
    .rightdrawer{
        margin:18px
    }
    
</style>