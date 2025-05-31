# File: src/components/InteligenciaArtificial.vue
<template>
  <div class="ia-container">
    <h2>Pregúntale a la Inteligencia Artificial</h2>

    <div class="input-area">
      <input v-model="userMessage" placeholder="Escribe tu mensaje..." @keyup.enter="sendMessage" :disabled="isLoading">
      <button @click="sendMessage" :disabled="!userMessage.trim() || isLoading">
        {{ isLoading ? 'Enviando...' : 'Enviar a IA' }}
      </button>
    </div>

    <div v-if="isLoading" class="loading-indicator">
      Cargando respuesta...
    </div>

    <!-- Añade ref="responseArea" a este div -->
    <div v-if="iaResponse" class="response-area" ref="responseArea">
      <!-- El texto de la respuesta se insertará aquí -->
      <p>{{ iaResponse }}</p>
      <div class="response-actions">
        <button @click="copyResponse">Copiar</button>
        <button @click="clearResponse">Borrar</button>
      </div>
    </div>

    <p v-if="error" class="error-message">Error: {{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: '',
      iaResponse: null,
      error: null,
      isLoading: false,
    };
  },
  watch: {
    // Observa los cambios en iaResponse
    iaResponse(newValue) {
      // Si hay una nueva respuesta (no nula)
      if (newValue) {
        // Espera a que Vue actualice el DOM
        this.$nextTick(() => {
          // Verifica si MathJax está disponible globalmente
          if (window.MathJax) {
            // Procesa el contenido del área de respuesta específica
            // MathJax.typesetPromise() devuelve una promesa
            window.MathJax.typesetPromise([this.$refs.responseArea])
              .catch((err) => console.error('MathJax typesetting failed:', err));
          } else {
            console.warn('MathJax no está cargado.');
          }
        });
      }
    }
  },
  methods: {
    async sendMessage() {
      if (!this.userMessage.trim()) {
        return;
      }

      this.iaResponse = null;
      this.error = null;
      this.isLoading = true;

      try {
        const response = await fetch('/.netlify/functions/mistral-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: this.userMessage }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error al comunicarse con la función.');
        }

        this.iaResponse = data.response;
        // this.userMessage = ''; // Opcional: limpiar el input después de enviar
      } catch (err) {
        console.error('Fetch error:', err);
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },

    clearResponse() {
      this.iaResponse = null;
      this.error = null;
      this.userMessage = '';
    },

    async copyResponse() {
      if (this.iaResponse) {
        try {
          await navigator.clipboard.writeText(this.iaResponse);
          alert('Respuesta copiada al portapapeles!');
        } catch (err) {
          console.error('Error al copiar:', err);
          alert('Error al copiar la respuesta.');
        }
      }
    }
  },
};
</script>

<style scoped>
/* Mantén tus estilos existentes */
.ia-container {
  background-color: #f8f9fa;
  padding: 30px;
  margin: 30px auto;
  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
}

.ia-container h2 {
  color: #343a40;
  text-align: center;
  margin-bottom: 25px;
}

.input-area {
  display: flex;
  margin-bottom: 25px;
  gap: 10px;
}

.input-area input {
  flex-grow: 1;
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
}

.input-area button {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.input-area button:hover:not(:disabled) {
  background-color: #0056b3;
}

.input-area button:disabled {
    background-color: #a0c8f5;
    cursor: not-allowed;
}

.loading-indicator {
  text-align: center;
  color: #007bff;
  font-weight: bold;
  margin-bottom: 20px;
}


.response-area {
  background-color: #e9ecef;
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  text-align: left;
  margin-bottom: 20px;
  /* white-space: pre-wrap;  -- MathJax puede manejar esto, a veces es mejor dejarlo sin pre-wrap */
  word-wrap: break-word;
  color: #495057;
}

.response-area p {
    margin-top: 0;
    margin-bottom: 15px;
}

.response-actions {
  text-align: right;
}

.response-actions button {
  margin-left: 10px;
  padding: 8px 15px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.response-actions button:hover {
  background-color: #5a6268;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}
</style>
