<template>
  <v-card>
    <router-link
      :to="'/forms/' + id"
      :style="{
        'text-decoration': 'none',
      }"
    >
      <v-img
        :gradient="randomColor + ',' + randomColor"
        :src="img"
        max-height="150px"
        class="align-end"
      >
        <v-card-title v-text="title"></v-card-title>
      </v-img>
    </router-link>

    <v-card-text class="grey--text d-flex justify-space-between">
      Created on {{ date | formatDate }}
      <v-icon small @click="deleteForm">delete</v-icon>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";
import { getColor } from "random-material-color";

export default {
  props: {
    img: String,
    title: String,
    date: Number,
    id: String,
  },
  filters: {
    formatDate(date) {
      return moment(date).format("D MMMM YY");
    },
  },
  computed: {
    randomColor() {
      return getColor();
    },
  },
  methods: {
    //todo Create this is backend
    async deleteForm() {},
  },
};
</script>

<style>
</style>