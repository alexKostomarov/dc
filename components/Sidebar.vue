<template>
    <v-navigation-drawer
        :key="isMobile ? 'mobile' : 'desktop'"
        v-model="open"
        app
        :clipped="!isMobile"
        :mini-variant="drawerMini"
        :mini-variant-width="64"
        :temporary="isMobile"
        :permanent="!isMobile"

        :style="sidebarStyle"
    >
      <v-list dense>


        <v-list-item class="sidebar-item current-user" @click="toggleSidebar">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{user?.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action v-if="!isMobile">
            <v-icon @click.stop="toggleSidebar">mdi-chevron-left</v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-list-item-group color="accent" class="caption">

          <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.to"
              @click="closeMobileMenu"
              class="sidebar-item"
          >
            <v-list-item-icon>
              <v-icon :color="isActive(item.to) ? 'accent' : 'grey darken-1'">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content v-if="!drawerMini">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

</template>

<script>
import { menuItems } from '~/config/menu';


export default {
  name: 'Sidebar',
  props: {
    showMenu: Boolean
  },
  data() {
    return {
      mini: true,
      collapsed: false,
      selected: null,
      items: menuItems
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path === route
    },
    toggleSidebar() {
      if(this.isMobile) return;
      this.mini = !this.mini;
    },
    sidebarStyle() {
      return this.mini
          ? { width: '64px' }
          : { width: 'fit-content', maxWidth: '300px' }
    },
    closeMobileMenu(){
      if(!this.isMobile) return;
      this.$emit('update:showMenu', false);
    }
  },
  computed:{
    open: {
      get() {
        return this.showMenu;
      },
      set(val) {
        this.$emit('update:showMenu', val);
      }
    },
    user() {
      return this.$store.getters["auth/user"];
    },
    isMobile(){
      return this.$store.getters['screen/isMobile'];
    },
    drawerMini() {
      return this.isMobile ? false :  this.mini;
    }
  }

}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--sidebar-color);;
  transition: width 0.3s ease;
  position: fixed;
  z-index: 10;
  .sidebar-item {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    .v-icon {
      font-size: 28px;
    }
  }
  .sidebar-item.current-user {
    height: 64px;
    .v-list-item__title {
      font-size: 16px;
    }
    .v-list-item__icon{
      margin-top: 0; margin-bottom: 0;
      align-self: center;
    }
    .v-list-item__action i{ cursor: pointer;}
    .v-list-item__action i:hover{ color: #1E1E1E;}
  }
}
</style>

