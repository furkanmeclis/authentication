<template>
    <div>
         <q-drawer
        v-model="drawerLeft"
        side="left"
        :width="320"
        :breakpoint="700"
        elevated
        content-class="bg-primary text-white"
      >
      
        <q-scroll-area class="fit" >

         <q-list bordered separator>
        
        <q-item clickable to="/" v-ripple>
            <q-item-section>Anasayfa</q-item-section>
            <q-item-section avatar>
          <q-icon color="dark" name="home" />
        </q-item-section>
        </q-item>

        <q-item clickable to="/aboutus"
        
          v-ripple>
            <q-item-section>Hakkımızda</q-item-section>
            <q-item-section avatar>
          <q-icon color="dark" name="group_work" />
        </q-item-section>
        </q-item>

        <q-item clickable to="/contact"
        
       
         v-ripple>
            <q-item-section>İletişim</q-item-section>
            <q-item-section avatar>
          <q-icon color="dark" name="phone" />
        </q-item-section>
        </q-item>
<q-item clickable to="/admin" v-if="admin == true" v-ripple>
            <q-item-section>Admin</q-item-section>
            <q-item-section avatar>
          <q-icon color="dark" name="admin_panel_settings" />
        </q-item-section>
        </q-item>

        <q-item clickable  v-ripple @click="drawerLeft = !drawerLeft">
            <q-item-section>Menüyü Kapat</q-item-section>
            <q-item-section avatar>
          <q-icon color="dark" name="clear" />
        </q-item-section>

        
        </q-item>
        
    </q-list>
        </q-scroll-area>
        
      </q-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            drawerLeft:false,
            admin:false,

        }
    },
    methods:{
        navigate(e){
            this.drawerLeft = !this.drawerLeft
            this.$router.push(e)
        },
        roleControl(){
         
            this.auth.getUserRole().then(res => {
             
            if(res == 'admin'){
                this.admin = true
            }else{
                this.admin = false
            }
            })
        }
    },
    created(){
        this.emitter.on('leftdrawer',() => {
            this.drawerLeft = !this.drawerLeft
            
        })
        this.emitter.on('userdata',() => {
          this.roleControl()
        })
        this.roleControl()
        
    }
}
</script>
<style scoped>
    .q-item.router-link-active{
        background-color:gray
    }
</style>