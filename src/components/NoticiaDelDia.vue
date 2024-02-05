<template>
    <div class="container">
        <p>Selecciona el periodo: 1, 7 o 30 días, para acceder a las noticias de New York Times</p>
      <form @submit.prevent="buscarNoticias">
        <select v-model="periodo">
          <option value="1">1 día</option>
          <option value="7">7 días</option>
          <option value="30">30 días</option>
        </select>
        <button type="submit">Buscar</button>
      </form>
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
      noticias: []
    }
  },
  methods: {
    async buscarNoticias() {
      const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/emailed/${this.periodo}.json?api-key=uH8o2jLEGywyqdBAZ95JO7L9sA9ATN5x`);
      //console.log(response.data);
      this.noticias = response.data.results;
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}
</style>