<template>
  <v-card flat class="mx-auto pa-6">
    <v-text-field
      flat
      :hide-details="false"
      class="pt-0"
      v-model="question"
      @input="$emit('update-label', { question, id: field.id })"
    />
    <v-date-picker
      header-color="primary"
      v-if="type === 'date'"
      readonly
      disabled
    />
    <v-text-field
      v-else
      class="pb-2"
      placeholder="Enter your response"
      filled
      disabled
      dense
      :readonly="true"
      :hide-details="true"
    />
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      question: this.field.label,
    };
  },
  props: {
    field: Object,
    type: String,
  },
};
</script>

<style>
</style>
