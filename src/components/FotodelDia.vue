<template>
    <div class="d-flex justify-content-center">
      <img v-if="photo" :src="photo.urls.regular" :alt="photo.alt_description" class="img-fluid">
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'FotoDelDia',
    data() {
      return {
        photo: null,
      };
    },
    async created() {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        headers: {
          Authorization: 'Client-ID tMyjKmNW96NFkFTI-4yBF6Uylnr8xeO461QeoK4FRr0',
        },
        params: {
          query: 'nature',
          orientation: 'landscape',
          content_filter: 'high',
          count: 1,
        },
      });
      this.photo = response.data[0];
    },
  };
  </script>
  
  <style scoped>
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  </style>