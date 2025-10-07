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
        <button @click="startExplosion">Ingresar</button>
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
}

.content {
  max-width: 800px;
  background: rgba(30, 30, 30, 0.9);
  border-radius: 20px;
  padding: 2rem 3rem;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  animation: fadeIn 1.5s ease;
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

button {
  display: block;
  margin: 2rem auto 0;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  border: none;
  padding: 0.8rem 2rem;
  color: white;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 114, 255, 0.6);
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
</style>
