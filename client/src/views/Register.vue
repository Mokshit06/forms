<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card min-width="400" class="mx-auto px-5 pt-5 pb-5">
        <v-card-title>Sign up</v-card-title>
        <v-form>
          <v-text-field
            v-model="name"
            label="Enter your name"
            :error-messages="nameErrors"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Enter your email"
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Enter your password"
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            required
          ></v-text-field>
          <br />
          <v-btn @click="submit">Sign up</v-btn>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

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
    ...mapActions(["registerUser"]),
    async submit() {
      this.$v.$touch();
      try {
        await this.registerUser({
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>