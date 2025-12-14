<template>
  <transition name="modal-fade">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <img src="/assets/ciervo.jpg" alt="Ciervo" class="modal-image" />
        <p>La palabra "ecología" tiene su origen en los términos griegos oikos, que significa "casa" logos, que significa "estudio". Así, el estudio de la casa ambiental comprende todos los organismos que viven en ella y todos los procesos funcionales que la hacen habitable. Entonces, literalmente, la ecología es el estudio de "la vida en casa", con particular hincapié en "la totalidad o patrón de relaciones entre los organismos y su ambiente", para citar una de las definiciones del Webster's Unabridged Dictionary. (Fundamentos de ecología, p.10, Eugene Odum)</p>
        <button class="btn" @click="openQuarkCharm">Continuar</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EcosistemasModal2',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openQuarkCharm() {
      window.open('https://quark-charm.cl/', '_blank');
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
  z-index: 10000;
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

.modal-image {
  max-width: 50%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
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