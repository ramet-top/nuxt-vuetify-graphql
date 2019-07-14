<template>
  <div>
    <!-- ****************************split template **************************** -->
    <!-- not auth -->
    <template v-if="!checkAuth">
      <v-navigation-drawer
        v-model="PubblicDrawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <v-list>
          <v-list-tile to="/" exact>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="'หน้าหลัก'" />
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-for="(itemP, i) in itemsPublic" :key="i" :to="itemP.to" router exact>
            <v-list-tile-action>
              <v-icon>{{ itemP.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="itemP.title" />
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile to="/login" exact>
            <v-list-tile-action>
              <v-icon>lock</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="'เข้าสู่ระบบ'" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <!-- dark mode-->
      <v-toolbar :clipped-left="clipped" fixed app dark>
        <div>
          <v-toolbar-side-icon @click="PubblicDrawer = !PubblicDrawer" />
          <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-btn>
          <v-btn icon @click.stop="clipped = !clipped">
            <v-icon>web</v-icon>
          </v-btn>
          <!-- <v-btn icon @click.stop="fixed = !fixed">
            <v-icon>remove</v-icon>
          </v-btn>-->
        </div>

        <v-toolbar-title v-text="title" />
        <v-spacer />
        <!-- <v-spacer></v-spacer> -->

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/">
            <v-icon>home</v-icon>หน้าหลัก
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items class="hidden-sm-and-down" v-for="(itemP, i) in itemsPublic" :key="i">
          <v-btn flat :to="itemP.to">
            <v-icon class="mr-1">{{ itemP.icon }}</v-icon>
            {{ itemP.title }}
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/login">
            <v-icon>lock</v-icon>เข้าสู่ระบบ
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </template>
    <!-- not auth end-->
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
// import VuetifyLogo from "~/components/VuetifyLogo";

export default {
  name: "Nav",

  // components: {
  //   VuetifyLogo
  // },

  data() {
    return {
      dialog: false,
      clipped: false,
      // drawer: true,
      PubblicDrawer: false,
      // fixed: false,
      itemsPublic: [
        {
          icon: "fiber_new",
          title: "ข่าวประกาศ",
          to: "/news"
        },
        {
          icon: "school",
          title: "หลักสูตร",
          to: "/course"
        },
        {
          icon: "contacts",
          title: "ติดต่อ",
          to: "/contact"
        },
        {
          icon: "supervisor_account",
          title: "บุคลากร",
          to: "/personnel"
        },
        {
          icon: "perm_data_setting",
          title: "เกี่ยวกับ",
          to: "/about"
        }
      ],     

      miniVariant: false,
      title: "CSBSRU"
    };
  },

  computed: {
    checkAuth() {
      return this.$store.getters["auth/checkAuth"];
    },

    // user() {
    //   return this.$store.state.auth.user;
    // },
  },

  methods: {
    // ...mapMutations({
    //     logout: "auth/logout"
    // }),
  },
};
</script>
