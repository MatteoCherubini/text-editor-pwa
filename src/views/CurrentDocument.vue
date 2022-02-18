<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title slot="start">New Document</ion-title>
      </ion-toolbar>
    </ion-header>

    <keep-alive>
      <ion-content id="chapter-container" ></ion-content> 
    </keep-alive>

    <ion-button expand="block" color="medium" @click="page.makeChapter(idContainer)">
      <ion-icon slot="start" :icon="addCircle" ></ion-icon>
      new chapter:
    </ion-button>

  </ion-page>
</template>

<script lang="ts">
import {  
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
          } from '@ionic/vue';

import { ellipsisVertical, addCircle,} from 'ionicons/icons';

import { Page,} from '@/components/textEditorFunctions';

export default  {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
  },

  setup() {
    const idContainer = '#chapter-container';
    var page = new Page("prova");//***********************************************************************************************************
    return { ellipsisVertical, addCircle, page};
  },

}
</script>
