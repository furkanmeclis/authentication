<template>
  <div>
  <q-card style="margin-bottom:15px">
            <q-card-section class="bread">
                <q-breadcrumbs gutter="sm">
      <q-breadcrumbs-el icon="group_working" label="Hakkımızda" />
   
      
    </q-breadcrumbs> 
            </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'Hakkımızda',
  created(){
     this.meta.init({title:'Hakkımızda',
     link: {
    material: { rel: 'icon', href: '/img/favicons/aboutus.png' }
  },})
  },
}
</script>
