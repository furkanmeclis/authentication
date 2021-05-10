<template>
    <div class="settings">
          
       <Default v-if="com == 'default'" />
       <NameEl v-if="com == 'name'" />
       <PasswordEl v-if="com == 'password'" />
       <EmailEl v-if="com == 'email'" />    
     
    </div>
</template>
<script>
import NameEl from './SettingsElements/Name'
import EmailEl from './SettingsElements/Email'
import PasswordEl from './SettingsElements/Password'
import Default from './SettingsElements/Default'

export default {
    components:{
NameEl,EmailEl,PasswordEl,Default
    },
    data(){
        return{
            com:'default'
        }
    },
    methods:{
        settings(){
            this.emitter.emit("set_profile_settings",false)
        }
    },
    created(){
        this.emitter.on('change_setting_tab',(e) => this.com = e)
    }
}
</script>
