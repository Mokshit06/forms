<template>
  <v-menu close-on-click close-on-content-click offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" class="mx-6 mb-6 pa-6" :ripple="false">
        <v-icon left>add</v-icon>
        <div>Add new</div>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(option, index) in options"
        :key="index"
        @click="$emit(option.function)"
      >
        <v-icon small class="mr-3">
          {{ option.icon }}
        </v-icon>
        <v-list-item-title>{{ option.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- <v-card flat elev class="py-2 pl-2">
      <v-btn
        light
        class="pa-2 mr-2"
        depressed
        v-for="(option, index) in options"
        :key="index"
        @click="a"
      >
        <v-icon left small>{{ option.icon }}</v-icon>
        {{ option.title }}
      </v-btn>
    </v-card> -->
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          title: "Text",
          icon: "text_format",
          function: "create-text",
        },
        {
          title: "Date",
          icon: "date_range",
          function: "create-date",
        },
      ],
    };
  },

  methods: {
    a() {
      console.log("Works!!");
    },
  },
};
</script>

<style>
</style>