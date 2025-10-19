<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <v-text-field
          v-model="search"
          label="Поиск по телефону"
          clearable

      />
    </v-col>

    <v-col cols="12" md="6">
      <CityFilter />
    </v-col>
  </v-row>
</template>

<script>
import CityFilter from './CityFilter.vue'

export default {
  components: { CityFilter },
  computed: {
    search: {
      get() {
        return this.$store.getters['users/search']
      },
      set(val) {
        this.$store.commit('users/setSearch', val)
      }
    }
  }
}
</script>
