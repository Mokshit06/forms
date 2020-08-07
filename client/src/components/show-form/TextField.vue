<template>
  <v-card flat class="mx-auto py-4">
    <p class="text-subtitle-1 font-weight-light mb-3">{{ label }}</p>
    <v-text-field
      class="pb-2"
      :placeholder="placeholder"
      filled
      dense
      :hide-details="true"
      v-model="response"
      @input="$emit('update-response', { response, id })"
    />
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      response: "",
    };
  },
  props: {
    placeholder: String,
    label: String,
    id: Number,
  },
};
</script>

<style>
</style>