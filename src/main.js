import { createApp } from 'vue'
import firebase from 'firebase'
let firebaseConfig = {
    apiKey: "AIzaSyDFoE4fmsoi8RD2k97pgyWnk7a2XBChN18",
    authDomain: "vue-js-api-588ee.firebaseapp.com",
    databaseURL: "https://vue-js-api-588ee-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-js-api-588ee",
    storageBucket: "vue-js-api-588ee.appspot.com",
    messagingSenderId: "222637972414",
    appId: "1:222637972414:web:4dfb2873ed36f6023677ef",
    measurementId: "G-PSQ51VEPWH"
};
firebase.initializeApp(firebaseConfig);
import store from './store'
import App from './App.vue'
import './registerServiceWorker'
import mitt from 'mitt'
import router from './router'
import { Quasar} from 'quasar'
import quasarUserOptions from './quasar-user-options'
import auth from './libs/auth'
const emitter = mitt()
import adminstore from './store/admin'
import metadata from './libs/meta'
const app = createApp(App).use(store)
app.config.globalProperties.auth = auth
app.config.globalProperties.firebase = firebase
app.config.globalProperties.emitter = emitter
app.config.globalProperties.meta = metadata
app.config.globalProperties.admin = adminstore
app.config.globalProperties.db = firebase.firestore()
app.use(Quasar, quasarUserOptions).use(router).mount('#app')
