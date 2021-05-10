<template>
    <div>
         <q-list bordered separator>
             <q-item  clickable v-ripple @click="settings()">
                <q-item-section>Geri Dön</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="arrow_back" />
                </q-item-section>
                
            </q-item>
            <q-item  clickable v-ripple @click="change('name')">
                <q-item-section>İsminizi Düzenleyin</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="drive_file_rename_outline" />
                </q-item-section>
                
            </q-item>
            <q-item  clickable v-ripple @click="change('email')">
                <q-item-section>Email Adresinizi Düzenleyin</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="email" />
                </q-item-section>
                
            </q-item>
             <q-item  clickable v-ripple @click="change('password')">
                <q-item-section>Şifrenizi Düzenleyin</q-item-section>
                <q-item-section avatar >
                <q-icon color="dark" name="lock" />
                </q-item-section>
                
            </q-item>
            <q-item  clickable v-ripple   @click="openmodal()">
                <q-item-section class="text-red">Hesabınızı Silin</q-item-section>
                <q-item-section avatar >
                <q-icon class="text-red" color="dark" name="person_remove" />
                </q-item-section>
                
            </q-item>

        </q-list>
        <deleteaccount />
    </div>
</template>
<script>
import deleteaccount from './DeleteAccount.vue'
import {ref} from 'vue'
export default{
    components:{deleteaccount},
     data(){
        return{
            open:ref(false)
        }
    },
    methods:{
        change(e){
            this.emitter.emit("change_setting_tab",e)
        },
         settings(){
            this.emitter.emit("set_profile_settings",false)
        },
        openmodal(){
            this.emitter.emit('open_account_delete',true)
        }
    },

}
</script>