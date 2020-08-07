<template>
  <v-card>
    <v-img
      gradient="to bottom, rgba(0,0,0,.15), rgba(0,0,0,.6)"
      :src="img"
      max-height="200px"
      class="align-end"
    >
      <v-card-title v-text="title"></v-card-title>
    </v-img>

    <v-card-text class="text--primart">
      Created on 29 August
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    img: String,
    title: String,
  },
};
</script>

<style>
</style>