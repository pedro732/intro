<template>
  <div class="container mt-5 text-center">
    <h2 class="mb-4">Filosofía de la Ciencia</h2>

    <!-- Caja de búsqueda -->
    <div class="input-group mb-4 w-75 mx-auto">
      <input
        v-model="busqueda"
        type="text"
        class="form-control"
        placeholder="Escribe el nombre del filósofo o científico de tu interés..."
        @input="buscarFilosofo"
      />
    </div>

    <!-- Si existe el filósofo -->
    <div v-if="filosofoEncontrado" class="card mx-auto shadow p-3" style="max-width: 500px;">
      <img :src="filosofoEncontrado.imagen" class="card-img-top rounded" alt="imagen del filósofo" />
      <div class="card-body">
        <h3 class="card-title">{{ filosofoEncontrado.nombre }}</h3>
        <p class="card-text">{{ filosofoEncontrado.contribucion }}</p>
      </div>
    </div>

    <!-- Si no se encuentra -->
    <div v-else-if="busqueda.length > 0" class="alert alert-warning mt-4 w-75 mx-auto">
      <strong>No se encontró a "{{ busqueda }}"</strong><br />
      ¿Quizás buscabas a alguno de estos?
      <ul class="list-unstyled mt-2">
        <li v-for="(nombre, index) in sugerencias" :key="index" class="text-primary">
          {{ nombre }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import filosofosData from '@/assets/filosofos.json'

export default {
  name: 'VistaTarjeta',
  data() {
    return {
      filosofos: filosofosData,
      busqueda: '',
      filosofoEncontrado: null,
      sugerencias: []
    }
  },
  methods: {
    buscarFilosofo() {
      const termino = this.busqueda.toLowerCase().trim()

      if (termino === '') {
        this.filosofoEncontrado = null
        this.sugerencias = []
        return
      }

      const encontrado = this.filosofos.find(f =>
        f.nombre.toLowerCase().includes(termino)
      )

      if (encontrado) {
        this.filosofoEncontrado = encontrado
        this.sugerencias = []
      } else {
        this.filosofoEncontrado = null
        // Mostrar los nombres disponibles como sugerencia
        this.sugerencias = this.filosofos.map(f => f.nombre)
      }
    }
  }
}
</script>

<style scoped>
.card {
  display: inline-block; /* Hace que el tamaño se ajuste al contenido */
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: auto; /* El ancho se ajusta al contenido */
  height: auto; /* La altura crece según texto o imagen */
  max-width: 90%; /* Evita que crezca demasiado en pantallas grandes */
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
.card-img-top {
  width: 100%;
  height: auto; /* Se ajusta proporcionalmente */
  border-radius: 12px;
  object-fit: contain; /* Muestra toda la imagen sin recortar */
}

.alert {
  font-size: 1.1em;
}
input.form-control {
  border-radius: 10px;
  padding: 12px;
  font-size: 1rem;
}
</style>
