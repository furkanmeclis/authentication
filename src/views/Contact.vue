<template>
  <div>
  <q-card style="margin-bottom:15px">
            <q-card-section class="bread">
                <q-breadcrumbs gutter="sm">
      <q-breadcrumbs-el icon="phone" label="İletişim" />
   
      
    </q-breadcrumbs> 
            </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'İletişim',
  created(){
     this.meta.init({title:'İletişim',
     link: {
    material: { rel: 'icon', href: '/img/favicons/contact.png' }
  },})
  },
}
</script>
