<template>
  <div v-if="flag">
    <ion-item>
      <ion-input
        v-model="chapTitle"
        inputmode="text"
        maxlength="20"
        placeholder="Enter Title"
        value="chapTitle;"
        @change="saveChapTitle(chapTitle, chapRef)"
        >{{ title }}
      </ion-input><!--@keyup.enter=""-->
      <ion-icon slot="end" :icon="closeOutline" @click="removeChap(chapRef); flag = false;"></ion-icon>
    </ion-item>
    <ion-item>
      <ion-textarea
        v-model="chapContent"
        class="TextAreaPwa"
        auto-grow="true"
        placeholder="..."
        autocapitalize="sentences"
        value="chapContent;"
        @change="saveChapCont(chapContent, chapRef)"
      >
      </ion-textarea>
    </ion-item>
  </div>
</template>

<script lang="ts">
import { IonTextarea, IonItem, IonInput, IonIcon } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";

import { localStore, temporaryCloudStore } from "@/stores/PwaBasicStore";

import { remove, ThenableReference, update } from "firebase/database";
import { menuCloudDocStrategy } from "./textEditorLibrary";

export default {
  name: "PwaChapterArea",
  props: {
    title: String,
  },

  components: {
    IonTextarea,
    IonItem,
    IonInput,
    IonIcon,
  },

  data: function () {
    return {
      flag: true,
    }
    
  },

  methods: {
    saveChapTitle: function (text: string, chapRef: ThenableReference) {
      update(chapRef, { title: text });
    },

    saveChapCont: function (text: string, chapRef: ThenableReference) {
      update(chapRef, { content: text });
    },

    removeChap: function (chapRef: ThenableReference) {
      remove(chapRef);
    }
  },

  setup() {
    var chapTitle;
    var chapContent;

    if (localStore().getCurrentDoc() instanceof menuCloudDocStrategy) {
      chapTitle = temporaryCloudStore().getChapCloudTitle();
      chapContent = temporaryCloudStore().getChapCloudContent();
    } else {
      chapTitle = "";
      chapContent = "";
    }

    const chapRef = temporaryCloudStore().getChapCloudRef();
    return { chapTitle, chapContent, chapRef, closeOutline};
  },
};
</script>

<style>
.TextAreaPwa {
  padding-left: 10%;
}
</style>

