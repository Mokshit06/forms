<template>
  <div>
    <h1 v-if="loading">Loading...</h1>
    <response-sent
      v-else-if="submitted"
      :title="form.title"
      :email="form.user.email"
    />
    <response-form v-else :form="form" :response="response" :fields="fields" />
  </div>
</template>

<script>
import ResponseSent from "../../components/ResponseSent";
import ResponseForm from "../../components/ResponseForm";

export default {
  data() {
    return {
      form: null,
      response: null,
      loading: null,
      email: "",
      submitted: false,
    };
  },

  components: {
    ResponseSent,
    ResponseForm,
  },

  computed: {
    fields() {
      return this.form.fields.filter((field) => field.fieldName !== "Email");
    },
  },

  methods: {
    async getForm() {
      const id = this.$route.params.id;
      try {
        const { data: form } = await this.$http.get(`/api/forms/${id}`);
        this.form = form;
        this.response = this.fields.map((field) => ({
          fieldName: field.fieldName,
          response: "",
        }));
      } catch (err) {
        console.log(err.response.data);
      }
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