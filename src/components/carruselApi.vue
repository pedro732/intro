# File: src/components/carruselApi.vue
<template>
  <div class="carrusel-api-container">
    <h2>Imágenes de Pexels</h2>

    <div v-if="isLoading" class="loading-indicator">Cargando imágenes...</div>
    <div v-else-if="error" class="error-message">Error al cargar imágenes: {{ error }}</div>
    <div v-else-if="items.length === 0" class="no-images-message">No se encontraron imágenes para mostrar.</div>

    <carousel v-else :autoplay="15000" :wrap-around="true">
      <slide v-for="item in items" :key="item.id">
        <img
          :src="item.image"
          class="d-block w-100"
          :alt="item.alt || 'Imagen de Pexels'"
          loading="lazy"
        />
        <!-- Puedes añadir un caption si quieres mostrar el texto alternativo u otra info -->
        <!-- <div class="carousel-caption d-none d-md-block">
          <p>{{ item.alt }}</p>
        </div> -->
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
  name: 'VistaCarruselApi', // Nombre diferente para este componente
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  data() {
    return {
      items: [], // Aquí se almacenarán las imágenes obtenidas de la función serverless
      isLoading: true, // Indicador de carga
      error: null, // Para manejar errores
    };
  },
  async mounted() {
    // Llama a la función serverless para obtener imágenes cuando el componente se monta
    await this.fetchImagesFromNetlifyFunction();
  },
  methods: {
    async fetchImagesFromNetlifyFunction() {
      this.isLoading = true;
      this.error = null;
      this.items = []; // Limpiar items anteriores

      try {
        // Llama a tu función serverless de Netlify para Pexels
        const response = await fetch('/.netlify/functions/pexels-images'); // Ruta a la función

        const data = await response.json();

        if (!response.ok) {
          // Manejar errores HTTP reportados por la función
          throw new Error(data.message || `Error HTTP! estado: ${response.status}`);
        }

        if (data.images && data.images.length > 0) {
          this.items = data.images; // Asigna las imágenes obtenidas
        } else {
           console.warn('Netlify Function: No images returned.');
           this.items = [];
        }


      } catch (err) {
        console.error('Error al obtener imágenes de la función Netlify:', err);
        this.error = 'No se pudieron cargar las imágenes.';
        this.items = []; // Asegurarse de que items esté vacío en caso de error
      } finally {
        this.isLoading = false; // Finalizar carga
      }
    }
  }
}
</script>

<style scoped>
/* Puedes reutilizar o adaptar los estilos de tu carrusel anterior */
.carrusel-api-container {
    margin: 30px auto; /* Centrar y añadir margen */
    max-width: 900px; /* Ancho máximo */
    padding: 20px;
    background-color: #e9f7ef; /* Un color de fondo diferente para distinguirlo */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.carrusel-api-container h2 {
    text-align: center;
    color: #28a745; /* Color verde */
    margin-bottom: 20px;
}


.carousel__slide {
  display: initial;
}
.carousel__slide img {
  height: 600px;  /* Ajusta este valor según tus necesidades */
  object-fit: cover;  /* Esto asegura que las imágenes se redimensionen correctamente */
}
/* Si usas caption, adapta los estilos */
/*
.carousel-caption {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
}
.carousel-caption p {
  font-size: 1.2rem;
  color: white;
}
*/

/* Estilos para indicadores */
.loading-indicator,
.error-message,
.no-images-message {
    text-align: center;
    font-size: 1.2rem;
    margin: 50px 0;
}

.loading-indicator {
    color: #007bff; /* Color azul */
}

.error-message {
    color: #dc3545; /* Color rojo */
}

.no-images-message {
    color: #6c757d; /* Color gris */
}
</style>
