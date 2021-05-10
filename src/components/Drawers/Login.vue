<template>
    <div class="loginform">
       <div v-if="reset == false">
            <p style="font-size:25px">{{(isUser == true) ? 'Giriş Yap' : 'Kayıt Ol'}}</p>
            <a class="change" @click.prevent="isUser = !isUser">{{(isUser == true) ? 'Üye Değilmisiniz ? Üye Olun' : 'Zaten Üyemisiniz ? Hemen Giriş Yapın'}}</a>
            <q-input v-if="isUser == false" color="deep-orange-6" clearable v-model="name" label="Adınız Soyadınız" :rules="[ val => !!val || 'Lütfen Bu Alanı Doldurun']">
            <template v-slot:prepend>
            <q-icon name="person" />
            </template>
            </q-input>
            <q-input color="deep-orange-6" clearable type="email" v-model="email" label="Email Adresiniz" :rules="[ val => !!val || 'Lütfen Bu Alanı Doldurun']">
            <template v-slot:prepend>
            <q-icon name="alternate_email" />
            </template>
            </q-input>
            <q-input color="deep-orange-6" clearable v-model="password" @keypress.enter="control()" :type="isPwd ? 'password' : 'text'" label="Şifreniz" :rules="[ val => !!val || 'Lütfen Bu Alanı Doldurun',val => val.length > 5 || 'En Az 6 Karakter']">
            <template v-slot:prepend>
            <q-icon name="lock" />
            </template>
            <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
            </q-input>
            <a class="change" @click="change(true)">Şifrenizimi Unuttunuz ? </a>
            <div class="q-pa-md q-gutter-sm">
            <q-btn :loading="loading" :disable="loading" @click="login()" v-if="isUser == true" icon="login" type="submit" color="deep-orange" label="Giriş Yap" />
            <q-btn :loading="loading" :disable="loading" @click="signup()" v-if="isUser == false" icon="group_add" type="submit" color="green" label="Kayıt Ol" />
            <q-btn :loading="loading" :disable="loading" @click.prevent="googlelogin()"><q-img class="google" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png" round /></q-btn>
            </div>
       </div>
       <div v-if="reset == true">
            <p style="font-size:25px">Şifrenizi Sıfırlayın</p>
            <q-input color="deep-orange-6" clearable type="email" @keypress.enter="resetp()" v-model="email" label="Email Adresiniz" :rules="[ val => !!val || 'Lütfen Bu Alanı Doldurun']">
            <template v-slot:prepend>
            <q-icon name="alternate_email" />
            </template>
            </q-input>
            <a class="change" @click="change(false)">Şifrenizimi Hatırlıyormusunuz ? Giriş Yapın </a>
            <div class="q-pa-md q-gutter-sm">
            <q-btn :loading="loading" :disable="loading" @click="resetp()" v-if="isUser == true" icon="login" type="submit" color="orange" label="Şifremi Sıfırla" />
            </div>
       </div>
    </div>
</template>
<script>
import auth from '../../libs/auth'
export default {
    data(){
        return{
            password: '',
            isPwd: true,
            email:'',
            name: '',
            isUser:true,
            loading:false,
            reset:false
        }
    },
    methods:{
        control(){
            if(this.isUser == true){
                this.login()
            }else{
                this.signup()
            }
        },
        change(e){
            this.clear()
            this.reset = e
        },
        googlelogin(){
            this.loading = true
            auth.loginWithGoogle().then(res => {

                this.$q.notify({
                    type: 'positive',
                    progress: true,
                    message: res.message
                })
                this.emitter.emit('logined',true)
                this.emitter.emit('userdata',res.data)
                
                this.clear()
                 this.loading = false
            }).catch(err => {
                this.emitter.emit('logined',false)
                 this.loading = false
                this.$q.notify({
                    type: 'negative',
                    progress: true,
                    message: err.message
                })
            })
        },
        login(){
            if(this.email == '' || this.password == ''){
                this.$q.notify({
                    type: 'negative',
                    progress: true,
                    message: "Lütfen Gerekli Alanları Doldurun"
                })
            }else{

            
                this.loading = true
                auth.loginWithEmail(this.email,this.password).then(res => {

                    this.$q.notify({
                        type: 'positive',
                        progress: true,
                        message: res.message
                    })
                    this.emitter.emit('logined',true)
                    this.emitter.emit('userdata',res.data)
                    this.clear()
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.emitter.emit('logined',false)
                    this.$q.notify({
                        type: 'negative',
                        progress: true,
                        message: err.message
                    })
                })
            }
        },
        clear(){
            this.password=''
            this.isPwd= true
            this.email=''
            this.name=''
            this.isUser=true
            this.loading=false
            this.reset=false
        },
        signin(){
           

            
                auth.loginWithEmail(this.email,this.password).then(res => {
                    this.emitter.emit('logined',true)
                    this.emitter.emit('userdata',res.data)
                   
                    this.clear()
                })
            
        },
        signup(){
            if(this.email == '' || this.password == '' || this.name == ''){
                this.$q.notify({
                    type: 'negative',
                    progress: true,
                    message: "Lütfen Gerekli Alanları Doldurun"
                })
            }else{
            this.loading = true
            auth.signUpWithEmail(this.email,this.password,this.name).then(res => {

                this.$q.notify({
                    type: 'positive',
                    progress: true,
                    message: res.message
                })
               this.loading = false
               this.signin()
            }).catch(err => {
                this.emitter.emit('logined',false)
                 this.loading = false
                this.$q.notify({
                    type: 'negative',
                    progress: true,
                    message: err.message
                })
            })
            }
        },
        resetp(){
            if(this.email == ''){
                this.$q.notify({
                    type:'negative',
                    progress:true,
                    message:"Lütfen Gerekli Alanları Doldurun"
                })
            }else{
                this.loading = true
                auth.resetPassword(this.email).then(res => {
                    this.$q.notify({
                        type:'positive',
                        progress:true,
                        message:res.message
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
            }
        }

    }
}
</script>
<style scoped>
    .loginform{
        margin:19px
    }
    .change{
        cursor:pointer;
        color:blue;
        user-select: none;
    }
    .change:hover{
        text-decoration: underline;
    }
    .google{
        width:24px
    }
</style>