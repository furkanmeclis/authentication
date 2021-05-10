
import 'quasar/dist/quasar.css'
import lang from 'quasar/lang/tr.js'
import '@quasar/extras/material-icons/material-icons.css'
import {Meta,Notify,LoadingBar,Dialog} from 'quasar'
// To be used on app.use(Quasar, { ... })
export default {
  config: {
    
  },
  plugins: {
    Meta,Notify,LoadingBar,Dialog
  },
  lang: lang
}