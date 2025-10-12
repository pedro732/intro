<template>
  <div id="app">
    <!-- INTRO inicial -->
    <IntroMetodoCientifico
      v-if="mostrarIntro"
      @intro-finalizada="mostrarIntro = false; mostrarEtapas = true"
    />

    <!-- MODAL Etapas -->
    <EtapasMetodoCientifico
      :visible="mostrarEtapas"
      @continuar="mostrarEtapas = false"
      @ecosistemas="mostrarEcosistemas = true"
    />

    <!-- MODAL Ecosistemas -->
    <EcosistemasModal
      :visible="mostrarEcosistemas"
      @cerrar="cerrarEcosistemas"
    />

    <!-- Página principal -->
    <div v-show="!mostrarIntro && !mostrarEtapas && !mostrarEcosistemas">
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
import EtapasMetodoCientifico from '../components/EtapasMetodoCientifico.vue'
import EcosistemasModal from '../components/EcosistemasModal.vue'

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
    IntroMetodoCientifico,
    EtapasMetodoCientifico,
    EcosistemasModal
  },
  data() {
    return {
      mostrarIntro: true,
      mostrarEtapas: false,
      mostrarEcosistemas: false
    }
  },
  methods: {
    cerrarEcosistemas() {
      this.mostrarEcosistemas = false
      this.mostrarEtapas = false
      this.mostrarIntro = false
    }
  }
}
</script>
