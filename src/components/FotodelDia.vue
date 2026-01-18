<template>
    <div class="foto-del-dia-container">
      <h3>Foto del Día</h3>
      <img 
        v-if="photo" 
        :src="photo.urls.small" 
        :alt="photo.alt_description || 'Foto del día'" 
        class="img-fluid"
        loading="lazy"
        decoding="async"
      >
      <div v-else class="placeholder">
        Cargando foto...
      </div>
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
    mounted() {
      // Usar mounted en lugar de created para no bloquear
      this.loadPhoto();
    },
    methods: {
      async loadPhoto() {
        try {
          // Timeout muy corto - 3 segundos
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
            timeout: 3000  // Timeout después de 3 segundos
          });
          if (response.data && response.data.length > 0) {
            this.photo = response.data[0];
          }
        } catch (error) {
          console.warn('No se pudo cargar foto del día:', error.message);
          // No mostrar error, solo silenciarlo
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .foto-del-dia-container {
    margin: 30px auto;
    max-width: 800px;
    padding: 20px;
    text-align: center;
  }

  h3 {
    color: #28a745;
    margin-bottom: 20px;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .placeholder {
    padding: 40px;
    background-color: #f0f0f0;
    border-radius: 8px;
    color: #666;
  }
  </style>