// netlify/functions/mistral-chat.js
const { Mistral } = require('@mistralai/mistralai');

exports.handler = async function(event, context) {
  // Asegúrate de que la solicitud sea POST y tenga un cuerpo
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed or missing body' }),
    };
  }

  try {
    // Obtén la clave de API de las variables de entorno de Netlify
    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Mistral API key not configured.' }),
      };
    }

    const client = new Mistral({ apiKey: apiKey });

    // Parsea el cuerpo de la solicitud (esperamos un JSON con un campo 'message')
    const { message } = JSON.parse(event.body);

    if (!message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing "message" in request body.' }),
        };
    }

    // Llama a la API de Mistral
    const chatResponse = await client.chat.complete({
      model: 'mistral-large-latest', // O el modelo que prefieras
      messages: [{ role: 'user', content: message }],
    });

    // Devuelve la respuesta de Mistral
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: chatResponse.choices[0].message.content,
      }),
    };

  } catch (error) {
    console.error('Error calling Mistral API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing your request.', error: error.message }),
    };
  }
};
