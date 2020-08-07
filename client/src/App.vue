<template>
  <v-app :dark="true">
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/layout/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
  // async created() {
  //   if (document.cookie.length > 0) {
  //     await this.$store.dispatch("getUser");
  //     console.log(this.$store.getters.isAuthenticated);
  //   }
  // },
};
</script>