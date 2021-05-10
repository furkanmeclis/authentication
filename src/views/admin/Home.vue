<template>
    <div>
           <q-card style="margin-bottom:15px">
               <q-card-section><q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/" />
     
      <q-breadcrumbs-el :label="$route.name" icon="admin_panel_settings" />
      
    </q-breadcrumbs> </q-card-section>
           </q-card>
     
        <q-btn label="Yazılar" icon="article" to="/admin/articles" />
      
       <q-btn label="Kullanıcılar" icon="manage_accounts" to="/admin/users" />
     
         <q-inner-loading :showing="loading">
            <q-spinner-gears size="75px" color="primary" />
        </q-inner-loading>
       
    </div>
</template>
<script>

export default {
    
    data(){
        return{
            loading:true,
           
        }
    },
    created(){
        this.roleControl()
        this.meta.init({title:this.$route.name,
                link: {
                material: { rel: 'icon', href: '/img/favicons/admin_home.png' }
            },})
    },
    methods:{
            roleControl(){
                this.auth.getUserRole().then(res => {
            if(res == 'admin'){
                this.loading = false
            }else{
                this.$q.notify({
                    type:'negative',
                    progress:true,
                    message:'Bu Alanı Görüntüleme Yetkiniz Yok'
                })
                this.$router.push('/')
            }
            })
            },

        }
}
</script>
<style scoped>
    .my-card{
  width: 100%;
  max-width: 250px}
</style>