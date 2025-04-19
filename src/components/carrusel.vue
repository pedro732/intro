<template>
    <carousel :autoplay="15000" :wrap-around="true">
      <slide v-for="(item, index) in items" :key="index">
        <img 
  :src="item.image" 
  class="d-block w-100" 
  :alt="'Slide ' + (index + 1)" 
  :style="item.image.includes('hippopotamus-6922165_1280.jpg') ? 'height: 600px; object-fit: contain;' : ''"
/>

  <div class="carousel-caption d-none d-md-block">
    <p :class="{ 'text-blue': index === 0, 'text-light-green': index === 2 }">{{ item.thought }}</p>
  </div>
</slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </template>
  
  <script>
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

   export default {
    name: 'VistaCarrusel',
    components: {
      Carousel,
      Slide,
        Pagination,
        Navigation
    },
    data() {
      return {
       
        items: [
          { image: 'https://cdn.pixabay.com/photo/2020/06/09/11/10/giraffe-5277965_1280.jpg', thought: 'Bacon no negaba la importancia de las facultades racionales de la mente, pero creía que estas facultades debían utilizarse para comprender los hechos de la naturaleza y no las invenciones de la imaginación humana.' },
          { image: 'https://cdn.pixabay.com/photo/2020/07/03/10/44/horses-5365974_1280.jpg', thought: '[...] no admitir como verdadera cosa alguna a menos que se sepa con evidencia que lo es; es decir, evitar cuidadosamente la precipitación y la prevención, y no comprender en mis juicios nada más que lo que se presentase tan clara y distintamente a mi espíritu, que no hubiese ninguna ocasión de ponerlo en duda.(Rene Descartes. Discurso del metodo)' },
          { image: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg', thought: '[...] conducir con orden mis pensamientos, empezando por los objetos más simples y más fáciles de conocer, para ir ascendiendo poco a poco, gradualmente, hasta el conocimiento de los más compuestos, e incluso suponiendo un orden entre los que no se preceden naturalmente.' },
          { image: 'https://cdn.pixabay.com/photo/2020/05/17/14/26/manta-5181901_1280.jpg', thought: 'Poseemos tres medios principales: la observación de la naturaleza, la reflexión y la experiencia. La observación recoge los hechos, la reflexión los combina, la experiencia verifica el resultado de la combinación. Es indispensable que la observación de la naturaleza sea asidua, que la reflexión sea profunda y la experiencia sea exacta.Dennisse Diderot' },
          { image: 'https://cdn.pixabay.com/photo/2019/03/06/17/34/hippo-4038675_1280.jpg', thought:'La ciencia siempre vale la pena, porque sus descubrimientos, tarde o temprano, siempre se aplican. (Severo Ochoa)'},
        ]
      }
    }

   
  }
  </script>
  
  <style scoped>
  .scientist-thought {
    margin-top: 20px;
    font-size: 18px;
  }
  .carousel__slide {
  display: initial;
}
.carousel__slide img {
  height: 700px;  /* Ajusta este valor según tus necesidades */
  object-fit: cover;  /* Esto asegura que las imágenes se redimensionen correctamente */
}
.carousel-caption p {
  font-size: 30px;  /* Ajusta este valor según tus necesidades */
}
.text-blue {
  color: rgba(9, 236, 160, 0.681);
}

.text-light-green {
  color: rgb(15, 19, 236);
}
  </style>