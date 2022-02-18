<template>
    <ion-item>
      <ion-input inputmode="text" maxlength="20" placeholder="Enter Title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-textarea class="TextAreaPwa" auto-grow="true" placeholder="..." autocapitalize=sentences/></ion-textarea>
    </ion-item>
</template>

<script lang="ts">

  import {
    IonTextarea,
    IonItem,
    IonInput,
    } from '@ionic/vue';

  export default {
    name: "PwaChapterArea",
    components: {
      IonTextarea,
      IonItem,
      IonInput,
    },
    props: {
      title: String
    },
  };

</script>

<style>

  .TextAreaPwa {
    padding-left: 10%;
  }

</style>

