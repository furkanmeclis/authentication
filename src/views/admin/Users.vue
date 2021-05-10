<template>
    <div>
           <q-card style="margin-bottom:15px">
               <q-card-section><q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el icon="admin_panel_settings" to="/admin" label="Admin" />
     
      <q-breadcrumbs-el :label="$route.name" icon="manage_accounts" />
      
    </q-breadcrumbs> </q-card-section>
           </q-card>
          <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">#ID</th>
          <th class="text-center">Kullanıcı Adı</th>
          <th class="text-center">Rolü</th>
        
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d,index) in data" :key="index">
          <td class="text-left">{{d.id}}</td>
          <td class="text-center">{{d.name}} </td>
          <td class="text-center"> 
              <div class="cursor-pointer">
      {{ d.role }}
      <q-popup-edit title="Rolü Güncelle" v-model="d.role" auto-save  >
          <template v-slot="scope">
         <q-select style="margin-bottom:6px" v-model="d.role" @change="setRole()" :options="options" >
            <template v-slot:after>
              <q-btn
                flat dense color="negative" icon="cancel"
                @click.stop="scope.cancel"
              />

              <q-btn
                flat dense color="positive" icon="check_circle"
                @click.stop="scope.set"
                @click="setRole(d.role,index)"
              />
            </template>
          </q-select>
        </template>
       
       
           
           
      </q-popup-edit>
    </div></td>
          
        
        </tr>
        
      </tbody>
    </q-markup-table>
                



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
            data:[],
            options:['admin','user']
        }
    },
    created(){
        this.roleControl()
        this.meta.init({title:this.$route.name,
                link: {
                material: { rel: 'icon', href: '/img/favicons/users.png' }
            },})
        this.getUsers()
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
            getUsers(){
                let db = this.firebase.firestore().collection('users')
                db.get().then(res => {
                    
                    res.forEach(doc => {
                       if(doc.exists){
                            let data = doc.data()
                        data['id'] = doc.id
                        this.data.push(data)
                       }
                    });
                })
            },
            setRole(role , i){
               let data = this.data[i]
             
               let db = this.firebase.firestore().collection('users').doc(data.id)
               db.update({
                   role:role
               }).then(() => {
                   this.$q.notify({
                       type:'positive',
                       progress:true,
                       message:'Rol Güncellendi'
                   })
               }).catch(err => {
                   this.$q.notify({
                       type:'negative',
                       progress:true,
                       message:'Rol Güncellenemedi Hata Konsolda'
                   })
                   console.log(err)
               })
            }
        }
}
</script>