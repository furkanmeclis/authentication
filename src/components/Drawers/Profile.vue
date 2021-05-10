<template>
    <div>
        <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="veri.photoURL">
            </q-avatar>
            <div class="text-weight-bold">{{veri.displayName}}</div>
            <div> {{veri.email}} </div>
          </div>
        </q-img>
      <Profile v-if="settings == false" />
      <Settings v-if="settings == true" />
    </div>
</template>
<script>
import Profile from './ProfileElements/ProfileInfo.vue'
import Settings from './ProfileElements/ProfileSettings.vue'
export default {
    components:{
    Profile,Settings
    },
    data(){
        return{
            veri:{
                email:null,
                displayName:null,
                photoURL:null
            },
            settings:false
        }
    },
    created(){
        let data = this.auth.getUserInfo()
        this.veri.photoURL = data.photoURL
        this.veri.email = data.email
        this.veri.displayName = data.displayName
        this.emitter.on("userdata",(data) => {
            this.veri.photoURL = data.photoURL
        this.veri.email = data.email
        this.veri.displayName = data.displayName
        })
        this.emitter.on("set_profile_settings",(data) => this.settings = data)
    }
}
</script>