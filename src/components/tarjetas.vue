<template>
    <div class="d-flex justify-content-around">
      <b-card v-for="(card, index) in cards" :key="index" :title="card.title" class="mb-2">
        <b-img :src="card.image" alt="Image" class="mb-3 card-image"></b-img>
        <b-button @click="showModal(index)" variant="primary">Ver</b-button>
        <div class="modal fade" :id="`modal-${index}`" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ card.title }}</h5>
                <button type="button" class="btn-close" @click="hideModal(index)"></button>
              </div>
              <div class="modal-body">
                <p>{{ card.modalContent }}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="hideModal(index)">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </b-card>
    </div>
  </template>
  <script>

  export default {
    name: 'VistaTarjeta',
    data() {
      return {
        cards: [
          { title: 'Rene Descartes', image: 'https://filco.es/uploads/2018/05/top-20officehacks-19-e1524577141234.png', modalContent: 'Una vez conocidas por intuición las proposiciones simples viene el proceso de la síntesis a través de la deducción, que es toda inferencia necesaria de hechos que son conocidos con certeza. ” Pero la intui- ción existe también en el proceso de de- ducción, ya que necesitamos poder ver con claridad cuál de las posibles deduccio- nes es la correcta. ” Es decir, la deducción es una operación, un proceso, el cual de ser correcto debe llevarnos de intuición en intuición, es decir, de verdad en verdad. ' },
          { title: 'Galileo Galilei', image: 'https://pymstatic.com/86086/conversions/galileo-galilei-wide_webp.webp', modalContent: 'Galileo es uno de los científicos más conocidos del mundo, no solo por lo que aportó con sus investigaciones, sino por los grandes debates y conflictos que abrieron sus descubrimientos. Fue el precursor del famoso método científico, es decir: primero observar, experimentar y formular las leyes que expliquen el fenómeno, probarlas observando y volver a empezar, hasta encontrar la solución.' },
          { title: 'Francis Bacon', image: 'https://blogmasonico.com/wp-content/uploads/2023/02/francis-bacon.jpg.webp', modalContent: 'Los hombres de experimentos son como las hormigas, sólo recogen y utilizan lo que han recogido; los pensadores se parecen a las arañas, que construyen telas de su propia sustancia. La abeja, sin embargo, toma un camino intermedio: recoge su material de las flores del jardín y del campo, pero lo transforma y digiere por un poder propio. A diferencia de esto, este es el verdadero negocio de la filosofía; porque no depende exclusiva o principalmente de los poderes de la mente, ni aloja la materia que recoge de la historia natural y de los experimentos mecánicos totalmente en la memoria, tal como la encuentra, sino que la aloja en el intelecto alterada y digerida. Por lo tanto, de una conexión más estrecha y más pura entre estas dos facultades, la experimental y la racional (como nunca se ha hecho), se puede esperar mucho.' },
        ],
        modals: [] // tus modales
    };
  },
  methods: {
    showModal(index) {
      this.modals[index] = new bootstrap.Modal(document.getElementById(`modal-${index}`));
      this.modals[index].show();
    },
    hideModal(index) {
      if (this.modals[index]) {
        this.modals[index].hide();
      }
    }
  }
};
</script> 
<style scoped>
.card-image {
  width: 100%;  
  height: auto; 
}
</style>