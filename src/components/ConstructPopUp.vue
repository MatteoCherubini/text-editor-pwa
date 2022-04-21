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
import { ref } from "vue";

import { menuNewDocStrategy } from "@/components/textEditorLibrary";
import { localStore } from "@/stores/PwaBasicStore";

export default {
  name: "PwaInputPopup",

  components: { IonAlert, IonButton, IonItem, IonInput },

  methods: {
    createDocument(newTitle: string) {
      console.log("new document " + newTitle + " will added:");
      const doc = new menuNewDocStrategy(newTitle, localStore().childs, null!);
      localStore().assignCurrentDoc(doc);
      localStore().addChild(newTitle, doc.getCloudID());
      doc.mountDocument();
    },
  },

  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);
    var newDocTitle;
    return { isOpenRef, setOpen, newDocTitle };
  },
};
</script>