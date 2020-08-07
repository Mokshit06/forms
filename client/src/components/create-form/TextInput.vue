<template>
  <div>
    <v-card flat class="mx-auto pa-6">
      <v-text-field
        flat
        :hide-details="false"
        class="pt-0"
        v-model="question"
        @input="$emit('update-label', { question, id: field.id })"
      />
      <v-text-field
        class="pb-2"
        placeholder="Enter your response"
        filled
        disabled
        dense
        :readonly="true"
        :hide-details="true"
      />
    </v-card>
  </div>
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
  },
};
</script>

<style>
</style>
