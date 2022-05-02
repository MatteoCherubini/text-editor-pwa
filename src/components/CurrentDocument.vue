<template>
  <ion-page v-if="checkDocIsActive()">
    <ion-header>
      <ion-toolbar>
        <ion-title id="PWAdocTitle" slot="start"> {{ title }} </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="chapter-container"></ion-content>

    <ion-button
      expand="block"
      color="medium"
      @click="
        localStore().getCurrentDoc().makeChapter(this.title, this.idContainer)
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
import { localStore, temporaryCloudStore } from "@/stores/PwaBasicStore";

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
    checkDocIsActive() {
      return localStore().isDocActive();
    },
  },

  setup() {
    const idContainer = "#chapter-container";
    const title = localStore().getTitle();

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