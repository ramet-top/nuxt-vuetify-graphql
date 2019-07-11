<template>
  <v-container>
    <div @submit.prevent="onSubmit" v-if="!isAuthenticated">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="form.email"
          v-validate="'required | email'"         
          label="E-mail"
          data-vv-name="email"
          required
        ></v-text-field>
        <!-- <v-text-field
          v-model="form.email"
          label="E-mail"
          type="email"
          v-validate="'required|max:20'"
        ></v-text-field>-->
        <v-text-field v-model="form.password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit">Login</v-btn>
      </v-form>
    </div>
    <div v-else>
      You auth now
      <br />
      <v-btn @click="onLogout">Logout</v-btn>
    </div>
    <div v-if="successfulData">{{successfulData}}</div>
  </v-container>
</template>

<script>
// import
import authenUser from "../graphql/authenticateUser.gql";


export default {
  head() {
    return {
      title: "Login-page"
    };
  },

  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      isAuthenticated: false,
      submitting: false,
      error: null,
      successfulData: null,     
    } 
  },

  mounted() {
    this.isAuthenticated = !!this.$apolloHelpers.getToken();
    this.$validator.localize('en', this.dictionary);
  },

  methods: {
    async onSubmit() {
      this.$validator.validateAll()
      this.submitting = true;
      const formLogin = this.form;
      try {
        const res = await this.$apollo
          .mutate({
            mutation: authenUser,
            variables: formLogin
          })
          .then(({ data }) => data && data.login);
        await this.$apolloHelpers.onLogin(res.token, undefined, { expires: 7 });
        this.successfulData = res;
        this.isAuthenticated = true;
      } catch (e) {
        console.error(e);
        this.error = e;
      }
    },
    async onLogout() {
      await this.$apolloHelpers.onLogout();
      this.isAuthenticated = false;
    }
  }
};
</script>

