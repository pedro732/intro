# File: src/components/carruselApi.vue
<template>
  <div class="carrusel-api-container">
    <h2>Imágenes de Pexels</h2>

    <div v-if="isLoading" class="loading-indicator">Cargando imágenes...</div>
    <div v-else-if="error" class="error-message">Error al cargar imágenes: {{ error }}</div>
    <div v-else-if="items.length === 0" class="no-images-message">No se encontraron imágenes para mostrar.</div>

    <carousel v-else :autoplay="15000" :wrap-around="true">
      <slide v-for="item in items" :key="item.id">
        <div class="slide-content"> <!-- Wrapper para la imagen y el caption -->
          <img
            :src="item.image"
            class="d-block w-100"
            :alt="item.alt || 'Imagen de Pexels'"
            loading="lazy"
          />
          <!-- Caption para mostrar el texto -->
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
    };
  },
  async mounted() {
    await this.fetchImagesFromNetlifyFunction();
  },
  methods: {
    async fetchImagesFromNetlifyFunction() {
      this.isLoading = true;
      this.error = null;
      this.items = [];

      try {
        const response = await fetch('/.netlify/functions/pexels-images');

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Error HTTP! estado: ${response.status}`);
        }

        if (data.images && data.images.length > 0) {
          this.items = data.images;
        } else {
           console.warn('Netlify Function: No images returned.');
           this.items = [];
        }

      } catch (err) {
        console.error('Error al obtener imágenes de la función Netlify:', err);
        this.error = 'No se pudieron cargar las imágenes.';
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
    overflow: hidden; /* Importante para que el zoom no se salga */
}

.carrusel-api-container h2 {
    text-align: center;
    color: #28a745;
    margin-bottom: 20px;
}

/* Asegura que cada slide tenga posición relativa para posicionar el caption */
.carousel__slide {
  position: relative; /* Necesario para posicionar el caption absoluto */
  display: flex; /* Usar flexbox para centrar contenido si es necesario */
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Oculta cualquier parte de la imagen que se salga al hacer zoom */
}

.slide-content {
    position: relative; /* Contenedor para la imagen y el caption */
    width: 100%;
    height: 100%; /* O la altura deseada */
    display: flex;
    justify-content: center;
    align-items: center;
}


.carousel__slide img {
  height: 600px;  /* Ajusta este valor según tus necesidades */
  width: 100%; /* Asegura que la imagen ocupe el ancho del contenedor */
  object-fit: cover;
  transition: transform 0.5s ease; /* Transición suave para el zoom */
}

/* Efecto de zoom al pasar el ratón */
.carousel__slide:hover img {
  transform: scale(1.05); /* Aumenta el tamaño de la imagen un 5% */
}

/* Estilos para el caption */
.carousel-caption {
  position: absolute; /* Posiciona el caption sobre la imagen */
  bottom: 0; /* Alinea en la parte inferior */
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Fondo semi-transparente oscuro */
  color: white; /* Texto blanco */
  padding: 15px; /* Espacio interno */
  text-align: center; /* Centra el texto */
  font-size: 1rem; /* Tamaño de fuente */
  /* Opcional: Ocultar por defecto y mostrar al pasar el ratón */
  /* opacity: 0; */
  /* transition: opacity 0.3s ease; */
}

/* Opcional: Mostrar caption solo al pasar el ratón */
/*
.carousel__slide:hover .carousel-caption {
    opacity: 1;
}
*/

.carousel-caption p {
    margin: 0; /* Elimina el margen por defecto del párrafo */
}


/* Estilos para indicadores */
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

/* Estilos para los botones de navegación y paginación si quieres personalizarlos */
/*
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
*/
</style>
