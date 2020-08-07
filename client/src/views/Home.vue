<template>
  <div>
    <v-col align="center" class="mt-5">
      <h1>Forms that you have created</h1>
    </v-col>
    <v-container v-if="forms.length > 0" fluid style="width: 83%;">
      <v-row>
        <v-col v-for="(form, index) in forms" :key="index" cols="4">
          <form-link :title="form.title" :img="form.img" />
        </v-col>
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
      forms: [
        {
          title: "Test 1",
          img: require("../assets/1.jpg"),
        },
        {
          title: "Test 1",
          img: require("../assets/1.jpg"),
        },
        {
          title: "Test 1",
          img: require("../assets/1.jpg"),
        },
        {
          title: "Test 1",
          img: require("../assets/1.jpg"),
        },
        {
          title: "Test 1",
          img: require("../assets/1.jpg"),
        },
        {
          title: "Test 1",
          img: require("../assets/1.jpg"),
        },
      ],
    };
  },
};
</script>
