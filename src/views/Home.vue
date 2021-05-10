<template>
 <div>
    <q-card style="margin-bottom:15px">
            <q-card-section class="bread">
                <q-breadcrumbs gutter="sm">
      <q-breadcrumbs-el icon="home" label="Anasayfa" />
   
      
    </q-breadcrumbs> 
            </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'Anasayfa',
  data(){
    return{
      articles:[]
    }
  },
  created(){
     this.meta.init({
        title:'Anasayfa',
        link: {
            material: { rel: 'icon', href: '/img/favicons/home.png' }
        }
      })
    }

}
</script>
