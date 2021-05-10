<template>
    <div>
        <q-card style="margin-bottom:15px">
            <q-card-section class="bread">
                <q-breadcrumbs gutter="sm">
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el label="Admin" icon="admin_panel_settings" to="/admin" />
      <q-breadcrumbs-el :label="$route.name" icon="article" />
      
    </q-breadcrumbs> 
                
<q-btn class="add-btn" icon-right="add" to="/admin/articles/add" size="sm" label="Yazı Ekle" color="warning" text-color="black"/>
                
            </q-card-section>
        </q-card>
         <q-markup-table bordered separator="cell">
      <thead>
        <tr>
          <th class="text-center">Başlık</th>
          <th class="text-center">Açıklama</th>
          <th class="text-center">URL</th>
          <th class="text-center" >İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in data" :key="d.id">
          <td class="text-center">{{d.title.substr(0,10)}}</td>
          <td class="text-center">{{d.description.substr(0,10) }}</td>
          <td class="text-center">{{d.url.substr(0,10)}}</td>
          <td class="text-center" width="60" > <q-btn-group rounded> <q-btn :to="'/admin/articles/update/'+d.id" size="sm" color="green" icon="edit"  />
      <q-btn size="sm" color="red" icon="delete" @click="deleteArticle(d.id)" />
     
     
    </q-btn-group></td>
        </tr>
        <tr v-if="empty == true">
            <td colspan="4" class="bg-warning text-center"><q-icon name="warning" /> Veri Bulunamadı</td>
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
            empty:false
        }
    },
    created(){
        this.roleControl()
        this.getArticles()
        this.meta.init({title:this.$route.name,
                link: {
                material: { rel: 'icon', href: '/img/favicons/articles.png' }
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
            getArticles(){
                this.loading= true
                let db = this.firebase.firestore().collection('articles')
                db.get().then(docs => {
                    if(docs.docs.length != 0){
                        this.empty = false
                        docs.forEach(doc => {
                        
                        let data = doc.data()
                        data['id'] = doc.id
                        this.data.push(data)
                       
                    })
                    this.loading= false
                    }else{
                         this.loading= false
                        this.empty = true
                    }
                    
                })
            },
            deleteArticle(id){
                this.$q.dialog({
                    title: 'Eminmisiniz ?',
                    message: 'Bu İşlemi Geri Alamazsınız',
                    ok:{
                        
                        color:'negative',
                        label:'Sil'
                    },
                    cancel: {
                       
                        color: 'info'
                    },
                    persistent: true
                }).onOk(() => {
                    this.firebase.firestore().collection('articles').doc(id).delete().then(() => {
                        this.$q.notify({
                            type:'positive',
                            progress:true,
                            message:'Yazı Başarıyla Silindi'
                        })
                        this.data = []
                        this.getArticles()
                    }).catch(err => {
                        this.$q.notify({
                            type:'negative',
                            progress:true,
                            message:'Yazı Silinemedi Hata Konsolda'
                        })
                        console.log(err)
                    })
                })
            }
        }
}
</script>
<style scoped>
    .bread{
        display:flex;
        justify-content:space-between;

    }
    @media screen and (max-width: 420px) {
            .bread {
               display:block;
            }
            .bread .add-btn{
                margin-top:10px
            }
         }
</style>