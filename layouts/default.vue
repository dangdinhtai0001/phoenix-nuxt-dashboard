<template>
  <v-app dark>
    <!-- -------------------------- left drawer -------------------------- -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :fixed="true"
      app
      mini-variant-width="60"
    >
      <v-list nav class="px-1">
        <v-list-item v-for="(item, i) in items" :key="i" router exact dense>
          <CommonTreeMenu :item="item" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- -------------------------- left drawer -------------------------- -->
    <!-- -------------------------- app bar -------------------------- -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <!-- -------------------------- application name -------------------------- -->
      <div class="w-60 px-2">
        <div class="flex flex-row">
          <div>
            <v-avatar size="30" class="border-2 border-opacity-10">
              <img src="/logo/logo.png" alt="logo" />
            </v-avatar>
          </div>
          <div class="text-lg text-uppercase text-center white--text mx-2 mt-1">
            {{ profile.title }}
          </div>
        </div>
      </div>
      <!-- -------------------------- application name -------------------------- -->
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- -------------------------- app bar -------------------------- -->

    <!-- -------------------------- main -------------------------- -->
    <v-main>
      <perfect-scrollbar>
        <v-container fluid id="main-container">
          <nuxt />
        </v-container>
      </perfect-scrollbar>
    </v-main>
    <!-- -------------------------- main -------------------------- -->

    <!-- -------------------------- right drawer -------------------------- -->
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- -------------------------- right drawer -------------------------- -->

    <!-- -------------------------- footer -------------------------- -->
    <v-footer :absolute="false" app height="30px">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- -------------------------- footer -------------------------- -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  beforeMount() {
    this.setMenuItems();
  },
  computed: {
    profile() {
      return {
        avatar: true,
        title: "vue dashboard",
      };
    },
    profileItems() {
      return [
        {
          icon: "mdi-account",
          title: "Profile",
          to: "/user/profile",
        },
        {
          icon: "mdi-cog",
          title: "Settings",
          to: "/user/setting",
        },
      ];
    },
  },
  methods: {
    setMenuItems() {
      this.items = [...this.$store.state.application.applicationMenu];
    },
  },
};
</script>

<style scoped>
.ps {
  height: calc(100vh - 60px - 30px);
  /* 100 vh - height(app bar) - height(footer) */
}

#main-container {
  position: relative;
  overflow: hidden !important;
}
</style>

