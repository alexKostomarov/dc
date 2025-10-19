<template>
  <v-app  :class="themeClass">
    <client-only>
      <Sidebar :showMenu="showMenu"  @update:showMenu="showMenu = $event" />
    </client-only>

    <v-main>
      <v-app-bar class="app-bar" :app="isMobile">
        <client-only>
          <div @click="showMenu = !showMenu" class="hamburger" v-if="isMobile">
            <v-icon>mdi-menu</v-icon>
          </div>
        </client-only>


        <v-spacer></v-spacer>
        <v-toolbar-title>CRM Панель</v-toolbar-title>

        <v-spacer></v-spacer>

        <theme-toggler />
      </v-app-bar>

      <v-container fluid class="pa-4">
        <nuxt />
      </v-container>

    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue';
import ThemeToggler from '~/components/ThemeToggler.vue';

export default {
  components: { Sidebar, ThemeToggler },
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    themeClass() {
      return this.$vuetify.theme.dark ? 'theme-dark' : 'theme-light';
    },
    isMobile() {
      return this.$store.getters['screen/isMobile'];
    },
    width(){
      return this.$store.state.screen.width
    }
  },

  watch: {
    isDark(val) {
      this.$vuetify.theme.dark = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-bar{
    align-items: center;
  }
</style>