# 🧪 GUÍA RÁPIDA DE TESTING

## 📱 Testing en 5 Minutos

### Paso 1: Abre tu página
```
Chrome → https://tudominio.com
```

### Paso 2: Abre DevTools
```
F12 o Cmd+Option+I
```

### Paso 3: Simula Móvil
```
DevTools → Ctrl+Shift+M (o Cmd+Shift+M en Mac)
Selecciona: "iPhone 12" o "Pixel 5"
```

### Paso 4: Verifica que cargan
```
✅ Carrusel de imágenes        → debería ver imágenes
✅ Indicadores económicos      → debería ver números
✅ Sección de inteligencia IA  → debería ver input
✅ Foto del día               → debería ver imagen
✅ Noticia del día            → debería ver texto
```

### Paso 5: Revisa Network
```
DevTools → Network
Busca: "pexels-images" 
Verifica que carga (~50KB-200KB en móvil)
```

### Paso 6: Simula Conexión Lenta
```
DevTools → Network
Dropdown "Throttling" → selecciona "3G Slow"
Recarga la página
Debe seguir funcionando sin congelarse
```

---

## 🖥️ Testing Desktop

### Paso 1: Abierto en Navegador Normal
```
Devtools → Ctrl+Shift+M desactivado (normal)
```

### Paso 2: Verifica que todo funciona
```
✅ Carrusel con 8 imágenes
✅ Indicadores visibles
✅ IA responde rápido
✅ Sin "pegadas"
```

### Paso 3: Compara con Móvil
```
Desktop debería verse igual pero:
- Más imágenes en carrusel
- Imágenes más altas (400px vs 250px)
- Más elementos visibles
```

---

## ⏱️ Medir Velocidad

### Con Lighthouse (Recomendado)
```
1. DevTools → Lighthouse
2. Selecciona: "Mobile"
3. Click "Analyze page load"
4. Espera resultado (~30-60 segundos)

Buscar estas métricas:
- FCP (First Contentful Paint): < 2s ✅
- LCP (Largest Contentful Paint): < 4s ✅
- CLS (Cumulative Layout Shift): < 0.1 ✅
```

### Con DevTools Performance Tab
```
1. DevTools → Performance
2. Click circle rojo (grabar)
3. Scroll un poco
4. Click rojo nuevamente (detener)
5. Analizar gráfico

Buscar:
- Picos = componentes cargando
- Línea recta = contenido estático
- Drops = problemas de rendimiento
```

---

## 🔍 Checklist Rápido

### ¿Cargan todos los componentes?
- [ ] Carrusel imágenes: **SÍ**
- [ ] Indicadores: **SÍ**
- [ ] IA: **SÍ**
- [ ] Foto día: **SÍ**
- [ ] Noticia día: **SÍ**

### ¿Funciona en Móvil?
- [ ] Página carga rápido
- [ ] Imágenes se ven bien
- [ ] No hay freezes
- [ ] Scroll es suave

### ¿Funciona en Desktop?
- [ ] Todo se ve mejor
- [ ] Más imágenes
- [ ] Mejor experiencia visual

### ¿Maneja errores?
- [ ] Timeout de API: muestra error
- [ ] Sin conexión: muestra error
- [ ] Conexión lenta: espera y no se congela

---

## 🐛 Si Algo No Funciona

### No cargan las imágenes
```
1. DevTools → Network
2. Busca "pexels-images"
3. ¿Status 200 u error?
   - Status 200: Problema en JavaScript
   - Status error: Problema en API de Netlify
```

### No cargan los indicadores
```
1. DevTools → Network
2. Busca "mindicador.cl"
3. ¿Status 200 u error?
   - Status 200: Datos pero no se muestran
   - Status 403/429: API bloqueada
```

### IA no responde
```
1. DevTools → Network
2. Busca "mistral-chat"
3. Revisar respuesta:
   - Si es 200: esperar más tiempo
   - Si es error: problema con Netlify
```

### Se queda pegado (congelado)
```
1. Abrir DevTools → Performance
2. Grabar mientras se congela
3. Buscar en el gráfico dónde se pega
4. Ver qué componente causa el problema
```

---

## 📊 Comparar Antes vs Después

### Antes de Cambios (si tienes captura)
```
Desktop:  ~3s FCP   | 50 FPS
Móvil:    ~5s FCP   | 30 FPS
```

### Después de Cambios
```
Desktop:  ~3s FCP   | 50 FPS (igual o mejor)
Móvil:    ~1.5s FCP | 45 FPS (MEJOR ⬆️)
```

---

## 🚀 Comandos Útiles

### Limpiar Cache
```
DevTools → Application → Storage → Clear Site Data
```

### Forzar Recarga sin Cache
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

### Ver Logs de Consola
```
DevTools → Console
Buscar mensajes de error rojo
```

---

## 💡 Tips Importantes

1. **Siempre probar en incógnita** (sin cache)
   ```
   Ctrl+Shift+N (Windows)
   Cmd+Shift+N (Mac)
   ```

2. **Probar con throttling** (conexión lenta)
   ```
   Network → Throttling → "3G Slow"
   ```

3. **Medir varias veces** (no una sola)
   ```
   Lighthouse → Analyze 3-5 veces
   Tomar promedio
   ```

4. **Limpiar DevTools** entre pruebas
   ```
   F12 → ⚙️ Settings → Unstable Experiment Features
   Clear Site Data cada vez
   ```

---

## 📞 Dudas Durante Testing

### "¿Qué tiempo es 'rápido'?"
```
< 1s:   Ultra rápido ⚡⚡⚡
1-2s:   Rápido ⚡⚡
2-4s:   Normal ⚡
4-6s:   Lento 🐢
> 6s:   Muy lento ❌
```

### "¿Es normal que tome 2 segundos?"
```
SÍ, es normal si:
- Primera carga
- Conexión normal
- Máquina normal
```

### "¿Por qué móvil es más rápido que desktop?"
```
Porque:
- Menos imágenes (4 vs 8)
- Imágenes más pequeñas (250px vs 400px)
- Timeouts más cortos
```

---

## ✅ Cuando Está Listo

Cuando todo esto sea verdadero:

```
✓ Todos los componentes cargan
✓ Móvil carga más rápido que desktop
✓ No hay errores en consola
✓ Lighthouse score > 80
✓ FCP < 2s en móvil
✓ Funciona sin conexión = muestra error
✓ Funciona con throttling 3G
```

**¡Entonces está listo para producción!**

---

## 📝 Notas de Testing

```
Fecha de testing: ___________
Dispositivo usado: ___________
Conexión: ___________

Móvil - Tiempo FCP: ___ segundos
Desktop - Tiempo FCP: ___ segundos

Problemas encontrados:
_________________________________
_________________________________

Soluciones aplicadas:
_________________________________
_________________________________

Estado final: ✅ / ⚠️ / ❌
```

