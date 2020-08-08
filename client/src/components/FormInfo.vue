<template>
  <div>
    <h1 class="text-h4 font-weight-regular py-2">{{ title }}</h1>
    <v-card-subtitle class="text-subtitle-1 pl-0"
      >This form is created by {{ user.name }} ({{
        user.email
      }})</v-card-subtitle
    >
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    user: Object,
  },
};
</script>

<style>
</style>