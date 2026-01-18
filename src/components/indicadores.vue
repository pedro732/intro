<template>
    <div>
      <h1 class="text-center">Indicadores Económicos</h1>
      <div class="d-flex justify-content-around flex-wrap">
        <div class="card" style="width: 18rem;" v-for="(indicator, index) in indicators" :key="index">
          <div class="card-body">
            <h5 class="card-title">{{ indicator.nombre }}</h5>
            <p class="card-text">{{ indicator.simbolo }}{{ indicator.valor }}</p>
          </div>
        </div>
        <!-- Placeholder mientras carga -->
        <div v-if="indicators.length === 0" class="text-muted" style="padding: 20px;">Cargando indicadores...</div>
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
        isMobile: false,
      };
    },
    mounted() {
      // Detectar si es móvil
      this.isMobile = window.innerWidth <= 768;
      window.addEventListener('resize', this.handleResize);
      
      // Cargar indicadores de forma no bloqueante
      this.loadIndicators();
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        this.isMobile = window.innerWidth <= 768;
      },
      async loadIndicators() {
        try {
          const indicatorsNames = ['uf', 'dolar', 'euro', 'utm'];
          const symbols = ['$', '$', '€', '$'];
          
          // Crear promesas con timeout real usando Promise.race()
          const timeout = this.isMobile ? 2000 : 3000; // Reducido a 2-3 segundos
          
          const requests = indicatorsNames.map((name, index) => {
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('timeout')), timeout)
            );
            
            const fetchPromise = axios.get(`https://mindicador.cl/api/${name}`, { 
              timeout: timeout
            }).then(res => ({
              data: res.data,
              index: index
            }));
            
            return Promise.race([fetchPromise, timeoutPromise])
              .catch((err) => {
                console.warn(`Timeout/Error cargando ${name}:`, err.message);
                return null;
              });
          });
          
          // No esperar a todas - mostrar conforme lleguen
          const results = await Promise.allSettled(requests);
          
          this.indicators = results
            .map((result, index) => {
              if (result.status === 'fulfilled' && result.value) {
                const { data } = result.value;
                if (data && data.serie && data.serie.length > 0) {
                  return {
                    nombre: data.nombre,
                    valor: data.serie[0].valor,
                    simbolo: symbols[index]
                  };
                }
              }
              return null;
            })
            .filter(item => item !== null);
          
          // Si no hay datos, mostrar algo para el usuario
          if (this.indicators.length === 0) {
            console.warn('No indicators loaded, retrying...');
          }
        } catch (error) {
          console.error('Error al cargar indicadores:', error);
        }
      },
      async getIndicator() {
        try {
          const dateParts = this.selectedDate.split('-');
          const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
          
          const timeout = this.isMobile ? 3000 : 5000;
          const response = await axios.get(`https://mindicador.cl/api/${this.selectedIndicator}/${formattedDate}`, { timeout });
          
          const data = response.data;
          if (data.serie && data.serie.length > 0) {
            this.selectedIndicatorData = {
              nombre: data.nombre,
              valor: data.serie[0].valor,
              simbolo: '$'
            };
          } else {
            console.error('No data available for this date and indicator');
            alert('No hay datos disponibles para esa fecha');
            return;
          }
          var modal = new Modal(document.getElementById('indicadorModal'))
          modal.show()
        } catch (error) {
          console.error('Error al obtener indicador:', error);
          alert('Error al obtener el indicador. Intenta nuevamente.');
        }
      }
    }
  };
  </script>