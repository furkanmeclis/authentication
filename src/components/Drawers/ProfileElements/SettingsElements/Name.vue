<template>
    <div>
        <q-list bordered separator>
              <q-item  clickable v-ripple @click="change('default')">
                <q-item-section>Geri Dön</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="arrow_back" />
                </q-item-section>
                
            </q-item>
          </q-list>
          <div class="settings">
            <q-input color="deep-orange-6" v-model="name" clearable @keyup.enter="submit()" @keyup="controle()" label="Adınız Soyadınız" :rules="[ val => !!val || 'Lütfen Bu Alanı Doldurun']">
            <template v-slot:prepend>
            <q-icon name="person" />
            </template>
            </q-input>
            <q-btn :loading="loading" :disable="loading || control" @click="submit()" icon="update" type="submit" color="green" label="Güncelle" />
          
            
    </div>       
    </div>
</template>
<script>
export default {
    data(){
        return{
            control:false,
          loading:false,
            uid:'',
                name:null,
              hamname:null
                
            
        }
    },
    methods:{
        change(e){
            this.emitter.emit("change_setting_tab",e)
            this.control = false
            this.loading = false
            this.name = false
            this.hamname = false
        },
        controle(){
            if(this.hamname == this.name || this.name == ''){
                this.control = true
            }else{
                this.control = false
            }
        },
        submit(){
            if(this.name == '' || this.name == null){
                this.$q.notify({
                    type:'negative',
                    message:'Lütfen Gerekli Alanları Doldurun',
                    progress:true
                })
            }else{
                this.loading = true
                let user = this.firebase.auth().currentUser
                user.updateProfile({
                    displayName:this.name,
                }).then(data => {
                    this.loading = false
                    this.changeName(this.name)
                    this.$q.notify({
                        type:"positive",
                        progress:true,
                        message:'Güncelleme İşlemi Başarılı'
                    })
                    
                    let newuser = this.firebase.auth().currentUser
                    this.hamname = this.name
                    this.$store.commit('SET_USER',newuser)
                    this.emitter.emit("userdata",{
                        photoURL:newuser.photoURL,
                        email:newuser.email,
                        displayName:newuser.displayName
                    })
                    this.controle()
                }).catch(err => {
                    this.loading = false
                    this.$q.notify({
                        type:"negative",
                        progress:true,
                        message:'Güncelleme İşlemi Başarısız'
                    })
                })
            }
        },
        changeName(name){
            let db = this.firebase.firestore().collection('users')
            let uid = this.uid
            db.doc(uid).update({
                name:name
            })
        },
        init(){
        let data = this.auth.getUserInfo()
        this.hamname = data.displayName
        this.name = data.displayName
        this.uid = data.uid
        this.controle()
        }
    },
    created(){
        this.init()
        this.emitter.on('change_setting_tab',(e) => {
 this.init()
        })
    }
    
}
</script>
<style scoped>
.settings{
    margin:19px
}
</style>