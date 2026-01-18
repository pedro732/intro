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
        @click="openModal"
        :style="{ cursor: isMobile ? 'default' : 'pointer' }"
      >
      <div v-else class="placeholder">
        <p>Esperando foto del día...</p>
      </div>

      <!-- Modal para versión desktop -->
      <div v-if="!isMobile && showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeModal">✕</button>
          <img 
            v-if="photo"
            :src="photo.urls.regular" 
            :alt="photo.alt_description || 'Foto del día'"
            class="modal-image"
          >
        </div>
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
        isMobile: false,
        showModal: false
      };
    },
    mounted() {
      this.isMobile = window.innerWidth <= 768;
      window.addEventListener('resize', this.handleResize);
      this.loadPhoto();
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        this.isMobile = window.innerWidth <= 768;
      },
      openModal() {
        if (!this.isMobile) {
          this.showModal = true;
          document.body.style.overflow = 'hidden';
        }
      },
      closeModal() {
        this.showModal = false;
        document.body.style.overflow = 'auto';
      },
      async loadPhoto() {
        try {
          // Crear un timeout muy agresivo para evitar bloqueos
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout loading photo')), 1500)
          );
          
          const photoPromise = axios.get('https://api.unsplash.com/photos/random', {
            headers: {
              Authorization: 'Client-ID tMyjKmNW96NFkFTI-4yBF6Uylnr8xeO461QeoK4FRr0',
            },
            params: {
              query: 'nature',
              orientation: 'landscape',
              content_filter: 'high',
              count: 1,
            },
            timeout: 1500
          });
          
          // Race: el timeout gana si la foto tarda mucho
          const response = await Promise.race([photoPromise, timeoutPromise]);
          
          if (response.data && !Array.isArray(response.data)) {
            this.photo = response.data;
          } else if (response.data && response.data.length > 0) {
            this.photo = response.data[0];
          }
        } catch (error) {
          // Silenciar el error y permitir que la página cargue
          console.warn('No se pudo cargar foto del día:', error.message);
          // No establecer this.photo para mostrar un estado vacío
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
    transition: transform 0.2s ease;
  }

  .img-fluid:hover {
    transform: scale(1.02);
  }

  .placeholder {
    padding: 40px;
    background-color: #f0f0f0;
    border-radius: 8px;
    color: #666;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background: white;
    border-radius: 8px;
    overflow: hidden;
  }

  .modal-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    font-size: 24px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .close-btn:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 768px) {
    .foto-del-dia-container {
      margin: 20px auto;
      padding: 15px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
    }
  }
  </style>