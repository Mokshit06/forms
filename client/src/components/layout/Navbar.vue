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
        class="mx-2"
        :icon="!!link.icon"
        :class="{ 'pa-0': !!link.icon }"
        depressed
      >
        {{ link.name }}
        <v-icon v-if="link.icon">{{ link.icon }}</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { navbarLinks } from "../../data/navigation.json";

export default {
  name: "Navbar",
  data() {
    return {
      links: navbarLinks,
    };
  },
  computed: {
    visibleLinks() {
      if (this.$store.getters.isAuthenticated) {
        return this.links.filter((link) => link.auth === true);
      }
      return this.links.filter((link) => link.guest === true);
    },
  },
};
</script>

<style>
</style>