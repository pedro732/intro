<template>
  <div id="app">
    <IntroMetodoCientifico v-if="mostrarIntro" @intro-finalizada="mostrarIntro = false"/>

    <div v-show="!mostrarIntro">
      <BarraNavegacion />
      <CarruselApi/>
      <VistaTarjeta/>
      <inteligencia-artificial/>
      <IndicadoresEconomicos/>
      <FotoDelDia/>
      <NoticiaDelDia/>
      <PieDePagina/>
    </div>
  </div>
</template>

<script>
import BarraNavegacion from '../components/barranavegacion.vue'
import CarruselApi from '../components/carruselApi.vue'
import VistaTarjeta from '../components/tarjetas.vue'
import InteligenciaArtificial from '@/components/InteligenciaArtificial.vue'
import IndicadoresEconomicos from '../components/indicadores.vue'
import FotoDelDia from '../components/FotodelDia.vue'
import NoticiaDelDia from '../components/NoticiaDelDia.vue'
import PieDePagina from '../components/PieDePagina.vue'
import IntroMetodoCientifico from '../components/IntroMetodoCientifico.vue'

export default {
  name: 'CienciaIntro',
  components: {
    BarraNavegacion,
    CarruselApi,
    VistaTarjeta,
    IndicadoresEconomicos,
    FotoDelDia,
    NoticiaDelDia,
    PieDePagina,
    InteligenciaArtificial,
    IntroMetodoCientifico
  },
  data() {
    return {
      mostrarIntro: true
    }
  }
}
</script>
