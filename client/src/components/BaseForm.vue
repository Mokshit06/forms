<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card min-width="400" class="mx-auto px-5 pt-5 pb-5">
        <v-card-title class="pb-5">{{ type }}</v-card-title>
        <slot />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    type: String,
  },
};
</script>

<style>
</style>