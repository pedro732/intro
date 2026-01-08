<template>
  <transition name="modal-fade">
    <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-content" @click.stop>
        <img src="/assets/metodo_cientifico.jpg" alt="Método Científico" class="modal-image" />
        <button class="btn" @click="closeModal">Continuar</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EsquemaMetodo',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      console.log('closeModal called');
      this.$emit('cerrar');
    },
    handleOverlayClick() {
      this.closeModal();
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
  z-index: 10001;
  color: white;
}

.modal-content {
  background: rgba(30, 30, 30, 0.95);
  padding: 2rem 3rem;
  border-radius: 15px;
  max-width: 800px;
  width: 90%;
  text-align: center;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  overflow-y: auto;
  max-height: 90vh;
}

.modal-image {
  width: 70%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1rem 1.5rem;
    max-width: 95%;
  }
  .modal-image {
    width: 90%;
  }
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

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>