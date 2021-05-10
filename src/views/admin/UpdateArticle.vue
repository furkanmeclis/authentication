<template>
    <div>
      
      <q-card style="margin-bottom:15px">
            <q-card-section >
                <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el label="Admin" icon="admin_panel_settings" to="/admin" />
       <q-breadcrumbs-el label="Yazılar" icon="article" to="/admin/articles" />
      <q-breadcrumbs-el :label="$route.name" icon="update" />
      
    </q-breadcrumbs> 
               
            </q-card-section>
        </q-card>
        <div>
            <q-card>
                <q-card-section>
                    <q-input label="Başlık" v-model="article.title" icon="title" clearable :rules="[val => !!val || 'Bu Alanı Lütfen Doldurun']" >
                        <template v-slot:prepend>
                            <q-icon name="title" />
                        </template>
                    </q-input>
                    <q-input style="margin-bottom:7px" label="Url" v-model="article.url" icon="link" clearable :rules="[val => !!val || 'Bu Alanı Lütfen Doldurun']" >
                        <template v-slot:prepend>
                            <q-icon name="link" />
                        </template>
                    </q-input>
                   
                <q-editor  lang="tr" v-model="article.description" min-height="5rem" placeholder="Açıklama"/>
              

                </q-card-section>
                  <q-separator />
                  <q-card-section >
                      <q-btn :loading="loading" :disable="loading" label="Yazıyı Güncelle" @click.prevent="updateArticle()" icon="update" color="green"  />
                     
                  </q-card-section>
            </q-card>
        </div>
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
            article:{
                title:'',
                url:'',
                description:'',
            }
        }
    },
    created(){
        this.roleControl()
        this.getData()
         this.meta.init({title:this.$route.name,
                link: {
                material: { rel: 'icon', href: '/img/favicons/edit_article.png' }
            },})
    },
    methods:{
            roleControl(){
                this.auth.getUserRole().then(res => {
            if(res == 'admin'){
              
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
            getData(){
                this.loading = true
                let id = this.$route.params.id
                let db = this.firebase.firestore().collection('articles')
                db.doc(id).get().then(data => {

                    if(data.exists){
                        let d = data.data()
                        this.meta.init({title:this.$route.name+" - "+d.title})
                        this.loading = false
                        this.article.title = d.title
                        this.article.description = d.description
                        this.article.url = d.url
                    }
                })
            },
            updateArticle(){
                if(this.article.url == '' || this.article.description == '' || this.article.title == ''){
                    this.$q.notify({
                        type:'negative',
                        progress:true,
                        message:'Lütfen Gerekli Alanları Doldurun'
                    })
                }else{
                    this.loading = true
                  let id = this.$route.params.id
                let db = this.firebase.firestore().collection('articles')
                db.doc(id).update(this.article).then(data => {
                        this.loading = false
                        this.$q.notify({
                            type:'positive',
                            progress:true,
                            message:'Yazı Başarıyla Güncellendi'
                        })
                        this.$router.push('/admin/articles')
                }).catch(err => {
                        this.loading = false
                        this.$q.notify({
                            type:'negative',
                            progress:true,
                            message:'Yazı Eklenemedi Hata Konsolda'
                        })
                        console.error(err)
                })
                }
            }
        }
}
</script>