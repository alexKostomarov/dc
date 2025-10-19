<template>
  <v-select
      :items="cities"
      item-text="title"
      item-value="id"
      label="Фильтр по городам"
      v-model="selected"
      multiple
      clearable
  />
</template>

<script>
import cities from "~/assets/data/cities.json";

export default {
  computed: {
    selected: {
      get() {
        return this.$store.getters['users/cityFilter'];
      },
      set(val) {
        this.$store.commit('users/setCityIds', val);
      }
    }
  },
  data() {
    return {
      cities: cities
    }
  }
}
</script>
