<template>
  <v-snackbar multi-line right v-model="error.isThere">
    {{ error.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="
          setError({
            isThere: false,
            error: '',
          })
        "
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: mapGetters(["error"]),
  methods: mapMutations(["setError"]),
};
</script>

<style>
</style>