<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title class="headline font-weight-light">
        <span>Forms</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="(link, i) in visibleLinks"
        :key="i"
        :to="link.link"
        text
        style="margin-left: 6px; margin-right: 6px;"
      >
        {{ link.name }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { navbarLinks } from "../data/navigation.json";

export default {
  name: "Navbar",
  data() {
    return {
      links: navbarLinks,
    };
  },
  computed: {
    visibleLinks() {
      if (this.$store.state.user) {
        return this.links.filter((link) => link.auth === true);
      }
      return this.links.filter((link) => link.guest === true);
    },
  },
};
</script>

<style>
</style>