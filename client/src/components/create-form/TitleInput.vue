<template>
  <v-card flat class="mx-auto pa-6">
    <v-text-field
      :style="{
        'font-size': '1.6rem',
      }"
      class="pt-2"
      v-model="formTitle"
      flat
      height="50"
      :hide-details="true"
      @input="$emit('update-title', formTitle)"
    />
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      formTitle: this.title,
    };
  },
  props: {
    title: String,
  },
};
</script>

<style>
</style>