<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Ciencia y Educación</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>

     
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
  <i class="fas fa-home"></i> Inicio
</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://studio--educacin-y-ciencia.us-central1.hosted.app/blog" target="_blank"><i class="fas fa-flask"></i> Ciencia</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="fas fa-envelope"></i> Contacto</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://blogeducativo.netlify.app/" target="_blank"><i class="fas fa-book"></i> Blog educativo</a>
</li>

      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BarraNavegacion'
}
</script>