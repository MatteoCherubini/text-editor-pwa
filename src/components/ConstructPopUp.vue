<template>
  <ion-item>
    <ion-input
      v-model="newDocTitle"
      inputmode="text"
      maxlength="20"
      placeholder="Enter Title ..."
    >
    </ion-input>
    <ion-button @click="setOpen(true)">NEW DOCUMENT</ion-button>

    <ion-alert
      :is-open="isOpenRef"
      :header="newDocTitle"
      css-class="my-custom-class"
      :buttons="[
        { text: 'Cancel' },
        {
          text: 'Ok',
          handler: () => {
            createDocument(newDocTitle);
          },
        },
      ]"
      @didDismiss="setOpen(false)"
    >
    </ion-alert>
  </ion-item>
</template>

<script lang="ts">
import { IonAlert, IonButton, IonItem, IonInput } from "@ionic/vue";
import { ref as vueRef } from "vue";

import { menuNewDocStrategy } from "@/components/textEditorLibrary";
import { localStore } from "@/stores/PwaBasicStore";
import { getDatabase, push, ref } from "firebase/database";
import { firebaseApp } from "@/firebase";

export default {
  name: "PwaInputPopup",

  components: { IonAlert, IonButton, IonItem, IonInput },

  methods: {
    createDocument(newTitle: string) {
      console.log("new document " + newTitle + " will be added:");

      localStore().assignTitle(newTitle);

      localStore().assignCurrentDB(
        push(ref(getDatabase(firebaseApp), "/"), {
          title: newTitle,
        })
      );

      const doc = new menuNewDocStrategy(
        newTitle,
        localStore().childs,
        localStore().getCurrentDBRef()
      );

      localStore().assignCurrentDoc(doc);
      localStore().addChild(newTitle, doc.getCloudID());
      doc.mountDocument();
    },
  },

  setup() {
    const isOpenRef = vueRef(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);
    var newDocTitle;
    return { isOpenRef, setOpen, newDocTitle };
  },
};
</script>