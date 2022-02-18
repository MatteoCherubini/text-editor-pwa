<template>
  <ion-split-pane content-id="main-content">
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar translucent>
          <ion-title>Your Documents:</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-menu-toggle autoHide="false">
          <ion-item
            routerLink="/docs/document1"
            router-direction="root"
            routerLinkActive="active-link"
          >
            <ion-label>document1</ion-label>
          </ion-item>
        </ion-menu-toggle>

        <ion-menu-toggle autoHide="false">
          <ion-item
            routerLink="/docs/document2"
            router-direction="root"
            routerLinkActive="active-link"
          >
            <ion-label>document2</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-content>

      <pwa-input-popup />
    </ion-menu>

    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-split-pane>
</template>

<script lang="ts">
import {
  IonMenu,
  //IonList,
  IonLabel,
  IonItem,
  IonContent,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonSplitPane,
  IonMenuToggle,
} from "@ionic/vue";

import PwaInputPopup from "@/components/constructPopUp.vue";

export default {
  name: "PwaSideMenu",
  components: {
    IonMenu,
    //IonList,
    IonLabel,
    IonItem,
    IonContent,
    IonRouterOutlet,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonSplitPane,
    IonMenuToggle,
    PwaInputPopup,
  },
};
</script>
