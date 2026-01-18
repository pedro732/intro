# 📱 Guía de Testing - Optimizaciones Móviles

## Verifica que tu sitio ahora sea mucho más rápido

---

## 🧪 Test 1: Cargar en Móvil (Lo más importante)

### ¿Qué probar?

1. **Abre tu sitio en un teléfono real**
   - URL: https://tu-sitio.netlify.app/

2. **Observa esto:**
   - ✅ La página carga **sin congelar**
   - ✅ Los primeros elementos (navbar, título) aparecen rápido
   - ✅ Cuando llegues a "Indicadores Económicos", **no se congela**
   - ✅ Las imágenes del carrusel aparecen (una o más)
   - ✅ El menú hamburguesa abre y cierra correctamente

### ¿Si hay problemas?

| Problema | Causa Posible | Solución |
|----------|---------------|----------|
| Sigue congelando | Red muy lenta | Probar en WiFi 5GHz |
| Carrusel vacío | API Pexels sin responder | Verificar Network (ver abajo) |
| Indicadores vacíos | API mindicador.cl lenta | Actualizar página |
| Menú no funciona | Cache del navegador | Hard refresh (Cmd+Shift+R) |

---

## 🔍 Test 2: Developer Tools (Chrome Mobile Emulation)

### Pasos:
1. Abre Chrome en tu PC/Mac
2. Ve a tu sitio
3. Abre DevTools: `F12` o `Cmd+Option+I`
4. Click en icono de teléfono 📱 (Toggle device toolbar)
5. Selecciona "iPhone 13" o similar

### Verifica en la pestaña **Network:**

```
✅ ESPERADO:

GET /.netlify/functions/pexels-images
  Size: ~30 KB (JSON)
  Time: 0.5-2 segundos
  ↓
  Luego cargan las 4 imágenes en background
  
GET https://mindicador.cl/api/uf
GET https://mindicador.cl/api/dolar
GET https://mindicador.cl/api/euro
GET https://mindicador.cl/api/utm
  Size: ~1 KB cada una
  Time: < 3 segundos total
```

### ¿Qué cambió?

**Antes:**
```
GET /.netlify/functions/pexels-images
  Size: 30-90 MB ❌ ENORME
  Time: 10-20 segundos
  → Bloquea todo
```

**Ahora:**
```
GET /.netlify/functions/pexels-images
  Size: ~2-3 MB ✅ Pequeño
  Time: 0.5-2 segundos
  → No bloquea nada
```

---

## 📊 Test 3: Simular Red Lenta

### En Chrome DevTools:

1. **Network tab** → Click en dropdown que dice "No throttling"
2. Selecciona: **"Slow 3G"**
3. Recarga la página (`Cmd+R`)

### ¿Qué deberías ver?

```
Timeline:
├─ 0s   → Navbar aparece
├─ 1s   → Texto principal visible
├─ 2s   → Carrusel muestra spinner "Cargando imágenes..."
├─ 3-5s → Imágenes empiezan a aparecer en carrusel
├─ 6s   → Indicadores económicos aparecen con spinner
├─ 7-8s → Todo cargado
```

**Importante:** Incluso con 3G, NO debería congelarse en "Indicadores Económicos"

---

## ✔️ Test 4: Performance Metrics

### En DevTools → Lighthouse:

1. Click en **Lighthouse** (o GenerateReport)
2. Selecciona:
   - Device: **Mobile**
   - Categories: **Performance**
3. Click: **Analyze page load**

### Métricas Clave:

| Métrica | Antes | Después | Meta |
|---------|-------|---------|------|
| **FCP** (First Contentful Paint) | 3-5s | 1-2s | < 2s ✅ |
| **LCP** (Largest Paint) | 8-12s | 3-5s | < 4s ✅ |
| **CLS** (Cumulative Layout Shift) | 0.2 | 0.1 | < 0.1 ✅ |
| **TTI** (Time to Interactive) | 10-15s | 5-8s | < 8s ✅ |

---

## 🎯 Test 5: Comportamiento del Carrusel

### Abre el sitio en móvil

1. **Espera a que aparezcan las imágenes** del carrusel
   - Deberías ver un spinner giratorio
   - Luego aparecerán 4 imágenes

2. **Intenta navegar:**
   - Swipe izquierda/derecha (para cambiar)
   - Los puntos de abajo deberían mostrar posición
   - Las flechas deberían funcionar (si hay desktop)

3. **Si solo ves 1 imagen:**
   - Es normal si las otras se están descargando
   - Espera 5 segundos más
   - Si siguen sin aparecer, revisar Network tab

---

## 🎬 Test 6: Menú Hamburguesa Móvil

### Paso a Paso:

1. Abre en móvil (o emulador)
2. Click en **icono hamburguesa** (≡) arriba a la derecha
3. Deberías ver:
   ```
   🏠 Inicio
   🧪 Ciencia
   📧 Contacto
   📚 Blog educativo
   ⚛️ Física
   ```

4. Click en cualquier opción (ej: "Inicio")
   - ✅ El menú debe **cerrarse automáticamente**
   - ✅ La página debe navegar

5. Vuelve a abrir el menú
   - Debería abrirse de nuevo sin problemas

---

## 📈 Test 7: Verificar Caché

### Primera carga (sin caché):
```
Network → Pexels images → Time: ~1-2 segundos
```

### Recarga la página:
```
Network → Pexels images → Time: ~0.2 segundos (from disk cache)
```

Esto significa que si revisitas el sitio, las imágenes cargan casi instantáneamente.

---

## 🐛 Test 8: Debugging (Si Hay Problemas)

### Abre la Consola (F12 o Cmd+Option+J)

**Busca mensajes:**

```javascript
// ✅ Esperado
"Error al obtener imágenes" → API timeout (ok, mostrar placeholder)
"Timeout/Error cargando uf" → Indicador tardó (ok, omitir)

// ❌ Problema
Blank console (sin mensajes) → Algo está muy mal
```

### Si ves errores CORS:
```
Access to XMLHttpRequest from origin 'https://mi-sitio.com' 
has been blocked by CORS policy
```

→ Avísame, necesitamos ajustar encabezados en Netlify

---

## 📋 Checklist Final

```
Antes de considerar "terminado", verifica:

Rendimiento Móvil:
☐ Página NO se congela en indicadores
☐ Carrusel muestra al menos 1-4 imágenes
☐ Menú hamburguesa abre y cierra
☐ Indicadores económicos se cargan (parcialmente ok)

Network:
☐ Pexels API responde en < 2 segundos
☐ Tamaño de Pexels es ~2-3 MB (no 30-90 MB)
☐ Cache headers están presente

Performance (DevTools Lighthouse):
☐ FCP < 2s
☐ LCP < 4s
☐ Puntuación Performance > 80/100

User Experience:
☐ Sin spinner infinito
☐ Sin mensajes de error alarmantes
☐ Navegación suave
☐ Imágenes cargan en background
```

---

## 💬 Reportar Problemas

Si después de estos cambios sigues viendo problemas:

1. **Abre DevTools → Network**
2. **Recarga la página**
3. **Haz screenshot** mostrando:
   - Network tab con las requests
   - Console con los mensajes
   - Lo que ves en pantalla

4. **Dime:**
   - Dispositivo (iPhone 12, Samsung Galaxy, etc.)
   - Red (WiFi, 4G, 3G)
   - Dónde se congela exactamente
   - Si error o solo lento

---

## 🎓 ¿Por Qué Esto Es Mejor?

### Antes (Bloqueante):
```
Usuario abre sitio
   ↓
Cargar Pexels API (30-90 MB) ← BLOQUEA TODO
   ↓
Esperar a descargar TODAS las imágenes (5-10s)
   ↓
CONGELAMIENTO en indicadores
   ↓
Usuario se da por vencido ❌
```

### Ahora (No Bloqueante):
```
Usuario abre sitio
   ↓
Cargar navbar + título (instantáneo)
   ↓
Pedir Pexels API (4 imágenes, 2-3 MB)
   ↓
Mostrar spinner "Cargando..." (rápido)
   ↓
Imágenes descargan en background (usuario no espera)
   ↓
Indicadores se cargan sin bloqueo
   ↓
Usuario feliz ✅
```

---

**Last Updated:** 2024
**Status:** Listo para testing
**Próximas Optimizaciones:** Basadas en feedback de testing
