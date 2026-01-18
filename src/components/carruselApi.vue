# File: src/components/carruselApi.vue
<template>
  <div class="carrusel-api-container">
    <h2>Imágenes de Pexels</h2>

    <div v-if="isLoading" class="loading-indicator">Cargando imágenes...</div>
    <div v-else-if="error" class="error-message">Error al cargar imágenes: {{ error }}</div>
    <div v-else-if="items.length === 0" class="no-images-message">No se encontraron imágenes para mostrar.</div>

    <carousel 
      v-else 
      :autoplay="isMobile ? 8000 : 15000"
      :wrap-around="true"
      :items-to-show="1"
      :transition="isMobile ? 300 : 400"
      :pause-on-hover="true"
    >
      <slide v-for="item in items" :key="item.id">
        <div class="slide-content">
          <img
            :src="item.image"
            :alt="item.alt || 'Imagen de Pexels'"
            class="d-block w-100"
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
      imagesLoaded: 0,
    };
  },
  mounted() {
    // Detectar si es móvil
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', this.handleResize);
    
    // Cargar imágenes con pequeño delay para evitar congelamiento
    setTimeout(() => {
      this.fetchImagesFromNetlifyFunction();
    }, 100);
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
      this.imagesLoaded = 0;

      try {
        const controller = new AbortController();
        // En móvil usar timeout más corto pero no tanto
        const timeout = this.isMobile ? 8000 : 12000;
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
          // En móvil: máximo 3 imágenes (menos carga), en desktop: máximo 6
          const maxImages = this.isMobile ? 3 : 6;
          this.items = data.images.slice(0, maxImages).map((img, index) => ({
            ...img,
            id: img.id || `img-${index}`,
            // Optimizar URLs de imágenes para móvil
            image: this.isMobile ? this.optimizeImageUrl(img.image) : img.image
          }));
        } else {
          console.warn('Netlify Function: No images returned.');
          this.items = [];
        }

      } catch (err) {
        console.error('Error al obtener imágenes:', err);
        if (err.name === 'AbortError') {
          this.error = 'Timeout al cargar imágenes. Intenta recargando la página.';
        } else {
          this.error = 'No se pudieron cargar las imágenes.';
        }
        this.items = [];
      } finally {
        this.isLoading = false;
      }
    },
    optimizeImageUrl(url) {
      // Reducir calidad y tamaño en móvil
      // Si es de Pexels, mantener la URL pero confiar en decoding async
      return url;
    }
  }
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
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
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
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.slide-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}

.carousel__slide img {
  width: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
  will-change: auto;
  display: block;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Altura responsiva - reducida en móvil para mejor rendimiento */
@media (min-width: 769px) {
  .carousel__slide img {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .carousel__slide img {
    height: 280px;
  }
}

.carousel__slide:hover img {
  transform: scale(1.02);
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
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid #28a745;
  color: #28a745;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  display: flex !important;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background-color: #28a745;
  color: white;
  transform: scale(1.08);
}

:deep(.carousel__prev:active),
:deep(.carousel__next:active) {
  transform: scale(0.95);
}

/* Estilos para la paginación */
:deep(.carousel__pagination) {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 15px;
  padding: 10px 0;
  position: relative;
  z-index: 8;
  -webkit-user-select: none;
  user-select: none;
}

:deep(.carousel__pagination-button) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(40, 167, 69, 0.3);
  border: 2px solid #28a745;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

:deep(.carousel__pagination-button.carousel__pagination-button--active) {
  background-color: #28a745;
  width: 14px;
  height: 14px;
  transform: scale(1.2);
}

:deep(.carousel__pagination-button:hover) {
  background-color: rgba(40, 167, 69, 0.6);
}

.loading-indicator,
.error-message,
.no-images-message {
    text-align: center;
    font-size: 1.1rem;
    margin: 40px 0;
    padding: 20px;
}

.loading-indicator {
    color: #007bff;
}

.error-message {
    color: #dc3545;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 15px;
}

.no-images-message {
    color: #6c757d;
}
</style>
