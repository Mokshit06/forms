<template>
  <v-card class="mt-15 px-6 py-5 mx-auto" max-width="740">
    <h1 class="text-h4 font-weight-regular py-2">{{ title }}</h1>
    <v-card-title class="pl-0 mb-2 text-h5"
      >Your response has been recorded</v-card-title
    >
    <v-card-subtitle class="pl-0 text-subtitle-1"
      >Your response has been sent to {{ email }}</v-card-subtitle
    >
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    email: String,
  },
};
</script>

<style>
</style>