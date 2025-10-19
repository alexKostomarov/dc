<template>
  <v-switch
      :input-value="isDark"
      @change="toggleTheme"
      inset
      hide-details
      class="theme-switch"
  >
  </v-switch>
</template>

<script>


export default {
  computed: {
    isDark(){
      return this.$store.getters["theme/isDark"];
    }
  },
  watch: {
    isDark(val) {
      this.$vuetify.theme.dark = val;
      this.updateThumb();
    },
  },
  methods: {
    toggleTheme() {
      this.$store.commit('theme/toggleTheme');
    },
    updateThumb() {
      const thumb = this.$el.querySelector('.v-input--switch__thumb');
      if (thumb) {
        thumb.innerHTML = `<i class="v-icon mdi ${
            this.isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
        }"></i>`;
      }
    },
  },
  mounted() {
    this.$vuetify.theme.dark = this.isDark;
    this.updateThumb();
  },

}
</script>

<style lang="scss">

.theme-switch {

  .v-input--switch__track {
    background-color: var(--caption-color);
  }

  .v-input--switch__thumb {
    background-color: transparent !important;
    box-shadow: none !important;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    .v-icon {
      font-size: 18px;
      color: var(--icon-color)!important;
      transition: color 0.3s ease;
    }
  }

}



</style>