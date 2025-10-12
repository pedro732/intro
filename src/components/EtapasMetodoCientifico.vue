<template>
  <transition name="modal-fade">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h2>Etapas del método científico</h2>
        <ul>
          <li>Observación</li>
          <li>Interrogante</li>
          <li>Hipótesis</li>
          <li>Prueba empírica</li>
          <li>Conclusiones</li>
          <li>Publicación</li>
        </ul>
        <div class="buttons">
          <button class="btn continuar" @click="$emit('continuar')">Continuar</button>
          <button class="btn ecosistemas" @click="$emit('ecosistemas')">Ecosistemas</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EtapasMetodoCientifico',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  color: white;
}

.modal-content {
  background: rgba(30, 30, 30, 0.95);
  padding: 2rem 3rem;
  border-radius: 15px;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}

h2 {
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  text-align: left;
  margin-bottom: 2rem;
}

li {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  padding-left: 1rem;
  position: relative;
}

li::before {
  content: "•";
  color: #00c6ff;
  position: absolute;
  left: 0;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  background: #0072ff;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.btn:hover {
  transform: scale(1.1);
}

.btn.ecosistemas {
  background: #28a745;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
