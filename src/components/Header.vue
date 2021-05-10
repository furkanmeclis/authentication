<template>
    <div>
    <q-header reveal elevated class="bg-primary">
        <q-toolbar>
             <q-btn flat round dense icon="menu" @click="emitter.emit('leftdrawer',true)" class="q-mr-sm" />
                <q-toolbar-title style="text-align:center">{{$route.name}}</q-toolbar-title>
            <q-btn flat round dense @click="emitter.emit('rightdrawer',true)" icon="account_circle" />
        </q-toolbar>
      </q-header> 
    </div>
</template>
