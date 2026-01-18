const { OpenRouter } = require('@openrouter/sdk');

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
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'OpenRouter API key not configured.' }),
      };
    }

    const openRouter = new OpenRouter({
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': process.env.SITE_URL || 'https://intro.netlify.app',
        'X-Title': 'Intro - Plataforma de Educación Científica',
      },
    });

    // Parsea el cuerpo de la solicitud
    const { message, model = 'openai/gpt-3.5-turbo' } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing "message" in request body.' }),
      };
    }

    // Llama a la API de OpenRouter
    const completion = await openRouter.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      stream: false,
      max_tokens: 2048,
    });

    // Devuelve la respuesta
    if (completion.choices && completion.choices[0]?.message?.content) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: completion.choices[0].message.content,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Invalid response from OpenRouter API.' }),
      };
    }

  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error processing your request.', 
        error: error.message 
      }),
    };
  }
};
