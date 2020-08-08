<template>
  <v-card flat class="mx-auto py-4">
    <p class="text-subtitle-1 font-weight-light mb-3">{{ field.fieldName }}</p>
    <v-date-picker
      header-color="primary"
      v-if="field.fieldType === 'date'"
      v-model="response"
      color="primary"
      @input="$emit('update-response', { response, id })"
    />
    <v-text-field
      v-else
      class="pb-2"
      :placeholder="field.fieldPlaceHolder"
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
    field: Object,
    id: Number,
  },
};
</script>

<style>
</style>