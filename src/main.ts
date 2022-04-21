import { createApp } from 'vue'
import App from './App.vue'

//Official global store for VueJs:
import { createPinia } from 'pinia';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* PWA library */
import router from './router';

import { firebaseApp } from './firebase';
import firebase from 'firebase/compat/app';


import { getAuth } from 'firebase/auth';
import 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from 'firebaseui';

const app = createApp(App)
  .use(IonicVue)
  .use(createPinia())
  .use(router);

router.isReady().then(() => {

  const auth = getAuth(firebaseApp);
  auth.onAuthStateChanged(user => {
    const ui = new firebaseui.auth.AuthUI(getAuth(firebaseApp));
    if (user) {
      console.log("user already logged");
      app.mount('#app');
      console.log("App mounted correctly");
    }
    else {
      console.log("user not logged");
      ui.start("#app", {
        signInSuccessUrl: '/workspace',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
      });
    }
  })
});