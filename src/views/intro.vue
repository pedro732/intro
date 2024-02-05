<template>
    <div id="app">
      <BarraNavegacion />
      <VistaCarrusel />
      <VistaTarjeta/>
      <IndicadoresEconomicos/>
      <FotoDelDia/>
      <NoticiaDelDia/>
      <PieDePagina/>
      
      <!-- resto de tu código aquí -->
      
    </div>
  </template>
  
  <script>
  import BarraNavegacion from '../components/barranavegacion.vue'
  import VistaCarrusel from '../components/carrusel.vue'
  import VistaTarjeta from '../components/tarjetas.vue'
  import IndicadoresEconomicos from '../components/indicadores.vue'
  import FotoDelDia from '../components/FotodelDia.vue'
  import NoticiaDelDia from '../components/NoticiaDelDia.vue'
  import PieDePagina from '../components/PieDePagina.vue'
  
  export default {
    name: 'CienciaIntro',
    components: {
      BarraNavegacion,
      VistaCarrusel,
      VistaTarjeta,
      IndicadoresEconomicos,
      FotoDelDia,
      NoticiaDelDia,
      PieDePagina

      
    }
  }
  </script>
  <style>
  body, h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
#app > IndicadoresEconomicos {
  margin-bottom: 20px;
}
</style>