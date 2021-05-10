<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
    
      <Header />
       
      <left-drawer />
     <right-drawer />
     <div class="container"><router-view /></div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar,useMeta } from 'quasar'
import Header from './components/Header.vue'
import LeftDrawer from './components/Drawers/LeftDrawer.vue'
import RightDrawer from './components/Drawers/RightDrawer.vue'
export default {
  name: 'LayoutDefault',
  components:{
    Header,
    LeftDrawer,
    RightDrawer
  },
  
  setup () {
  const $q = useQuasar()
 
  $q.loadingBar.setDefaults({
    color: 'amber',
    size: '5px',
    position: 'top'
  })
}
}
</script>
<style>
  .container{
    padding-right: 20px;
    padding-left: 20px
  }
</style>