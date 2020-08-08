<template>
  <v-container>
    <v-col class="my-8">
      <h1 class="d-flex justify-center">
        Forms that you have created
      </h1>
    </v-col>
    <div class="mt-6 d-flex justify-center" v-if="loading">
      <h6 class="text-h6 font-weight-light grey--text text--lighten-2">
        Loading...
      </h6>
    </div>
    <v-container v-else-if="forms.length > 0" fluid>
      <v-row>
        <v-col v-for="(form, index) in forms" :key="index" cols="3">
          <form-link
            :title="form.title"
            :date="form.createdAt"
            :img="require('../assets/1.jpg')"
            :id="form.shortid"
            @delete-form="deleteForm"
          />
        </v-col>
      </v-row>
    </v-container>
    <div class="mt-6 d-flex justify-center" v-else>
      <h6 class="text-h6 font-weight-light grey--text text--lighten-2">
        You haven't created any form yet
      </h6>
    </div>
  </v-container>
</template>

<script>
import FormLink from "../components/FormLink";

export default {
  name: "Home",
  components: {
    FormLink,
  },
  data() {
    return {
      forms: [],
      loading: null,
    };
  },
  methods: {
    async getForms() {
      try {
        const { data: forms } = await this.$http.get("/api/forms");
        console.log(forms);
        this.forms = forms;
      } catch (err) {
        console.log(err.response.data);
      }
    },

    async deleteForm(id) {
      try {
        await this.$http.delete(`/api/forms/${id}`);
        this.forms = this.forms.filter((form) => form.shortid !== id);
      } catch (err) {
        console.log(err.response.data);
      }
    },
  },
  async created() {
    this.loading = true;
    await this.getForms();
    this.loading = false;
  },
};
</script>
