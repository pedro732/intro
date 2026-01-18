# 📊 Optimizaciones de Rendimiento - intro.vue

## ✅ Cambios Implementados (v2.0 - Sistema Dual)

### 1. **Perfiles Diferenciados: Desktop vs Móvil/Tablet**
Cada componente detecta el dispositivo y adapta su comportamiento:
- **Desktop (≥769px)**: Carga normal, más datos, animaciones suaves
- **Móvil/Tablet (≤768px)**: Carga optimizada, menos datos, timeouts menores

---

### 2. **Componentes con Detección de Dispositivo**

#### `carruselApi.vue` (Imágenes)
| Aspecto | Móvil | Desktop |
|--------|-------|---------|
| Máx. imágenes | 4 | 8 |
| Altura | 250px | 400px |
| Timeout | 5s | 8s |
| Carga | Rápida | Normal |

#### `indicadores.vue` (Económicos)
| Aspecto | Móvil | Desktop |
|--------|-------|---------|
| Timeout | 3s | 5s |
| Reintentos | Fallido rápido | Espera más |

#### `InteligenciaArtificial.vue` (IA)
| Aspecto | Móvil | Desktop |
|--------|-------|---------|
| Timeout | 10s | 20s |
| Espera máx. | Corta | Más tiempo |

---

### 3. **Optimizaciones Aplicadas a Todos los Componentes**

✅ **Mejoras Generales:**
- Detección automática de tamaño de pantalla
- Listener en `resize` para adaptarse dinámicamente
- Cleanup en `beforeUnmount` para evitar memory leaks
- Timeouts adaptables según dispositivo
- Manejo mejorado de errores

✅ **Mejoras CSS:**
- `will-change` en elementos animados
- `contain: layout style paint` para mejor rendimiento
- Altura responsiva en imágenes
- Transiciones suaves (0.3s)

✅ **Mejoras en Fetch:**
- AbortController para cancelar peticiones
- Timeout configurables
- Detección de errores AbortError

---

## 🎯 Arquitectura Actual

```
intro.vue (Vista principal)
├── Componentes Síncronos (Carga inmediata)
│   ├── BarraNavegacion
│   ├── IntroMetodoCientifico
│   ├── EtapasMetodoCientifico
│   ├── EcosistemasModal
│   ├── EcosistemasModal2
│   ├── EsquemaMetodo
│   ├── VistaTarjeta
│   └── PieDePagina
│
└── Componentes Optimizados (Cargan normalmente, pero responsivos)
    ├── CarruselApi (4 img móvil / 8 img desktop)
    ├── InteligenciaArtificial (10s móvil / 20s desktop)
    ├── IndicadoresEconomicos (3s móvil / 5s desktop)
    ├── FotoDelDia
    └── NoticiaDelDia
```

---

## 📱 Comportamiento por Dispositivo

### 🖥️ **Desktop (Pantalla > 768px)**
1. Carga la página completa rápido
2. Carrusel con 8 imágenes (buena experiencia visual)
3. Indicadores esperan hasta 5 segundos
4. IA espera hasta 20 segundos
5. Todo renderizado sin problemas

### 📱 **Móvil/Tablet (Pantalla ≤ 768px)**
1. Carga la página muy rápido
2. Carrusel con 4 imágenes (ahorra datos)
3. Indicadores esperan máximo 3 segundos
4. IA espera máximo 10 segundos
5. Imágenes más pequeñas (250px de altura)

---

## 🔧 Cambios Técnicos Clave

### Antes (Problemas)
```javascript
// ❌ Cargaba todo al mismo tiempo
const CarruselApi = () => import('...') // Lazy loading puro
const IndicadoresEconomicos = () => import('...') // Nunca se cargaban
```

### Después (Solución)
```javascript
// ✅ Carga normal pero responsiva
import CarruselApi from '...'
import IndicadoresEconomicos from '...'

// En cada componente:
mounted() {
  this.isMobile = window.innerWidth <= 768;
  window.addEventListener('resize', this.handleResize);
  // Cargar datos con timeout adaptativo
}
```

---

## 📊 Impacto Esperado

| Métrica | Desktop | Móvil | Mejora |
|---------|---------|-------|--------|
| Time to Interactive | 2-3s | 1.5-2s | ✅ |
| First Paint | 1-2s | 0.8-1.5s | ✅ |
| Memoria | 80-100MB | 30-40MB | ✅ |
| FPS | 50-60 | 45-55 | ✅ |
| Uso datos | Normal | 30% menos | ✅ |

---

## 🧪 Pruebas Recomendadas

### En Móvil Real (Android/iOS):
```bash
# 1. Probar con 3G/4G lento
# 2. Verificar que cargan:
#    ✅ Carrusel de imágenes
#    ✅ Indicadores económicos
#    ✅ Sección de IA
#    ✅ Foto del día
#    ✅ Noticia del día
# 3. No debe pegarse ni ser lento
```

### En Desktop:
```bash
# Verificar que todo funciona normal
# Mayor cantidad de imágenes (8 vs 4)
# Mejor calidad de experiencia
```

### Medir con DevTools:
```
Chrome → F12 → Performance → Grabar
1. Buscar: First Contentful Paint (FCP)
2. Buscar: Largest Contentful Paint (LCP)
3. Buscar: Cumulative Layout Shift (CLS)
```

---

## ⚠️ Notas Importantes

1. **Los componentes ahora cargan**: Removimos lazy loading agresivo
2. **Son responsivos**: Adaptan recursos según dispositivo
3. **Tienen timeouts**: No se quedan esperando indefinidamente
4. **Son escalables**: Funciona en cualquier tamaño de pantalla

---

## 📝 Próximos Pasos

1. ✅ Implementar sistema dual (HECHO)
2. 🔄 Revisar FotodelDia.vue y NoticiaDelDia.vue (¿hacen peticiones HTTP?)
3. 🔄 Optimizar imágenes en función Netlify (resize URLs)
4. 🔄 Implementar Service Worker para cacheo
5. 🔄 Medir con Lighthouse en móvil real

### Revisar estos componentes:
- `FotodelDia.vue` - ¿Hace petición a API?
- `NoticiaDelDia.vue` - ¿Hace petición a API?
- `tarjetas.vue` - ¿Carga muchos datos?

Si alguno hace peticiones, aplicar el mismo patrón de detección de dispositivo.

