<template>
  <div>
    <h1 v-if="loading">Loading...</h1>
    <v-form
      v-else
      @submit.prevent="submitResponse"
      :style="{ 'max-width': '770px' }"
      class="mx-auto mb-16"
    >
      <v-card class="mt-14 px-6 py-5">
        <h1 class="text-h4 font-weight-regular py-2">{{ form.title }}</h1>
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
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import TextField from "../../components/show-form/TextField";

export default {
  mixins: [validationMixin],

  validations: {
    email: {
      email,
      required,
    },
  },

  data() {
    return {
      form: null,
      response: null,
      loading: null,
      email: "",
    };
  },

  components: {
    TextField,
  },

  computed: {
    fields() {
      return this.form.fields.filter((field) => field.fieldName !== "Email");
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    async getForm() {
      const id = this.$route.params.id;
      const { data: form } = await this.$http.get(`/api/forms/${id}`);
      this.form = form;
      this.response = this.fields.map((field) => ({
        fieldName: field.fieldName,
        response: "",
      }));
    },

    async submitResponse() {
      this.$v.$touch();
      const newResponse = {
        respondee: this.email,
        fields: this.response,
      };

      try {
        const { data: response } = await this.$http.post(
          `/api/response/${this.form.shortid}`,
          newResponse
        );

        console.log(response);
      } catch (err) {
        console.log(err.response.data);
      }
    },

    updateResponse({ response, id }) {
      const field = this.response[id];

      field.response = response;
    },
  },

  async created() {
    this.loading = true;
    await this.getForm();
    this.loading = false;
  },
};
</script>

<style>
</style>