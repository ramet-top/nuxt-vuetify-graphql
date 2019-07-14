<template>
  <v-app>
    <NavAuth />
    <v-content>     
        <nuxt />      
    </v-content>       
    <Footer />
  </v-app>
</template>

<script>
import NavAuth  from "~/components/nav/NavAuth";
import Footer  from "~/components/nav/Footer";

export default {
  data() {
    return {    
      fixed: false,   
      right: true,
      rightDrawer: false,
      // title: "Vuetify.js"
    };
  },
  components:{
    NavAuth,
    Footer
  }, 
};
</script>
