<template>
  <transition name="fade">
    <div v-if="visible" class="sheet-wrapper">
      <div class="sheet">
        <header class="sheet-header">
          <h2>Método Científico</h2>
          <button class="close" @click="closeModal">✕</button>
        </header>

        <main class="sheet-body">
          <img
            src="/assets/metodo_cientifico.jpg"
            alt="Método Científico"
            class="esquema-img"
          />
        </main>

        <footer class="sheet-footer">
          <button class="btn" @click="closeModal">
            Continuar
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EsquemaMetodo',
  props: { visible: Boolean },
  watch: {
    visible(v) {
      document.body.style.overflow = v ? 'hidden' : ''
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  methods: {
    closeModal() {
      this.$emit('cerrar')
    }
  }
}
</script>





<style scoped>
/* OVERLAY */
.sheet-wrapper {
  position: fixed;
  inset: 0;
  background: white;
  z-index: 10000;
  overflow: hidden;
}

/* CONTENEDOR PRINCIPAL */
.sheet {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
}

/* HEADER */
.sheet-header {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 2;
  background: white;
  padding: 1rem;
  border-bottom: 1px solid #ddd;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* BODY CON SCROLL */
.sheet-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* IMAGEN RESPONSIVA */
.sheet-body .esquema-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* FOOTER */
.sheet-footer {
  flex-shrink: 0;
  padding: 1rem;
  border-top: 1px solid #ddd;
  background: white;
}

/* BOTÓN */
.btn {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 25px;
  background: #0072ff;
  color: white;
  border: none;
}

/* BOTÓN CERRAR */
.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* DESKTOP */
@media (min-width: 768px) {
  .sheet-wrapper {
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sheet {
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    border-radius: 16px;
    overflow: hidden;
  }
}

</style>