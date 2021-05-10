<template>
    <div>
            <q-list bordered separator>
              <q-item  clickable v-ripple @click="change('default')">
                <q-item-section>Geri Dön</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="arrow_back" />
                </q-item-section>
                
            </q-item>
            <q-item  clickable v-ripple @click="link()">
                <q-item-section>Link İle Şifre Sıfırla</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="link" />
                </q-item-section>
                
            </q-item>
          </q-list>
          <div class="settings">
            <q-input color="deep-orange-6" v-model="password" clearable   @keyup="controle()" :type="isPwd ? 'password' : 'text'" label="Yeni Bir Şifre Oluşturun" :rules="[ val => !!val || 'Lütfen Bu Alanı Doldurun',val => val.length > 5 || 'En Az 6 Karakter']">
            <template v-slot:prepend>
            <q-icon name="password" />
            </template>
            <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
            </q-input>
            <q-input color="deep-orange-6" v-model="password2" clearable  @keyup="controle()" :type="isPwd2 ? 'password' : 'text'" label="Oluşturduğunuz Şifreyi Doğrulayın" :rules="[ val => !!val || 'Lütfen Bu Alanı Doldurun',val => val.length > 5 || 'En Az 6 Karakter',val => password == val || 'Şifreler Uyuşmuyor']">
            <template v-slot:prepend>
            <q-icon name="done_all" />
            </template>
            <template v-slot:append>
            <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd2 = !isPwd2" />
            </template>
            </q-input>
            <q-btn :loading="loading" :disable="loading || control" icon="update" @click="submit()" type="submit" color="green" label="Güncelle" />
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isPwd:true,
            isPwd2:true,
            loading:false,
            control:true,
            password:'',
            password2:''
        }
    },
     methods:{
        change(e){
            this.emitter.emit("change_setting_tab",e)
        },
        controle(){
            if(this.password != this.password2 || this.password == '' || this.password2 == ''){
                this.control = true
            }else{
                this.control = false
            }
        },
        link(){
            this.loading = true
             let user = this.auth.getUserInfo()
               this.firebase.auth().sendPasswordResetEmail(user.email).then(res => {
                    this.$q.notify({
                        type:'positive',
                        progress:true,
                        message:'Şifre Sıfırlama Linki Mail Adresinize İletildi'
                    })
                    this.loading = false
                }).catch(err => {
                     this.$q.notify({
                        type:'negative',
                        progress:true,
                        message:err.message
                    })
                    this.loading = false
                })
        },
        submit(){
            this.loading = true
            let user = this.firebase.auth().currentUser
            user.updatePassword(this.password).then(() => {
                this.loading = false
                this.$q.notify({
                        type:'positive',
                        progress:true,
                        message:'Şifreniz Sıfırlandı'
                    })
                    this.isPwd=true
                    this.isPwd2=true
                    this.loading=false
                    this.control=true
                    this.password=''
                    this.password2=''
            }).catch(err => {
                this.loading = false
                this.$q.notify({
                        type:'negative',
                        progress:true,
                        message:err.message
                    })
            })
        }
    },
}
</script>
<style scoped>
.settings{
    margin:19px
}
</style>