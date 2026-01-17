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
.sheet-wrapper {
  position: fixed;
  inset: 0;
  background: white;
  z-index: 10000;

  /* 👇 SCROLL NATIVO */
  overflow-y: auto;
}

/* CONTENIDO */
.sheet {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.sheet-header {
  position: sticky;
  top: 0;
  background: white;
  padding: 1rem;
  border-bottom: 1px solid #ddd;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* BODY */
.sheet-body {
  flex: 1;
  padding: 1rem;
}

.sheet-body img {
  width: 100%;
  height: auto;
}

/* FOOTER */
.sheet-footer {
  padding: 1rem;
  border-top: 1px solid #ddd;
}

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
}

/* DESKTOP: SE VE COMO MODAL */
@media (min-width: 768px) {
  .sheet-wrapper {
    background: rgba(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sheet {
    max-width: 800px;
    max-height: 90vh;
    background: white;
    border-radius: 16px;
    overflow: hidden;
  }
}

</style>