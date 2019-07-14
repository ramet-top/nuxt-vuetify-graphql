<template>
  <div>
    <v-carousel>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>
    
    <v-container>      
      <New />   
      <Course/>
      

    </v-container>
  </div>
</template>
<script>
import New from "~/components/publicComponents/news";
import Course from "~/components/publicComponents/course";

export default {
  head() {
    return {
      title: "Welcaome"
    };
  },

 

  components: {
    New,
    Course
  },

  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
  }
};
</script>