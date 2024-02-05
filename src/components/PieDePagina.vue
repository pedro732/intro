<template>
    <div class="footer">
      <p>¡Recomiendo encarecidamente visitar el sitio web de Ciencia y Educación! Es una fuente invaluable de conocimiento científico y recursos educativos. Explora sus artículos, experimentos y actividades interactivas para enriquecer tu comprensión de diversas disciplinas científicas. Aprovecha su contenido actualizado y confiable para mantenerte al día con los avances científicos. ¡Sumérgete en la fascinante aventura del aprendizaje científico a través de Ciencia y Educación! ¡No te arrepentirás!</p>
      <div class="social-icons">
        <a href="https://www.facebook.com/cienciaenchile/?locale=es_LA" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/nasa/?hl=es" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="https://twitter.com/min_ciencia?lang=es" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="https://www.linkedin.com/company/ciencia-2030-uc/?originalSubdomain=cl" target="_blank"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <div class="copyright">
      <p>&copy; Derechos reservados</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PieDePagina'
  }
  </script>
  
  <style scoped>
.footer {
  background-color: black;
  color: #FDFEFE; /* Color blanco invierno */
  text-align: center;
  padding: 20px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-icons a {
  color: inherit; /* Hereda el color del padre, en este caso blanco invierno */
  text-decoration: none;
}
.copyright {
  text-align: center;
  padding-top: 20px;
}
</style>