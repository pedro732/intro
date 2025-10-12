<template>
  <transition name="modal-fade">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h2>Estamos preparando este sitio 🌱</h2>
        <p>Pronto podrás explorar contenidos sobre ecosistemas y medio ambiente.</p>
        <button class="btn" @click="$emit('cerrar')">Continuar</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EcosistemasModal',
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
  z-index: 9999;
  color: white;
}

.modal-content {
  background: rgba(30, 30, 30, 0.95);
  padding: 2rem 3rem;
  border-radius: 15px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}

h2 {
  margin-bottom: 1rem;
}

.btn {
  margin-top: 1.5rem;
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

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
