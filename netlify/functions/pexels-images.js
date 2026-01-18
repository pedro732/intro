// netlify/functions/pexels-images.js
const { createClient } = require('pexels');

exports.handler = async function(event, context) {
  try {
    // Obtén la clave de API de Pexels de las variables de entorno de Netlify
    const apiKey = process.env.PEXELS_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Pexels API key not configured.' }),
      };
    }

    // Crea el cliente de Pexels
    const client = createClient(apiKey);

    // Define los parámetros de búsqueda - OPTIMIZADO PARA MÓVIL
    const query = 'nature'; // Una sola palabra = respuesta más rápida desde Pexels
    const perPage = 4; // REDUCIDO: 30 → 4 (4 imágenes es suficiente para todos los dispositivos)
    const page = 1;

    let photos;

    // Buscar imágenes
    const response = await client.photos.search({ 
      query, 
      per_page: perPage, 
      page: page,
      orientation: 'landscape' // Solo imágenes horizontales (más rápido)
    });

    if (response.error) {
      console.error('Pexels API Error:', response.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error fetching photos from Pexels API', error: response.error }),
      };
    }

    photos = response.photos;

    if (!photos || photos.length === 0) {
      console.warn('Pexels API: No photos found.');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: [] }),
      };
    }

    // Mapea los resultados - OPTIMIZADO PARA VELOCIDAD
    const images = photos.map(photo => ({
      // CAMBIO CRÍTICO: large → medium (reduce 60-70% del tamaño)
      image: photo.src.medium, // ~300-500KB en lugar de 1-3MB
      thumbnail: photo.src.small, // Para carga rápida inicial
      alt: photo.alt || 'Imagen científica',
      id: photo.id
    }));

    // Devuelve con headers de caché
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cachear 1 hora
      },
      body: JSON.stringify({ images: images }),
    };

  } catch (error) {
    console.error('Serverless Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing your request.', error: error.message }),
    };
  }
};

