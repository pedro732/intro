# File: src/components/InteligenciaArtificial.vue
<template>
  <div class="ia-container">
    <h2>Pregúntale a la Inteligencia Artificial</h2>

    <div class="input-area">
      <input v-model="userMessage" placeholder="Escribe tu mensaje..." @keyup.enter="sendMessage">
      <button @click="sendMessage" :disabled="!userMessage.trim()">Enviar a IA</button>
    </div>

    <div v-if="iaResponse" class="response-area">
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
// No necesitas importar Mistral aquí, la llamada se hace en la función Netlify
export default {
  data() {
    return {
      userMessage: '',
      iaResponse: null,
      error: null,
    };
  },
  methods: {
    async sendMessage() {
      // No enviar si el mensaje está vacío o solo espacios
      if (!this.userMessage.trim()) {
        return;
      }

      this.iaResponse = null; // Limpiar respuesta anterior
      this.error = null; // Limpiar error anterior

      try {
        // Llama a tu función serverless de Netlify
        const response = await fetch('/.netlify/functions/mistral-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: this.userMessage }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Manejar errores HTTP (ej. 400, 500) reportados por la función
          throw new Error(data.message || 'Error al comunicarse con la función.');
        }

        this.iaResponse = data.response;
        // this.userMessage = ''; // Opcional: limpiar el input después de enviar
      } catch (err) {
        console.error('Fetch error:', err);
        this.error = err.message;
      }
    },

    clearResponse() {
      this.iaResponse = null;
      this.error = null;
      this.userMessage = ''; // También limpia el input al borrar
    },

    async copyResponse() {
      if (this.iaResponse) {
        try {
          // Usa la API del portapapeles del navegador
          await navigator.clipboard.writeText(this.iaResponse);
          alert('Respuesta copiada al portapapeles!'); // Feedback al usuario
        } catch (err) {
          console.error('Error al copiar:', err);
          alert('Error al copiar la respuesta.'); // Feedback de error
        }
      }
    }
  },
};
</script>

<style scoped>
/* Estilos para centrar, fondo y presentación */
.ia-container {
  background-color: #f8f9fa; /* Un gris muy claro para destacar */
  padding: 30px; /* Más espacio interno */
  margin: 30px auto; /* Centra el bloque y añade margen arriba/abajo */
  max-width: 800px; /* Ancho máximo para mejor lectura */
  border-radius: 10px; /* Bordes más redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  font-family: sans-serif; /* Fuente legible */
}

.ia-container h2 {
  color: #343a40; /* Color oscuro para el título */
  text-align: center; /* Centra el título */
  margin-bottom: 25px; /* Espacio debajo del título */
}

.input-area {
  display: flex; /* Usa flexbox para alinear input y botón */
  margin-bottom: 25px;
  gap: 10px; /* Espacio entre input y botón */
}

.input-area input {
  flex-grow: 1; /* Permite que el input ocupe el espacio disponible */
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
}

.input-area button {
  padding: 12px 20px;
  background-color: #007bff; /* Azul primario */
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
    background-color: #a0c8f5; /* Color más claro cuando está deshabilitado */
    cursor: not-allowed;
}


.response-area {
  background-color: #e9ecef; /* Fondo ligeramente más oscuro para la respuesta */
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  text-align: left; /* Alinea el texto de respuesta a la izquierda */
  margin-bottom: 20px;
  white-space: pre-wrap; /* Mantiene saltos de línea y espacios */
  word-wrap: break-word; /* Rompe palabras largas */
  color: #495057; /* Color de texto oscuro */
}

.response-area p {
    margin-top: 0;
    margin-bottom: 15px; /* Espacio entre el texto y los botones de acción */
}

.response-actions {
  text-align: right; /* Alinea los botones de acción a la derecha */
}

.response-actions button {
  margin-left: 10px; /* Espacio entre los botones de acción */
  padding: 8px 15px;
  background-color: #6c757d; /* Gris secundario */
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
  color: #dc3545; /* Rojo para mensajes de error */
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}
</style>
