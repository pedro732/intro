# ✅ Checklist de Optimización - Próximos Pasos

## 📋 Estado Actual

### ✅ Optimizados (Sistema Dual Desktop/Móvil)
- [x] `intro.vue` - Vista principal
- [x] `carruselApi.vue` - Imágenes Pexels
- [x] `indicadores.vue` - Indicadores económicos
- [x] `InteligenciaArtificial.vue` - Respuestas IA

### 🔄 Necesitan Revisión
- [ ] `FotodelDia.vue` - ¿Peticiones API?
- [ ] `NoticiaDelDia.vue` - ¿Peticiones API?
- [ ] `tarjetas.vue` - ¿Carga de datos pesados?
- [ ] `barranavegacion.vue` - ¿Peticiones?

### 📊 Necesita Análisis
- [ ] `pexels-images.js` (Netlify function) - ¿Optimizar URLs de imágenes?
- [ ] `mistral-chat.js` (Netlify function) - ¿Optimizar timeouts?

---

## 🔍 Cómo Revisar FotodelDia.vue

### Paso 1: Abrir el archivo
```
src/components/FotodelDia.vue
```

### Paso 2: Buscar peticiones HTTP
Buscar estas palabras clave:
- `fetch(` 
- `axios.get(`
- `axios.post(`
- `.then(`
- `async`
- `created()`
- `mounted()`

### Paso 3: Si tiene peticiones
Si encontraste alguna, aplicar este patrón:

```javascript
export default {
  data() {
    return {
      isMobile: false,
      datos: [],
      isLoading: true,
    };
  },
  mounted() {
    // ✅ AGREGADO: Detectar dispositivo
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', this.handleResize);
    
    // Cargar datos aquí (no en created)
    this.cargarDatos();
  },
  beforeUnmount() {
    // ✅ AGREGADO: Limpiar listeners
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },
    async cargarDatos() {
      try {
        // ✅ AGREGADO: Timeout adaptativo
        const timeout = this.isMobile ? 3000 : 5000;
        
        const response = await fetch('...', { 
          signal: AbortSignal.timeout(timeout) 
        });
        // Tu código aquí
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }
};
```

---

## 🔍 Cómo Revisar NoticiaDelDia.vue

Mismo proceso que `FotodelDia.vue`:

1. Abre `src/components/NoticiaDelDia.vue`
2. Busca peticiones HTTP
3. Si tiene, aplica el patrón anterior

---

## 🔍 Cómo Revisar tarjetas.vue

### Paso 1: Abrir archivo
```
src/components/tarjetas.vue
```

### Paso 2: Buscar
- ¿Itera sobre muchos items? (`v-for`)
- ¿Carga muchas imágenes?
- ¿Hace peticiones HTTP?

### Paso 3: Optimizaciones
Si itera sobre muchos items:
```javascript
// ✅ Agregar virtualización para listas largas
<template>
  <virtual-scroller :items="items">
    <template #default="{ item }">
      <tarjeta :data="item" />
    </template>
  </virtual-scroller>
</template>
```

---

## 🔌 Optimizar Funciones Netlify

### pexels-images.js

**Actual (probablemente):**
```javascript
const images = pexelsImages.map(img => ({
  id: img.id,
  image: img.src.large, // ❌ Muy grande (3-5MB)
  alt: img.alt
}));
```

**Optimizado:**
```javascript
const images = pexelsImages.map(img => ({
  id: img.id,
  // ✅ Redimensionar según dispositivo
  image: img.src.large + '?w=800&h=600&fit=crop', // ~200KB
  thumbnail: img.src.medium, // Para preview rápido
  alt: img.alt
}));
```

### mistral-chat.js

Revisar:
- ¿Hay timeout en la llamada a Mistral?
- ¿Maneja errores de timeout?
- ¿Registra logs?

---

## 🧪 Testing Checklist

### En Desktop (Pantalla grande)
- [ ] La página carga rápido
- [ ] Carrusel muestra 8 imágenes
- [ ] Indicadores aparecen rápido
- [ ] IA responde en tiempo razonable
- [ ] Foto del día se ve bien
- [ ] Noticia del día aparece

### En Móvil (Pantalla pequeña)
- [ ] La página carga MÁS rápido que en desktop
- [ ] Carrusel muestra solo 4 imágenes
- [ ] Indicadores esperan máximo 3 segundos
- [ ] IA responde en máximo 10 segundos
- [ ] Imágenes se ven bien (250px altura)
- [ ] No hay lag ni freezes al scroll

### En Conexión Lenta (3G)
- [ ] La página no se queda en blanco
- [ ] Mostrar "Cargando..." mientras se obtienen datos
- [ ] Los timeouts funcionan (no espera eternamente)
- [ ] Los errores se muestran claramente

---

## 📊 Performance Check

### Ejecutar Lighthouse
```bash
# En terminal
npx lighthouse https://tudominio.com --view

# O en Chrome DevTools
F12 → Lighthouse → Generate Report
```

### Métricas a buscar:
- **FCP (First Contentful Paint)**: < 2s ✅
- **LCP (Largest Contentful Paint)**: < 4s ✅
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅
- **TTI (Time to Interactive)**: < 5s ✅

---

## 📋 Pasos Recomendados (En Orden)

1. [ ] Revisar `FotodelDia.vue`
   - [ ] ¿Hace peticiones?
   - [ ] [ ] Si es sí, aplicar patrón dual

2. [ ] Revisar `NoticiaDelDia.vue`
   - [ ] ¿Hace peticiones?
   - [ ] Si es sí, aplicar patrón dual

3. [ ] Revisar `tarjetas.vue`
   - [ ] ¿Carga muchos datos?
   - [ ] Si es sí, considerar virtualización

4. [ ] Optimizar `pexels-images.js`
   - [ ] Redimensionar imágenes en URL

5. [ ] Probar en móvil real
   - [ ] Con WiFi rápido
   - [ ] Con 4G
   - [ ] Con 3G lento

6. [ ] Ejecutar Lighthouse
   - [ ] Desktop
   - [ ] Móvil

7. [ ] Medir tiempos de carga
   - [ ] First Paint
   - [ ] Largest Paint
   - [ ] Interactive

8. [ ] Documentar resultados

---

## 🎯 Objetivo Final

**Que la página cargue en móvil más rápido que en desktop:**
- ✅ Desktop: ~2-3 segundos
- ✅ Móvil: ~1-2 segundos

**Sin sacrificar funcionalidad ni experiencia del usuario.**

---

## 📞 Dudas Frecuentes

### ¿Por qué 4 imágenes en móvil vs 8 en desktop?
R: Móviles tienen ancho de banda limitado. Menos imágenes = carga más rápida.

### ¿Por qué timeout diferente en móvil?
R: Conexión 4G/3G es más lenta. Timeout corto evita que se quede esperando.

### ¿Qué pasa si la petición falla?
R: Se muestra un mensaje de error y la página sigue funcionando.

### ¿Y si deshabilito JavaScript?
R: Solo funcionan los componentes estáticos. Los dinámicos no cargan datos.

---

## 📞 Contacto/Notas

Guardar aquí cualquier nota importante durante el testing:

```
[Espacio para notas]
```

