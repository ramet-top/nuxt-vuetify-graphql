<template>
  <v-app>
    <Nav />
    <v-content>     
        <nuxt />      
    </v-content>       
    <Footer />
  </v-app>
</template>

<script>
import Nav  from "~/components/nav/Nav";
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
    Nav,
    Footer
  }, 
};
</script>
