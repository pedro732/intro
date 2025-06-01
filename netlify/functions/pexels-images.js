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

    // Define los parámetros de búsqueda.
    // Puedes hacer una búsqueda por palabras clave o obtener fotos curadas.
    // Para obtener imágenes de "animales, ciencia y tecnología", una búsqueda es más flexible.
    const query = 'animals, science, technology,nature,tree,animal'; // Palabras clave para la búsqueda
    const perPage = 30; // Número de imágenes por página (ajusta según necesites)
    const page = 1; // Página de resultados

    let photos;

    // Puedes elegir entre buscar (search) o curadas (curated)
    // Usaremos search para las palabras clave
    const response = await client.photos.search({ query, per_page: perPage, page: page });

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
            body: JSON.stringify({ images: [] }), // Devuelve un array vacío si no hay fotos
        };
    }

    // Mapea los resultados para enviar solo los datos necesarios al frontend
    const images = photos.map(photo => ({
      // Puedes elegir diferentes tamaños: original, large, large2x, medium, small, portrait, landscape, tiny
      image: photo.src.large, // Usamos el tamaño 'large'
      alt: photo.alt, // Usamos el texto alternativo proporcionado por Pexels
      id: photo.id // Un ID único para la key en el v-for
    }));

    // Devuelve las URLs de las imágenes
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
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
