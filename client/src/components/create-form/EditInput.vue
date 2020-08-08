<template>
  <v-card flat class="mx-auto pa-6">
    <v-text-field
      flat
      :hide-details="false"
      class="pt-0"
      v-model="question"
      @input="$emit('update-label', { question, id })"
    />
    <slot />
  </v-card>
</template>

<script>
export default {
  props: {
    question: String,
    id: Number,
  },
};
</script>

<style>
</style>