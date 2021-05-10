<template>
    <div>
        
        
        <q-list bordered separator>
            <q-item to="/admin" clickable v-ripple v-if="isAdmin == true">
                <q-item-section>Admin</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="admin_panel_settings" />
                </q-item-section>
                
            </q-item>
            <q-item  clickable v-ripple @click="settings()">
                <q-item-section>Ayarlar</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="manage_accounts" />
                </q-item-section>
                
            </q-item>

            <q-item v-if="loading == false" clickable v-ripple @click="logout()">
                <q-item-section>Çıkış Yap</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="logout" />
                </q-item-section>
                 
            </q-item>
            <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="red" />
      </q-inner-loading>
           
           
    
        </q-list>
    </div>
</template>
<script>
import auth from '../../../libs/auth'
export default {
    data(){
        return{
            
            loading:false,
            isAdmin:false
        }
    },
    methods:{
        logout(){
            this.loading = true
            auth.logout().then(res => {
                this.emitter.emit('logined',false)
                this.loading = false
                this.$q.notify({
                    type:'positive',
                    progress:true,
                    message:res.message
                })
            }).catch(err => {
                this.loading = false
                this.$q.notify({
                    type:'negative',
                    progress:true,
                    message:err.message
                })
            })
        },
        settings(){
            this.emitter.emit("set_profile_settings",true)
        }
    },
    created(){
        this.loading = true
         this.auth.getUserRole().then(res => {
             this.loading = false
            if(res == 'admin'){
                this.isAdmin = true
            }else{
                this.isAdmin = false
            }
         })
     
    }
}
</script>
<style scoped>
    .spin{
        display:flex;
        justify-content: center;
        
    }
</style>