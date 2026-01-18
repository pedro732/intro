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
    closeMenu() {
      // Cerrar el menú después de hacer click - versión ultra-robusta para mobile/iPhone
      try {
        const navbarCollapse = document.getElementById('navbarNav');
        const toggleBtn = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && toggleBtn) {
          // Verificar si el menú está abierto
          if (navbarCollapse.classList.contains('show')) {
            // MÉTODO 1: Remover clases y atributos (más directo)
            navbarCollapse.classList.remove('show');
            toggleBtn.classList.remove('collapsed');
            toggleBtn.setAttribute('aria-expanded', 'false');
            
            // MÉTODO 2: Usar Bootstrap API como respaldo
            try {
              if (window.bootstrap && window.bootstrap.Collapse) {
                const collapse = new window.bootstrap.Collapse(navbarCollapse, {
                  toggle: false
                });
                collapse.hide();
              }
            } catch (e) {
              console.log('Bootstrap API unavailable, using fallback');
            }
            
            // MÉTODO 3: Click directo como último recurso
            if (navbarCollapse.classList.contains('show')) {
              toggleBtn.click();
            }
          }
        }
      } catch (error) {
        console.log('Error closing menu:', error);
      }
    }
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