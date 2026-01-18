# File: src/components/carruselApi.vue
<template>
  <div class="carrusel-api-container">
    <h2>Imágenes de Pexels</h2>

    <div v-if="isLoading" class="loading-indicator">Cargando imágenes...</div>
    <div v-else-if="error" class="error-message">Error al cargar imágenes: {{ error }}</div>
    <div v-else-if="items.length === 0" class="no-images-message">No se encontraron imágenes para mostrar.</div>

    <carousel 
      v-else 
      :autoplay="15000" 
      :wrap-around="true"
      :items-to-show="1"
      :transition="400"
    >
      <slide v-for="item in items" :key="item.id">
        <div class="slide-content">
          <img
            :src="item.image"
            :srcset="item.image"
            class="d-block w-100"
            :alt="item.alt || 'Imagen de Pexels'"
            loading="lazy"
            decoding="async"
          />
          <div v-if="item.alt" class="carousel-caption">
            <p>{{ item.alt }}</p>
          </div>
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  name: 'VistaCarruselApi',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  data() {
    return {
      items: [],
      isLoading: true,
      error: null,
      isMobile: false,
    };
  },
  mounted() {
    // Detectar si es móvil
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', this.handleResize);
    
    // Cargar imágenes
    this.fetchImagesFromNetlifyFunction();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },
    async fetchImagesFromNetlifyFunction() {
      this.isLoading = true;
      this.error = null;
      this.items = [];

      try {
        const controller = new AbortController();
        // En móvil usar timeout más corto
        const timeout = this.isMobile ? 5000 : 8000;
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch('/.netlify/functions/pexels-images', {
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Error HTTP! estado: ${response.status}`);
        }

        if (data.images && data.images.length > 0) {
          // En móvil: máximo 4 imágenes, en desktop: máximo 8
          const maxImages = this.isMobile ? 4 : 8;
          this.items = data.images.slice(0, maxImages);
        } else {
          console.warn('Netlify Function: No images returned.');
          this.items = [];
        }

      } catch (err) {
        console.error('Error al obtener imágenes:', err);
        if (err.name === 'AbortError') {
          this.error = 'Timeout al cargar imágenes';
        } else {
          this.error = 'No se pudieron cargar las imágenes';
        }
        this.items = [];
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.carrusel-api-container {
    margin: 30px auto;
    max-width: 900px;
    padding: 20px;
    background-color: #e9f7ef;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    overflow: visible;
    position: relative;
}

.carrusel-api-container h2 {
    text-align: center;
    color: #28a745;
    margin-bottom: 20px;
}

:deep(.carousel__viewport) {
  position: relative;
  width: 100%;
}

:deep(.carousel) {
  position: relative;
}

.carousel__slide {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
}

.slide-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
}

.carousel__slide img {
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  will-change: transform;
  display: block;
}

/* Altura responsiva */
@media (min-width: 769px) {
  .carousel__slide img {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .carousel__slide img {
    height: 250px;
  }
}

.carousel__slide:hover img {
  transform: scale(1.05);
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 1rem;
  z-index: 5;
}

.carousel-caption p {
    margin: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

/* Estilos para los botones de navegación */
:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #28a745;
  color: #28a745;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex !important;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background-color: #28a745;
  color: white;
  transform: scale(1.1);
}

:deep(.carousel__prev:active),
:deep(.carousel__next:active) {
  transform: scale(0.95);
}

/* Estilos para la paginación */
:deep(.carousel__pagination) {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
  padding: 10px 0;
  position: relative;
  z-index: 8;
}

:deep(.carousel__pagination-button) {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(40, 167, 69, 0.3);
  border: 2px solid #28a745;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

:deep(.carousel__pagination-button.carousel__pagination-button--active) {
  background-color: #28a745;
  width: 16px;
  height: 16px;
  transform: scale(1.2);
}

:deep(.carousel__pagination-button:hover) {
  background-color: rgba(40, 167, 69, 0.6);
}

.loading-indicator,
.error-message,
.no-images-message {
    text-align: center;
    font-size: 1.2rem;
    margin: 50px 0;
}

.loading-indicator {
    color: #007bff;
}

.error-message {
    color: #dc3545;
}

.no-images-message {
    color: #6c757d;
}
</style>
