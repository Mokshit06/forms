<template>
  <v-app :dark="true">
    <Navbar />
    <v-main>
      <router-view />
      <error />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/layout/Navbar";
import Error from "@/components/error/Error";

export default {
  name: "App",
  components: {
    Navbar,
    Error,
  },
  // async created() {
  //   if (document.cookie.length > 0) {
  //     await this.$store.dispatch("getUser");
  //     console.log(this.$store.getters.isAuthenticated);
  //   }
  // },
};
</script>

<style>
html {
  overflow: auto !important;
}
</style>