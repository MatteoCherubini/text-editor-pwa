<template>
  <ion-page v-if="checkDocIsActive()">
    <ion-header>
      <ion-toolbar>
        <ion-button
          slot="start"
          id="PWAmenuButton"
          @click="toggleMenu()"
        >
          <ion-icon slot="icon-only" :icon="menu"></ion-icon>
        </ion-button>
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

import { ellipsisVertical, addCircle, saveOutline, menu } from "ionicons/icons";
import { localStore } from "@/stores/PwaBasicStore";

import { SIZE_TO_MEDIA } from "@ionic/core/dist/collection/utils/media";

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

    toggleMenu() {
      const splitPane = document.querySelector("ion-split-pane")!;
      if (
        window.matchMedia(
          SIZE_TO_MEDIA[splitPane.when.toString()] || splitPane.when
        ).matches
      ) {
        splitPane.classList.toggle("split-pane-visible");
      }
    },
  },

  setup() {
    const idContainer = "#chapter-container";
    const title = localStore().getTitle();

    return {
      ellipsisVertical,
      addCircle,
      saveOutline,
      menu,
      localStore,
      idContainer,
      title,
    };
  },
};
</script>

<style>
  @media only screen and (max-width: 991px) {
    #PWAmenuButton {
      display:none;
    }
  }
</style>