<template>
  <ion-button @click="setOpen(true)">NEW DOCUMENT</ion-button>
  <ion-alert
    :is-open="isOpenRef"
    header="Title:"
    css-class="my-custom-class"

    :inputs= 'titleInput'

    :buttons= 'buttons'

    @didDismiss="setOpen(false)"
  >
  </ion-alert>
</template>

<script lang="ts">
import { IonAlert, IonButton, IonTextarea } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "PwaInputPopup",

  components: { IonAlert, IonButton },

  setup() {
      const isOpenRef = ref(false);
      const setOpen = (state: boolean) => isOpenRef.value = state;
      
      let docTitle = '';
      
      const buttons = [{text: 'Cancel'},{text: 'Ok', handler: (data: { title: any; }) => {//console.log(
        docTitle=data.title;//dovrebbe essere un observer***************************************************************
      //)
      },},]; 
      const titleInput = [{
        name: 'title',
        placeholder: 'Insert Title...'
      }];
      
      return { buttons, titleInput, isOpenRef, setOpen, docTitle}
  }
});
</script>