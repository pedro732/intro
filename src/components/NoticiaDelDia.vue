# File: src/components/NoticiaDelDia.vue
<template>
    <div class="noticia-container">
        <h2>Noticias de New York Times</h2>
        <p>Selecciona el periodo: 1, 7 o 30 días, para acceder a las noticias de New York Times</p>
      <form @submit.prevent="buscarNoticias" class="search-form">
        <select v-model="periodo" :disabled="isLoading">
          <option value="1">1 día</option>
          <option value="7">7 días</option>
          <option value="30">30 días</option>
        </select>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Cargando...' : 'Buscar' }}
        </button>
      </form>
      <p v-if="error" class="error-text">{{ error }}</p>
      <div class="card" v-for="(noticia, index) in noticias" :key="index">
        <h5 class="card-title">{{ noticia.title }}</h5>
        <p class="card-text">{{ noticia.abstract }}</p>
        <a :href="noticia.url" class="btn btn-primary" target="_blank">Leer más</a>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NoticiaDelDia',
  data() {
    return {
      periodo: '1',
      noticias: [],
      isLoading: false,
      error: null
    }
  },
  methods: {
    async buscarNoticias() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/mostpopular/v2/emailed/${this.periodo}.json?api-key=uH8o2jLEGywyqdBAZ95JO7L9sA9ATN5x`,
          {
            timeout: 5000  // Timeout de 5 segundos
          }
        );
        this.noticias = response.data.results || [];
      } catch (error) {
        console.warn('Error al obtener noticias:', error.message);
        this.error = 'No se pudieron cargar las noticias. Intenta de nuevo.';
        this.noticias = [];
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
/* Estilos para el contenedor principal */
.noticia-container {
  background-color: #fff3cd; /* Un color de fondo amarillo claro para destacar (color de alerta de Bootstrap warning) */
  padding: 30px; /* Espacio interno */
  margin: 30px auto; /* Centra el bloque y añade margen arriba/abajo */
  max-width: 800px; /* Ancho máximo */
  border: 1px solid #ffeeba; /* Borde ligero */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Sombra suave */
  font-family: sans-serif; /* Fuente legible */
}

/* Estilos para el título */
.noticia-container h2 {
    text-align: center; /* Centra el título */
    color: #856404; /* Color oscuro para el título (color de texto de alerta warning) */
    margin-bottom: 20px; /* Espacio debajo del título */
}

/* Estilos para el formulario de búsqueda */
.search-form {
  display: flex; /* Usa flexbox para alinear elementos */
  gap: 10px; /* Espacio entre select y button */
  margin-bottom: 20px; /* Espacio debajo del formulario */
  justify-content: center; /* Centra los elementos del formulario */
  align-items: center; /* Alinea verticalmente */
}

.search-form select,
.search-form button {
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 1rem;
}

.search-form select {
    border: 1px solid #ced4da;
}

.search-form button {
    background-color: #007bff; /* Azul primario */
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-form button:hover {
    background-color: #0056b3;
}


/* Estilos existentes para las tarjetas de noticias */
.card {
  margin-bottom: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.125); /* Borde de tarjeta por defecto de Bootstrap */
  border-radius: 0.25rem; /* Bordes redondeados por defecto de Bootstrap */
  padding: 1rem; /* Espacio interno de la tarjeta */
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); /* Sombra suave */
}

.card-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    color: #343a40; /* Color oscuro para el título de la tarjeta */
}

.card-text {
    margin-bottom: 1rem;
    color: #6c757d; /* Color gris para el texto de la tarjeta */
}

.btn-primary {
    display: inline-block;
    font-weight: 400;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #007bff;
    border: 1px solid #007bff;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    text-decoration: none; /* Asegura que no tenga subrayado */
}

.btn-primary:hover {
    color: #fff;
    background-color: #0056b3;
    border-color: #004085;
}

/* Estilos originales que pueden ser redundantes o necesitar ajuste */
/*
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
*/
/* El estilo .search-form ya fue añadido y modificado arriba */
/*
.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}
*/
</style>
