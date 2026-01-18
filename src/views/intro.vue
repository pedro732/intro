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
      @abrirEsquema="mostrarEsquema = true"
      @cerrarEtapas="mostrarEtapas = false"
      @ecosistemas="mostrarEcosistemas = true"
    />

    <!-- MODAL Ecosistemas -->
    <EcosistemasModal
      :visible="mostrarEcosistemas"
      @cerrar="cerrarEcosistemas"
      @abrirEcosistemas2="mostrarEcosistemas2 = true"
    />

    <!-- MODAL Ecosistemas2 -->
    <EcosistemasModal2
      :visible="mostrarEcosistemas2"
      @cerrar="mostrarEcosistemas2 = false"
      @cerrarTodos="cerrarTodosModales"
    />

    <!-- MODAL EsquemaMetodo -->
    <EsquemaMetodo
      :visible="mostrarEsquema"
      @cerrar="cerrarEsquema"
    />

    <!-- Página principal -->
    <div v-show="!mostrarIntro && !mostrarEtapas && !mostrarEcosistemas && !mostrarEcosistemas2 && !mostrarEsquema">
      <BarraNavegacion />
      <CarruselApi />
      <VistaTarjeta/>
      <inteligencia-artificial/>
      <!-- Indicadores Económicos removido por ser lento -->
      <!-- FotoDelDia removido - demora mucho en iPhone y bloquea -->
      <NoticiaDelDia/>
      <PieDePagina/>
    </div>
  </div>
</template>

<script>
import BarraNavegacion from '../components/barranavegacion.vue'
import VistaTarjeta from '../components/tarjetas.vue'
import PieDePagina from '../components/PieDePagina.vue'
import IntroMetodoCientifico from '../components/IntroMetodoCientifico.vue'
import EtapasMetodoCientifico from '../components/EtapasMetodoCientifico.vue'
import EcosistemasModal from '../components/EcosistemasModal.vue'
import EcosistemasModal2 from '../components/EcosistemasModal2.vue'
import EsquemaMetodo from '../components/EsquemaMetodo.vue'

// Importar todos los componentes normalmente
import CarruselApi from '../components/carruselApi.vue'
import InteligenciaArtificial from '@/components/InteligenciaArtificial.vue'
// import IndicadoresEconomicos from '../components/indicadores.vue' // REMOVIDO
// import FotoDelDia from '../components/FotodelDia.vue' // REMOVIDO - demora mucho en iPhone
import NoticiaDelDia from '../components/NoticiaDelDia.vue'

export default {
  name: 'CienciaIntro',
  components: {
    BarraNavegacion,
    CarruselApi,
    VistaTarjeta,
    // IndicadoresEconomicos, // REMOVIDO
    // FotoDelDia, // REMOVIDO - demora mucho en iPhone
    NoticiaDelDia,
    PieDePagina,
    InteligenciaArtificial,
    IntroMetodoCientifico,
    EtapasMetodoCientifico,
    EcosistemasModal,
    EcosistemasModal2,
    EsquemaMetodo
  },
  data() {
    return {
      mostrarIntro: true,
      mostrarEtapas: false,
      mostrarEcosistemas: false,
      mostrarEcosistemas2: false,
      mostrarEsquema: false
    }
  },
  methods: {
    cerrarEcosistemas() {
      this.mostrarEcosistemas = false
      this.mostrarEtapas = false
      this.mostrarIntro = false
    },
    cerrarEsquema() {
      console.log('cerrarEsquema called, mostrarEsquema antes:', this.mostrarEsquema)
      this.mostrarEsquema = false
      console.log('cerrarEsquema called, mostrarEsquema después:', this.mostrarEsquema)
    },
    cerrarTodosModales() {
      this.mostrarIntro = false
      this.mostrarEtapas = false
      this.mostrarEcosistemas = false
      this.mostrarEcosistemas2 = false
      this.mostrarEsquema = false
    }
  }
}
</script>