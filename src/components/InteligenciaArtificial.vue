// En tu componente InteligenciaArtificial.vue (ejemplo básico)
<template>
  <div>
    <input v-model="userMessage" placeholder="Escribe tu mensaje...">
    <button @click="sendMessage">Enviar a IA</button>
    <p v-if="iaResponse">Respuesta de la IA: {{ iaResponse }}</p>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script>
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
      this.iaResponse = null;
      this.error = null;

      try {
        const response = await fetch('/.netlify/functions/mistral-chat', { // La ruta a tu función
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: this.userMessage }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Manejar errores HTTP (ej. 400, 500)
          throw new Error(data.message || 'Error al comunicarse con la función.');
        }

        this.iaResponse = data.response;
      } catch (err) {
        console.error('Fetch error:', err);
        this.error = err.message;
      }
    },
  },
};
</script>
