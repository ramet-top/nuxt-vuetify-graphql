<template>
  <div>    
    <v-toolbar tabs>
      <h1>News Update</h1>
      <template v-slot:extension>
        <v-tabs fixed-tabs color="transparent">          
          <v-tabs-slider color="black"></v-tabs-slider>          
          <v-tab href="#tabs-1" class="primary--text">
            <v-icon size="34">fiber_new</v-icon>
            <h4>ข่าว</h4>
          </v-tab>
          <v-tab href="#tabs-2" class="primary--text">
            <v-icon size="34">photo</v-icon>
            <h4>ภาพกิจกรรม</h4>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

   <!-- <v-tab-item
      v-for="i in 3"
      :key="i"
      :value="'tab-' + i"
    >
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tab-item> -->

   
  </div>
</template>

<script>
// import VuetifyLogo from "~/components/VuetifyLogo";

export default {
  name: 'News',
  data() {
    return {      
      tabs: null,  
      posts: [
        {
          title:"ข่าว", 
          text: "intro news",
          icon: 'fiber_new',         
        },
        {
          title:"ภาพกิจกรรม",
          text: "photos",
          icon: 'photo',          
        }
      ],    
      text: 'test',
    };
  },

  methods:{
    // eTab(e){
    //  console.log('msg',e.id);   
    // }
  }
};
</script>

<style lang="scss" scoped>
</style>