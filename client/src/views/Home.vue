<template>
  <div>
    <v-col align="center" class="mt-10">
      <h1>Forms that you have created</h1>
    </v-col>
    <v-container v-if="forms.length > 0" fluid style="width: 83%;">
      <v-row>
        <v-col v-for="(form, index) in forms" :key="index" cols="4">
          <form-link
            :title="form.title"
            :date="form.createdAt"
            :img="require('../assets/1.jpg')"
            :id="form.shortid"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container fill-height fluid v-else>
      <v-row align="center" justify="center">
        <div class="mt-6 text-h6 font-weight-light grey--text text--lighten-2">
          You haven't created any form yet
        </div>
      </v-row>
    </v-container>
  </div>
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
    };
  },
  async created() {
    try {
      const { data: forms } = await this.$http.get("/api/forms");
      console.log(forms);
      this.forms = forms;
    } catch (err) {
      console.log(err.response.data);
    }
  },
};
</script>
