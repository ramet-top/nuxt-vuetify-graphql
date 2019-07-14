<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-toolbar dark color="green lighten-2">
          <v-toolbar-title><v-icon>lock</v-icon> ล็อกอินเข้าสู่ระบบ</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-form
            autocomplete="on"
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="onSubmit"
            v-if="!isAuthenticated"
          >
            <v-text-field
              v-model="formLogin.email"
              :rules="emailRules"
              label="E-mail"
              required
              :autofocus="true"
            ></v-text-field>
            <v-text-field
              v-model="formLogin.password"
              :counter="10"
              :rules="passWordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>

            <v-checkbox v-model="checkbox" label="Remember Me"></v-checkbox>

            <v-btn round :disabled="!valid" color="green darken-3" type="submit">
              <v-icon>lock</v-icon>login
            </v-btn>
          </v-form>
          <div v-else>
            <h1>You auth now :: {{ checkAuth }}</h1>
            {{ userdetail.firsname }}
            <h2>checkbox = {{ checkbox }}</h2>
            <br />
            <v-btn @click="onLogout">Logout</v-btn>
            <br />
            <nuxt-link to="/">
              <v-btn>Home</v-btn>
            </nuxt-link>
          </div>
          <div v-if="successfulData">{{successfulData}}</div>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import
import { mapMutations } from "vuex";
import authenUser from "../graphql/authenticateUser.gql";

export default {
  head() {
    return {
      title: "Login Csbsru"
    };
  },

  //  middleware: "isAuth",

  data() {
    return {
      // auth form
      formLogin: {
        email: "",
        password: ""
      },
      isAuthenticated: false,
      submitting: false,
      error: null,
      successfulData: null,

      // validate form
      valid: true,
      passWordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password must be more than 8 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        // v => /.+@.+/.test(v) || "E-mail must be valid"

        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      checkbox: false
    };
  },

  mounted() {
    this.isAuthenticated = !!this.$apolloHelpers.getToken();
  },

  computed: {
    checkAuth() {
      return this.$store.getters["auth/checkAuth"];
    },
    userdetail() {
      return this.$store.state.auth.user;
    }
  },

  methods: {
    ...mapMutations({
      setUser: "auth/setUser",
      logout: "auth/logout"
    }),
    async onSubmit() {
      // console.log("validator", this.$validator);
      this.checkBeforLogin();
    },
    async onLogout() {
      await this.$apolloHelpers.onLogout();
      this.isAuthenticated = false;
      this.logout();
    },

    async checkBeforLogin() {
      if (this.$refs.form.validate()) {
        console.log("validata = true");
        try {
          // this.validate();
          this.submitting = true;
          const formLogin = this.formLogin;
          const res = await this.$apollo
            .mutate({
              mutation: authenUser,
              variables: formLogin
            })
            .then(({ data }) => data && data.login);
          await this.$apolloHelpers.onLogin(res.token, undefined, {
            expires: 7
          });
          this.successfulData = res;
          this.isAuthenticated = true;

          this.setUser(res.user);
          console.log(res.user);
          //  this.$router.go(-1)
          this.$router.replace("/");
        } catch (e) {
          console.error(e);
          this.error = e;
        }
      } else {
        console.log("validata not");
      }
    }
  }
};
</script>

