<template>
    <div>
            <q-list bordered separator>
              <q-item  clickable v-ripple @click="change('default')">
                <q-item-section>Geri Dön</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="arrow_back" />
                </q-item-section>
                
            </q-item>
            <q-item v-if="verified == false" clickable v-ripple @click="verify()">
                <q-item-section  style="color:red">Email Adresinizi Doğrulayın</q-item-section>
                <q-item-section avatar >
                <q-icon class="text-red" color="dark" name="verified_user" />
                </q-item-section>
                
            </q-item>
          </q-list>
           <div class="settings">
            <q-input color="deep-orange-6" v-model="email" @keyup="controle()" clearable type="email"  label="Email Adresiniz" :rules="[ val => !!val || 'Lütfen Bu Alanı Doldurun']">
            <template v-slot:prepend>
            <q-icon name="alternate_email" />
            </template>
            </q-input>
            
            <q-btn :loading="loading" :disable="loading || control" @click="resetemail()" icon="update" type="submit" color="green" label="Güncelle" />
            
    </div></div>
</template>
<script>
export default {
    data(){
        return{
        
            loading:false,
            verified:null,
            control:false,
                hamemail:null,
                email:null,
                
                
            
        }
    },
    created(){
        
        this.init()
        this.emitter.on('change_setting_tab',(e) => {
                 this.init()
        })
    },
    methods:{
        init(){
        let data = this.auth.getUserInfo()
        this.email = data.email
         this.hamemail = data.email
        this.verified = data.emailVerified
        this.controle()
        },
        change(e){
            this.emitter.emit("change_setting_tab",e)
            this.control = false
            this.loading = false
            this.email = false
            this.hamemail = false
        },
        verify(){
            let user = this.firebase.auth().currentUser
            user.sendEmailVerification().then(() => {
                this.$q.notify({
                    type:'positive',
                    progress:true,
                    message:'Doğrulama Linki Mail Adresinize Gönderildi'
                })
            }).catch((err) => {
                this.$q.notify({
                    type:'negative',
                    progress:true,
                    message:err.message
                })
            })

        },
        controle(){
            if(this.hamemail == this.email || this.email == ''){
                this.control = true
            }else{
                this.control = false
            }
        },
        resetemail(){
            if(this.email == ''){
                this.$q.notify({
                    type:'negative',
                    progress:true,
                    message:"Lütfen Gerekli Alanları Doldurun"
                })
            }else{
                this.loading = true
                let user = this.firebase.auth().currentUser
                user.updateEmail(this.email).then(() => {
                    this.loading = false
                    this.$q.notify({
                        type:"positive",
                        progress:true,
                        message:'Güncelleme İşlemi Başarılı'
                    })
                    let newuser = this.firebase.auth().currentUser
                    this.$store.commit('SET_USER',newuser)
                    this.emitter.emit("userdata",{
                        photoURL:newuser.photoURL,
                        email:newuser.email,
                        displayName:newuser.displayName,
                        emailVerified:newuser.emailVerified
                    })
                    this.verified = false
                    this.hamemail = this.email
                    this.controle()
                }).catch(err => {
                    this.loading = false
                this.$q.notify({
                    type:'negative',
                    progress:true,
                    message:err.message
                })
                })

            }
        }
    },
}
</script>
<style scoped>
.settings{
    margin:19px
}
</style>