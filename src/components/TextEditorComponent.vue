<template>
  <div>
    <ion-item>
      <ion-input
        v-model="chapTitle"
        inputmode="text"
        maxlength="20"
        placeholder="Enter Title"
        value="chapTitle;"
        @keyup.enter="saveChapTitle(chapTitle, chapRef)"
        >{{ title }}
      </ion-input>
    </ion-item>
    <ion-item>
      <ion-textarea
        v-model="chapContent"
        class="TextAreaPwa"
        auto-grow="true"
        placeholder="..."
        autocapitalize="sentences"
        value="chapContent;"
        @keyup.enter="saveChapCont(chapContent, chapRef)"
      >
      </ion-textarea>
    </ion-item>
  </div>
</template>

<script lang="ts">
import { IonTextarea, IonItem, IonInput } from "@ionic/vue";

import { localStore, temporaryCloudStore } from "@/stores/PwaBasicStore";

import { ThenableReference, update } from "firebase/database";
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
  },

  methods: {
    saveChapTitle: function (text: string, chapRef: ThenableReference) {
      update(chapRef, { title: text });
    },

    saveChapCont: function (text: string, chapRef: ThenableReference) {
      update(chapRef, { content: text });
    },
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
    return { chapTitle, chapContent, chapRef };
  },
};
</script>

<style>
.TextAreaPwa {
  padding-left: 10%;
}
</style>

