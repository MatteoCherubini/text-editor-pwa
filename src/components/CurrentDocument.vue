<template>
  <ion-page v-if="checkDocIsActive()">
    <ion-header>
      <ion-toolbar>
        <ion-title id = "PWAdocTitle" slot="start"> {{ title }} </ion-title>
        <ion-button slot="end" @click="save()">
          <ion-icon :icon="saveOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content id="chapter-container"></ion-content>

    <ion-button
      expand="block"
      color="medium"
      @click="
        localStore().appendChapter();
        localStore().getCurrentDoc().makeChapter(this.title, this.idContainer);
      "
    >
      <ion-icon slot="start" :icon="addCircle"></ion-icon>
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
} from "@ionic/vue";

import { ellipsisVertical, addCircle, saveOutline } from "ionicons/icons";
import { localStore } from "@/stores/PwaBasicStore";

import { update } from "firebase/database";

export default {
  name: "PwaDocument",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
  },

  methods: {
    save() {
      localStore().appendChapter();
      const matrix = localStore().getChapterMatrix();
      console.log("accessing DataBase...");
      if(matrix!=[]){
        console.log("in current document la matrice è piena!!")
        update(localStore().getCurrentDBRef(), { content: matrix });
        localStore().clearChapterMatrixOnceSaved();
      }
    },

    checkDocIsActive(){
      return localStore().isDocActive();
    },
  },

setup() {
    const idContainer = "#chapter-container";
    const title = "currentDoc da sistemare";//magari con la referenza al db... tanto prima cloud!!
    //localStore().getCurrentDoc().getDocTitle();

    return {
      ellipsisVertical,
      addCircle,
      saveOutline,
      localStore,
      idContainer,
      title,
    };
  },
};
</script>