<template>
  <v-form
    @submit.prevent="submitResponse"
    :style="{ 'max-width': '740px' }"
    class="mx-auto mb-16"
  >
    <v-card class="mt-14 px-6 py-5">
      <form-info :title="form.title" :user="form.user" />
      <v-card flat class="mx-auto pt-4">
        <p class="text-subtitle-1 font-weight-light mb-3">Email</p>
        <v-text-field
          placeholder="Enter your email"
          filled
          :error-messages="emailErrors"
          dense
          v-model="email"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          required
        />
      </v-card>
      <text-field
        v-for="(field, index) in fields"
        :key="index"
        :placeholder="field.fieldPlaceHolder"
        :label="field.fieldName"
        :id="index"
        @update-response="updateResponse"
      />
    </v-card>
    <v-btn type="submit" class="my-5 py-6" block>Submit response</v-btn>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import TextField from "./show-form/TextField";
import FormInfo from "./FormInfo";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
    };
  },

  mixins: [validationMixin],

  validations: {
    email: {
      email,
      required,
    },
  },

  components: {
    TextField,
    FormInfo,
  },

  props: {
    fields: Array,
    form: Object,
    response: Array,
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    ...mapMutations(["setError"]),

    async submitResponse() {
      this.$v.$touch();
      const newResponse = {
        respondee: this.email,
        fields: this.response,
      };

      try {
        await this.$http.post(
          `/api/response/${this.form.shortid}`,
          newResponse
        );

        this.submitted = true;
      } catch (err) {
        const error = {
          isThere: true,
          text: err.response.data,
        };
        this.$store.dispatch("setError", error);
      }
    },

    updateResponse({ response, id }) {
      const field = this.response[id];

      field.response = response;
    },
  },
};
</script>

<style>
</style>