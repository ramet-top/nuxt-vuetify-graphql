<template>
  <div>
    <!-- ****************************split template **************************** -->
    <!-- auth -->

    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <!-- components -->
        <VuetifyLogo />
        <!-- components -->

        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">วิทยาการคอม บ้านเด็จฯ</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg" />
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  Welcome :
                  <strong>{{ user.username }}</strong>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list-tile to="/" exact>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'หน้าหลัก'" />
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group prepend-icon="menu" value="true">
          <!-- menu -->
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>เมนู</v-list-tile-title>
            </v-list-tile>
          </template>
          <!-- menu -->

          <!-- menu default -->
          <v-list-group no-action sub-group value="true">
            <!-- <v-list-group no-action sub-group > -->
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>เมนูทั่วไป</v-list-tile-title>
              </v-list-tile>
            </template>

            <!-- <v-list-tile v-for="(itemsP, i) in itemsPublic" :key="i" @click="eMenu(itemsP.to)" > -->
            <v-list-tile v-for="(itemsP, i) in itemsPublic" :key="i" :to="itemsP.to" exact>
              <v-list-tile-action>
                <v-icon v-text="itemsP.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="itemsP.title"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
          <!-- menu default -->

          <!-- menu profile -->
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>โปรไฟล์</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile v-for="(admin, i) in admins" :key="i" @click>
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <!-- menu profile -->
        </v-list-group>

        <!-- fetch data array -->
        <v-list-tile v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
        <!-- fetch data array -->

        <!-- static btn -->
        <v-list-tile @click="onLogout" to="/login" exact>
          <v-btn block round color="red lighten-2" dark>
            <v-list-tile-action>
              <v-icon>input</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="'ออกจากระบบ'" />
            </v-list-tile-content>
          </v-btn>
        </v-list-tile>
        <!-- static btn -->
      </v-list>
    </v-navigation-drawer>
    <!-- dark mode, top left menu-->
    <v-toolbar :clipped-left="clipped" fixed app dark>
      <div v-if="checkAuth">
        <v-toolbar-side-icon @click="drawer = !drawer" />
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
        <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn icon @click.stop="fixed = !fixed">
          <v-icon>remove</v-icon>
        </v-btn>
      </div>

      <v-toolbar-title v-text="title" />

      <v-spacer />
      <!-- top right nav -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">
          <v-icon>apps</v-icon>หน้าหลัก
        </v-btn>
        <v-btn flat v-if="checkAuth" @click="onLogout">
          <v-icon>input</v-icon>ออกจากระบบ
        </v-btn>
        <br />
      </v-toolbar-items>
      <!-- top right nav -->
    </v-toolbar>

    <!-- auth -->
  </div>
</template>


<script>
import { mapMutations } from "vuex";
import VuetifyLogo from "~/components/VuetifyLogo";

export default {
  name: "NavAuth",
  components: {
    VuetifyLogo
  },
  data() {
    return {
      dialog: false,
      clipped: false,
      drawer: true,
      PubblicDrawer: false,
      fixed: false,
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
      items: [
        {
          icon: "work",
          title: "จัดการโครงงาน",
          to: "/auth/manage-project"
        },
        {
          icon: "cloud_download",
          title: "ไฟล์ดาวน์โหลด",
          to: "/auth/download"
        }
      ],

      admins: [["Management", "people_outline"], ["Settings", "settings"]],
      cruds: [
        ["Create", "add"],
        ["Read", "insert_drive_file"],
        ["Update", "update"],
        ["Delete", "delete"]
      ],

      miniVariant: false,
      title: "CSBSRU"
    };
  },

  computed: {
    checkAuth() {
      return this.$store.getters["auth/checkAuth"];
    },

    user() {
      return this.$store.state.auth.user;
    },

    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },

  methods: {
    ...mapMutations({
      logout: "auth/logout"
    }),

    async onLogout() {
      await this.$apolloHelpers.onLogout();
      this.logout();
    },

    eMenu(e) {
      // console.log('get params', e);
      return this.$router.push(e);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>