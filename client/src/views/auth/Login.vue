<template>
  <base-form type="Login">
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="email"
        label="Enter your email"
        :error-messages="emailErrors"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        required
        filled
      />

      <v-text-field
        v-model="password"
        label="Enter your password"
        :error-messages="passwordErrors"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        required
        filled
        class="pb-2"
      />
      <v-btn type="submit">Log in</v-btn>
    </v-form>
  </base-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import BaseForm from "@/components/BaseForm";

export default {
  mixins: [validationMixin],

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  components: {
    BaseForm,
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    ...mapActions(["loginUser"]),
    async submit() {
      this.$v.$touch();
      try {
        await this.loginUser({
          email: this.email,
          password: this.password,
        });

        this.$router.push("/");
      } catch (err) {
        const error = {
          isThere: true,
          text: err.message,
        };
        this.$store.dispatch("setError", error);
      }
    },
  },
};
</script>

<style>
</style>