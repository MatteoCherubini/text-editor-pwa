<template>
  <ion-split-pane content-id="main-content">
    <ion-menu content-id="main-content">
      <ion-header id="menuToolbar">
        <ion-button @click="logout()"> LOGOUT </ion-button>
        <ion-toolbar translucent>
          <ion-title id="menuTitle">Documents:</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list class="PwaDocList">
          <ion-menu-toggle autoHide="false" v-for="doc in documents" :key="doc">
            <p @click="generateDocFromLink(doc)">{{ doc }}</p>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>

      <pwa-input-popup />
    </ion-menu>

    <div id="main-content" class="PWAdoc"></div>
  </ion-split-pane>
</template>

<script lang="ts">
import {
  IonMenu,
  IonList,
  IonContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonSplitPane,
  IonMenuToggle,
  IonButton,
} from "@ionic/vue";

import PwaInputPopup from "@/components/ConstructPopUp.vue";

import { menuCloudDocStrategy } from "@/components/textEditorLibrary";

import { localStore } from "@/stores/PwaBasicStore";

import { getDatabase, ref, get } from "firebase/database";
import { firebaseApp } from "@/firebase";

import { getAuth, signOut } from "firebase/auth";

export default {
  name: "PwaSideMenu",
  components: {
    IonMenu,
    IonList,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonSplitPane,
    IonMenuToggle,
    IonButton,
    PwaInputPopup,
  },

  setup() {
    function getDBDocumentsTitles() {
      get(ref(getDatabase(firebaseApp), "/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((child) => {
              localStore().addDBName(child.key!);
              localStore().addChild(child.val().title, child.key!);
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error("DataBase " + error);
        });
    }

    getDBDocumentsTitles();

    let documents = localStore().childs;
    documents.shift();

    return { documents };
  },

  methods: {
    generateDocFromLink(title: string) {
      localStore().assignCurrentDB(
        ref(getDatabase(firebaseApp), "-N06mE4gjP1Axdj4kM9A")
      );
      const doc = new menuCloudDocStrategy(title, []);
      localStore().assignCurrentDoc(doc);
      doc.mountDocument();
    },

    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        console.log("user disconnected");
        window.location.replace("/");
      });
    },
  },
};
</script>

<style>
.PwaDocList {
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
  font-size: 110%;
}

#menuToolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#menuTitle {
  padding-left: unset;
}

.PWAdoc {
  width: 100%;
}
</style>