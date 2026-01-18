<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="/">
        <i class="fas fa-graduation-cap"></i> Ciencia y Educación
      </a>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="closeMenu">
              <i class="fas fa-home"></i> Inicio
            </router-link>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link" 
              href="https://studio--educacin-y-ciencia.us-central1.hosted.app/" 
              target="_blank"
              @click="closeMenu"
            >
              <i class="fas fa-flask"></i> Ciencia
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="closeMenu">
              <i class="fas fa-envelope"></i> Contacto
            </a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link" 
              href="https://blogeducativo.netlify.app/" 
              target="_blank"
              @click="closeMenu"
            >
              <i class="fas fa-book"></i> Blog educativo
            </a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link" 
              href="https://cienciafisica.netlify.app/" 
              target="_blank"
              @click="closeMenu"
            >
              <i class="fas fa-atom"></i> Física
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BarraNavegacion',
  methods: {
    closeMenu(event) {
      const navbarCollapse = document.getElementById('navbarNav');
      // Obtener la instancia de Collapse de Bootstrap
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      
      // Si el menú está abierto, cerrarlo
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
        // Asegurarse de que el botón de alternancia también refleje el estado cerrado
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler && !toggler.classList.contains('collapsed')) {
          toggler.classList.add('collapsed');
          toggler.setAttribute('aria-expanded', 'false');
        }
      }
      
      // Si el evento es de un enlace y tiene un href válido, navegar
      if (event && event.target.tagName === 'A' && event.target.href && event.target.href !== '#') {
        // Prevenir la navegación por defecto del enlace para manejarla manualmente
        event.preventDefault();
        // Pequeño retraso para que la animación de cierre del menú sea visible
        setTimeout(() => {
          window.location.href = event.target.href;
        }, 150); 
      }
    }
  },
  mounted() {
    if (!window.bootstrap || !window.bootstrap.Collapse) {
      console.warn("Bootstrap Collapse JS no está disponible. El menú podría no funcionar correctamente en dispositivos móviles.");
    }
    // Bootstrap 5 requiere que el JS esté cargado para que el componente Collapse funcione.
    // Si se usa un CDN, asegurarse de que el script de Bootstrap JS esté antes del script de la aplicación Vue.
    // Si se instala vía npm, asegurarse de importarlo correctamente en el punto de entrada de la aplicación (main.js o similar).
  }
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  color: #28a745 !important;
  font-size: 1.3rem;
}

.navbar-brand i {
  margin-right: 8px;
}

.nav-link {
  transition: color 0.3s ease;
  margin: 0 5px;
}

.nav-link:hover {
  color: #28a745 !important;
}

.nav-link i {
  margin-right: 5px;
}

@media (max-width: 991px) {
  .navbar-nav {
    margin-top: 10px;
  }
  
  .nav-item {
    margin: 5px 0;
  }
  
  .nav-link {
    padding: 10px 0 !important;
  }
}
</style>