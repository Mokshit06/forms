<template>
  <div :style="{ 'max-width': '740px' }" class="mx-auto mb-16">
    <v-form @submit.prevent="createForm">
      <v-card class="mt-14">
        <title-input :title="title" @update-title="updateTitle" />
        <text-input
          v-for="field in fields"
          :key="field.id"
          :field="field"
          @update-label="updateLabel"
        />
        <v-btn class="mx-6 mb-6 pa-6" @click="createField">Add new</v-btn>
      </v-card>

      <v-btn type="submit" class="my-5 py-6" block>Create Form</v-btn>
    </v-form>
  </div>
</template>

<script>
import TextInput from "../../components/create-form/TextInput";
import TitleInput from "../../components/create-form/TitleInput";

export default {
  data() {
    return {
      fields: [
        {
          label: "Question",
          active: false,
          id: 0,
        },
      ],
      title: "Untitled Form",
    };
  },
  components: {
    TextInput,
    TitleInput,
  },
  methods: {
    async createForm() {
      const newForm = this.fields.map((field) => ({
        fieldName: field.label,
        fieldType: "text",
        fieldPlaceHolder: "Enter your response here",
      }));

      try {
        await this.$http.post("/api/forms", {
          fields: newForm,
          title: this.title,
        });

        this.$router.push("/");
      } catch (err) {
        const error = {
          isThere: true,
          text: err.response.data,
        };
        this.$store.dispatch("setError", error);
      }
    },

    createField() {
      this.fields.push({
        label: "Question",
        active: false,
        id: this.fields[this.fields.length - 1].id + 1,
      });
    },

    updateLabel({ question, id }) {
      this.fields[id].label = question;
    },

    updateTitle(newTitle) {
      this.title = newTitle;
    },
  },
};
</script>

<style>
</style>