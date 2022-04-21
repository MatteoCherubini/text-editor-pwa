<template>
<div>
  <ion-item>
    <ion-input
      v-model="chapTitle"
      inputmode="text"
      maxlength="20"
      placeholder="Enter Title"
      value = chapTitle;
      @keyup.enter="saveChapTitle(chapTitle)"
    >{{title}}
    </ion-input>
  </ion-item>
  <ion-item>
    <ion-textarea
      v-model="chapContent"
      class="TextAreaPwa"
      auto-grow="true"
      placeholder="..."
      autocapitalize="sentences"
      value = chapContent;
      @keyup.enter="saveChapCont(chapContent)"
    >
    </ion-textarea>
  </ion-item>
</div>
</template>

<script lang="ts">
import { IonTextarea, IonItem, IonInput } from "@ionic/vue";

import { localStore } from "@/stores/PwaBasicStore";
import { menuCloudDocStrategy } from './textEditorLibrary';

export default {
  name: "PwaChapterArea",
  props: {
    title: String
  },

  components: {
    IonTextarea,
    IonItem,
    IonInput,
  },

  methods: {
    saveChapTitle: function (text: string) {
      localStore().currentChapterText[0] = text;
    },

    saveChapCont: function (text: string) {
      localStore().currentChapterText[1] = text;
    },
  },

  setup() {
    const matrix = localStore().getChapterMatrix();
    console.log("e la matrice è: " + matrix);
    var chapTitle;
    var chapContent;
    if(localStore().getCurrentDoc() instanceof menuCloudDocStrategy ){
      chapTitle = matrix[0];
      chapContent = matrix[1];
    }
    else{
      chapTitle = "";
      chapContent = "";
    }
    
    return { chapTitle,chapContent }; 
  },
};
</script>

<style>
.TextAreaPwa {
  padding-left: 10%;
}
</style>

