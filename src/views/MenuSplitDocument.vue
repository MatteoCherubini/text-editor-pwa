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
        <ion-list id="PWAmenuToggle" class="PwaDocList">
          <ion-menu-toggle autoHide="false" v-for="doc in documents" :key="doc">
            <div id="PwaDocLink">
              <p @click="generateDocFromLink(doc[0], doc[1])">
                {{ doc[0] }}
              </p>
              <ion-button
                class="linkButton"
                slot="end"
                color="danger"
                size="small"
                @click="deleteDoc(doc[1])"
              >
                <ion-icon slot="icon-only" :icon="trashBinOutline"></ion-icon>
              </ion-button>
            </div>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>

      <pwa-input-popup />
    </ion-menu>

    <ion-content id="main-content" class="PWAdoc">
      <div id="doc-main-content"></div>
    </ion-content>
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
  IonIcon,
} from "@ionic/vue";

import { trashBinOutline } from "ionicons/icons";

import PwaInputPopup from "@/components/ConstructPopUp.vue";

import { menuCloudDocStrategy } from "@/components/textEditorLibrary";

import { localStore } from "@/stores/PwaBasicStore";

import { getDatabase, ref, get, remove } from "firebase/database";
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
    IonIcon,
    PwaInputPopup,
  },

  setup() {
    let documents = [[""]];

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
      documents = localStore().childs;
      documents.shift();
    }

    function generateDocFromLink(title: string, id: string) {
      localStore().assignCurrentDB(ref(getDatabase(firebaseApp), id));
      const doc = new menuCloudDocStrategy(title, []).CloudID(id);
      localStore().assignCurrentDoc(doc);
      doc.mountDocument();
    }

    function deleteDoc(childID: string) {
      if (confirm("Removing Document?")) {
        console.log("removing document...");
        remove(ref(getDatabase(firebaseApp), "/" + childID));
        documents = [[""]];
        const toggle = document.querySelector("#PWAmenuToggle")!;
        var child = toggle.lastElementChild;
        while (child) {
          toggle.removeChild(child);
          child = toggle.lastElementChild;
        }
        getDBDocumentsTitles();
      }
    }

    function logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        console.log("user disconnected");
        window.location.replace("/"); //login
      });
    }

    getDBDocumentsTitles();

    return {
      trashBinOutline,
      getDBDocumentsTitles,
      documents,
      deleteDoc,
      generateDocFromLink,
      logout,
    };
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

#PwaDocLink {
  display: flex;
  align-items: center;
}

.linkButton {
  padding-left: 2em;
}

#menuToolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#menuTitle {
  padding-left: unset;
}
</style>