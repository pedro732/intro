<template>
  <div class="carrusel">
    <button class="nav prev" @click="prev">‹</button>

    <div class="viewport">
      <div class="slides">
        <div
          class="slide"
          v-for="(item, index) in images"
          :key="item.id"
          :class="{ active: index === currentIndex }"
        >
          <img
            :src="item.image"
            :alt="item.alt"
          />
          <div class="caption">
            {{ item.alt }}
          </div>
        </div>
      </div>
    </div>

    <button class="nav next" @click="next">›</button>
  </div>
</template>

<script>
import imagenesData from '@/assets/imagenes.json'

export default {
  name: 'CarruselManual',
  data() {
    return {
      currentIndex: 0,
      images: imagenesData.images   // 👈 AQUÍ está la corrección clave
    }
  },
  methods: {
    next() {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length
    },
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) %
        this.images.length
    }
  }
}
</script>

<style scoped>
.carrusel {
  position: relative;
  max-width: 900px;
  margin: 2rem auto;
  overflow: hidden;
}

.viewport {
  width: 100%;
  height: 350px;
  position: relative;
}

.slides {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 1rem;
  text-align: center;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

@media (max-width: 768px) {
  .viewport {
    height: 220px;
  }
}
</style>
