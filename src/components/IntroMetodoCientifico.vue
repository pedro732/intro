<template>
  <transition name="explosion" @after-leave="onLeaveComplete">
    <div v-if="visible" class="overlay">
      <div class="content">
        <h2>Método Científico</h2>
        <p>
          El método científico es un método hipotético deductivo. Este método nos exige generar hipótesis o respuestas potenciales a los interrogantes que se han planteado.
          Estas hipótesis están generalmente basadas en observaciones previas de la naturaleza, o bien se derivan de teorías fundamentadas en dichas observaciones.
          Las hipótesis científicas son a menudo afirmaciones generales sobre la naturaleza que pueden explicar un gran número de observaciones diversas.
          La hipótesis de Darwin sobre la selección natural, por ejemplo, explica las observaciones referidas a como muchas especies diferentes tienen propiedades que las adaptan a sus ambientes respectivos.
          A partir de las hipótesis, el científico deberá hacer una predicción referente a futuras observaciones. El hombre de ciencia debe decirse:
          “Si mi hipótesis es una explicación válida sobre observaciones pasadas, entonces las observaciones futuras han de tener determinadas características”.
          Las mejores hipótesis son aquellas que hacen muchas predicciones que, si se demuestra que son erróneas, conducirán al rechazo o la refutación de la hipótesis.
          (Principios integrales de Zoología, 16ª edición, p.22)
        </p>
        <div class="buttons">
          <button class="btn ingresar" @click="startExplosion">Ingresar</button>
          <div class="new-button-wrapper">
            <span class="new-label">¡Nuevo!</span>
            <button class="btn fisica" @click="openFisica">Física</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "IntroMetodoCientifico",
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    startExplosion() {
      // Activa la animación de salida
      this.visible = false;
    },
    onLeaveComplete() {
      // El componente se desmonta después de la animación
      this.$emit("intro-finalizada");
    },
    openFisica() {
      window.open('https://cienciafisica.netlify.app/', '_blank');
    }
  },
};
</script>

<style scoped>
/* Fondo semitransparente */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.8);
  color: #fff;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: justify;
  padding: 2rem;
  font-family: 'Georgia', serif;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.content {
  max-width: 800px;
  background: rgba(30, 30, 30, 0.9);
  border-radius: 20px;
  padding: 2rem 3rem;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  animation: fadeIn 1.5s ease;
  max-height: 90vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #e0e0e0;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.new-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-label {
  color: #ffcc00;
  font-weight: bold;
  animation: pulse 1s infinite;
  font-size: 0.9rem;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.btn {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  border: none;
  padding: 0.8rem 2rem;
  color: white;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 114, 255, 0.6);
}

.btn.fisica {
  /* Mismo estilo que .btn.ingresar */
}

/* Animación inicial */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animación de explosión */
.explosion-leave-active {
  animation: explode 0.8s ease forwards;
}

@keyframes explode {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
    filter: blur(3px);
  }
  100% {
    opacity: 0;
    transform: scale(3);
    filter: blur(10px);
  }
}

/* Tablets y pantallas medianas */
@media (max-width: 768px) {
  .overlay {
    padding: 1rem;
  }
  
  .content {
    padding: 1.5rem 1.5rem;
    max-height: 85vh;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }
  
  p {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .buttons {
    gap: 0.8rem;
    margin-top: 1.5rem;
  }
  
  .btn {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }
}

/* iPhones y dispositivos pequeños */
@media (max-width: 480px) {
  .overlay {
    padding: 0.5rem;
    align-items: flex-start;
    padding-top: 1rem;
  }
  
  .content {
    padding: 1rem 1rem;
    max-height: calc(100vh - 2rem);
    width: 100%;
    margin: 0;
  }
  
  h2 {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }
  
  p {
    font-size: 0.9rem;
    line-height: 1.4;
    text-align: left;
  }
  
  .buttons {
    flex-direction: column;
    gap: 0.6rem;
    margin-top: 1rem;
  }
  
  .new-button-wrapper {
    width: 100%;
  }
  
  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    width: 100%;
  }
  
  .new-label {
    font-size: 0.8rem;
  }
}

/* Pantallas muy pequeñas (< 360px) */
@media (max-width: 360px) {
  .content {
    padding: 0.75rem 0.75rem;
  }
  
  h2 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.85rem;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>