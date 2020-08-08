<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="name"
      label="Enter your name"
      :error-messages="nameErrors"
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
      required
      filled
    />
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
    <!-- <v-text-field
      v-for="(field, index) in fields"
      :key="index"
      v-model="field.field"
      :label="'Enter your ' + field.name"
      @input="$v[field.name].$touch()"
      @blur="$v[field.name].$touch()"
      required
      filled
    /> -->
    <v-btn type="submit">Sign up</v-btn>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: {
      required,
    },
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
      name: "",
      email: "",
      password: "",
      // fields: [
      //   {
      //     name: "password",
      //     field: this.password,
      //   },
      //   {
      //     name: "email",
      //     field: this.email,
      //   },
      //   {
      //     name: "name",
      //     field: this.name,
      //   },
      // ],
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Password is required");
      return errors;
    },
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
    async submit() {
      this.$v.$touch();
      try {
        await this.$store.dispatch("registerUser", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>