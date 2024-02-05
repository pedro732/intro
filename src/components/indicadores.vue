<template>
    <div>
      <h1 class="text-center">Indicadores Económicos</h1>
      <div class="d-flex justify-content-around">
        <div class="card" style="width: 18rem;" v-for="(indicator, index) in indicators" :key="index">
          <div class="card-body">
            <h5 class="card-title">{{ indicator.nombre }}</h5>
            <p class="card-text">{{ indicator.simbolo }}{{ indicator.valor }}</p>
          </div>
        </div>
      </div>
      <p>
        Selecciona uno de los indicadores económicos y la fecha que desea consultar
      </p>
      <form @submit.prevent="getIndicator">
        <select v-model="selectedIndicator">
          <option v-for="indicator in indicatorOptions" :key="indicator" :value="indicator">{{ indicator }}</option>
        </select>
        <input type="date" v-model="selectedDate">
        <button type="submit">Obtener indicador</button>
      </form>
      <div v-if="selectedIndicatorData">
        <h2>{{ selectedIndicatorData.nombre }}</h2>
        <p>{{ selectedIndicatorData.simbolo }}{{ selectedIndicatorData.valor }}</p>
      </div>
       
 <!-- Ventana modal -->
<div class="modal fade" id="indicadorModal" tabindex="-1" aria-labelledby="indicadorModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="indicadorModalLabel">Valor del indicador</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {{ selectedIndicatorData ? selectedIndicatorData.valor : '' }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import {Modal} from 'bootstrap'
  
  export default {
    name: 'IndicadoresEconomicos',
    data() {
      return {
        indicators: [],
        selectedIndicator: '',
        selectedDate: '',
        selectedIndicatorData: null,
        indicatorOptions: ['uf', 'ivp', 'dolar', 'dolar_intercambio', 'euro', 'ipc', 'utm', 'imacec', 'tpm', 'libra_cobre', 'tasa_desempleo', 'bitcoin'],
      };
    },
    async created() {
      const indicatorsNames = ['uf', 'dolar', 'euro', 'utm'];
      const symbols = ['$', '$', '€', '$'];
      const indicatorsData = await Promise.all(
        indicatorsNames.map((name) =>
          axios.get(`https://mindicador.cl/api/${name}`).then((res) => res.data)
        )
      );
      this.indicators = indicatorsData.map((data, index) => ({
        nombre: data.nombre,
        valor: data.serie[0].valor,
        simbolo: symbols[index]
      }));

    },
    methods: {
  async getIndicator() {
    const dateParts = this.selectedDate.split('-');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    const response = await axios.get(`https://mindicador.cl/api/${this.selectedIndicator}/${formattedDate}`);
    const data = response.data;
    if (data.serie && data.serie.length > 0) {
      this.selectedIndicatorData = {
        nombre: data.nombre,
        valor: data.serie[0].valor,
        simbolo: '$'
      };
    } else {
      console.error('No data available for this date and indicator');
    }
    var modal = new Modal(document.getElementById('indicadorModal'))
      modal.show()
  }
}
  };
  </script>