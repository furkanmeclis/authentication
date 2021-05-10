<template>
    <div>
            <q-dialog v-model="open" persistent>
                <q-card style="min-width: 350px">
                    <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Hesabı Silmek İstediğinize Eminmisiniz ? </div>
        
        </q-card-section>
                   

                    <q-card-section class="q-pt-none">
                    Bu İşlemin Geri Dönüşü Olmayacaktır 
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                    <q-btn  label="Vazgeç" icon="cancel" color="grey" v-close-popup />
                    <q-btn :loading="loading" :disable="loading" label="Hesabı Sil" icon="delete" color="red" @click="deleteaccount()" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
    </div>
</template>
<script>
import {ref} from 'vue'
export default {
    data(){
        return{
            open:ref(false),
            loading:false
        }
    },
    created(){
        this.emitter.on('open_account_delete',(e) => {
            this.open = e
        })
    },
    methods:{
        change(e){
            this.emitter.emit("change_setting_tab",e)
            this.loading = false
        },
        deleteaccount(){
            let user = this.firebase.auth().currentUser
            this.loading = true
            user.delete().then(() => {
                this.$store.commit('SET_LOGGED_IN',false)
                this.$store.commit('SET_USER',{})
                this.open = false
                this.loading = false
                this.$q.notify({type:'warning',progress:true,message:'Hesabınız Silindi :('})
                this.emitter.emit('logined',false)
                this.emitter.emit('userdata',{})
            }).catch((err) => {this.loading = false 
            this.$q.notify({type:'negative',progress:true,message:err.message})})
        }
    }
}
</script>